// Compatibility and Matchmaking Logic for RoomNook AI

const weights = {
  lifestyle: 0.3,
  food: 0.2,
  cleanliness: 0.2,
  budget: 0.15,
  location: 0.15
};

/**
 * Calculate compatibility score between two students
 * @param {Object} studentA - First student profile
 * @param {Object} studentB - Second student profile
 * @returns {number} Compatibility score (0-100)
 */
function calculateCompatibility(studentA, studentB) {
  let score = 0;

  // Food preference compatibility
  if (studentA.food_preference === studentB.food_preference || 
      studentA.food_preference === 'both' || 
      studentB.food_preference === 'both') {
    score += 100 * weights.food;
  } else {
    score += 50 * weights.food; // Partial match
  }

  // Cleanliness level compatibility
  if (studentA.cleanliness_level === studentB.cleanliness_level) {
    score += 100 * weights.cleanliness;
  } else {
    // Calculate partial score based on compatibility
    const cleanlinessScore = calculateCleanlinessScore(studentA.cleanliness_level, studentB.cleanliness_level);
    score += cleanlinessScore * weights.cleanliness;
  }

  // Lifestyle compatibility
  if (studentA.lifestyle === studentB.lifestyle) {
    score += 100 * weights.lifestyle;
  } else {
    const lifestyleScore = calculateLifestyleScore(studentA.lifestyle, studentB.lifestyle);
    score += lifestyleScore * weights.lifestyle;
  }

  // Budget compatibility
  const budgetScore = calculateBudgetScore(studentA, studentB);
  score += budgetScore * weights.budget;

  // Location preference compatibility
  if (studentA.preferred_location === studentB.preferred_location) {
    score += 100 * weights.location;
  } else {
    score += 30 * weights.location; // Partial match for different locations
  }

  return Math.round(Math.min(score, 100));
}

/**
 * Calculate cleanliness compatibility score
 */
function calculateCleanlinessScore(levelA, levelB) {
  const levels = { 'very_clean': 3, 'moderate': 2, 'casual': 1 };
  const diff = Math.abs(levels[levelA] - levels[levelB]);
  return Math.max(0, 100 - (diff * 30));
}

/**
 * Calculate lifestyle compatibility score
 */
function calculateLifestyleScore(lifestyleA, lifestyleB) {
  if (lifestyleA === 'flexible' || lifestyleB === 'flexible') {
    return 80; // Flexible people are compatible with most
  }
  if (lifestyleA === lifestyleB) {
    return 100;
  }
  return 40; // Early bird vs night owl
}

/**
 * Calculate budget compatibility score
 */
function calculateBudgetScore(studentA, studentB) {
  const avgBudgetA = (studentA.budget_min + studentA.budget_max) / 2;
  const avgBudgetB = (studentB.budget_min + studentB.budget_max) / 2;
  
  const diff = Math.abs(avgBudgetA - avgBudgetB);
  const avgBudget = (avgBudgetA + avgBudgetB) / 2;
  
  if (avgBudget === 0) return 50;
  
  const percentageDiff = (diff / avgBudget) * 100;
  return Math.max(0, 100 - percentageDiff);
}

/**
 * Calculate Perfect Match Score™ for PG, Roommate, and Mess combination
 * @param {number} pgScore - PG compatibility score
 * @param {number} roommateScore - Roommate compatibility score
 * @param {number} messScore - Mess compatibility score
 * @returns {number} Perfect Match Score™
 */
function perfectMatchScore(pgScore, roommateScore, messScore) {
  return Math.round((pgScore * 0.4) + (roommateScore * 0.4) + (messScore * 0.2));
}

/**
 * Find compatible roommates for a student
 * @param {Object} student - Student profile
 * @param {Array} allStudents - All students in database
 * @param {number} limit - Maximum number of matches to return
 * @returns {Array} Array of compatible students with scores
 */
function findCompatibleRoommates(student, allStudents, limit = 10) {
  const compatibleStudents = allStudents
    .filter(s => s.id !== student.id && s.preferred_location === student.preferred_location)
    .map(otherStudent => ({
      student: otherStudent,
      compatibilityScore: calculateCompatibility(student, otherStudent)
    }))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
    .slice(0, limit);

  return compatibleStudents;
}

/**
 * Calculate PG compatibility score based on student preferences
 * @param {Object} student - Student profile
 * @param {Object} pgListing - PG listing
 * @returns {number} PG compatibility score
 */
function calculatePgCompatibility(student, pgListing) {
  let score = 0;

  // Budget compatibility (40% weight)
  if (pgListing.rent_amount >= student.budget_min && pgListing.rent_amount <= student.budget_max) {
    score += 100 * 0.4;
  } else {
    const budgetDiff = Math.abs(pgListing.rent_amount - ((student.budget_min + student.budget_max) / 2));
    const maxBudget = Math.max(student.budget_max, pgListing.rent_amount);
    score += Math.max(0, 100 - (budgetDiff / maxBudget) * 100) * 0.4;
  }

  // Location compatibility (30% weight)
  if (pgListing.location === student.preferred_location) {
    score += 100 * 0.3;
  } else {
    score += 50 * 0.3; // Partial match for different locations
  }

  // Room type preference (20% weight)
  // Assuming students prefer single rooms but can adjust
  const roomTypeScore = pgListing.room_type === 'single' ? 100 : 
                       pgListing.room_type === 'double' ? 80 : 
                       pgListing.room_type === 'triple' ? 60 : 40;
  score += roomTypeScore * 0.2;

  // Gender preference (10% weight)
  if (
    pgListing.gender_preference === 'any' ||
    (student.gender && pgListing.gender_preference === student.gender)
  ) {
    score += 100 * 0.1;
  } else {
    score += 0 * 0.1;
  }

  return Math.round(score);
}

/**
 * Calculate Mess compatibility score
 * @param {Object} student - Student profile
 * @param {Object} messListing - Mess listing
 * @returns {number} Mess compatibility score
 */
function calculateMessCompatibility(student, messListing) {
  let score = 0;

  // Food preference compatibility (50% weight)
  if (student.food_preference === messListing.food_type || 
      student.food_preference === 'both' || 
      messListing.food_type === 'both') {
    score += 100 * 0.5;
  } else {
    score += 0 * 0.5; // No match
  }

  // Budget compatibility (30% weight)
  const budgetScore = Math.max(0, 100 - Math.abs(messListing.monthly_cost - ((student.budget_min + student.budget_max) / 2)) / 100);
  score += budgetScore * 0.3;

  // Location compatibility (20% weight)
  if (messListing.location === student.preferred_location) {
    score += 100 * 0.2;
  } else {
    score += 50 * 0.2;
  }

  return Math.round(score);
}

module.exports = {
  calculateCompatibility,
  perfectMatchScore,
  findCompatibleRoommates,
  calculatePgCompatibility,
  calculateMessCompatibility,
  weights
};
