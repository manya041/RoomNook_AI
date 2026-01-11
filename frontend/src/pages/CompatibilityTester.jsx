import React, { useState, useEffect } from 'react'
import { Users, Star, CheckCircle, XCircle, Clock, Droplets, Zap, Shield, Heart, MessageCircle, UserCheck } from 'lucide-react'

const CompatibilityTester = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    lifestyle: '',
    cleanliness: '',
    smoking: '',
    budget: '',
    location: '',
    preferences: []
  })
  
  const [compatibilityResults, setCompatibilityResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Sample roommate data for testing
  const sampleRoommates = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 24,
      gender: "Female",
      occupation: "Software Engineer",
      lifestyle: "early_bird",
      cleanliness: "very_clean",
      smoking: "non_smoker",
      budget: 10000,
      location: "Clement Town, Dehradun",
      preferences: ["Non-smoker", "Vegetarian friendly", "Pet friendly"],
      profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29329?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rahul Verma",
      age: 26,
      gender: "Male",
      occupation: "Marketing Professional",
      lifestyle: "early_bird",
      cleanliness: "clean",
      smoking: "non_smoker",
      budget: 12000,
      location: "Rajpur Road, Dehradun",
      preferences: ["Non-smoker", "Gym enthusiast", "Early riser"],
      profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Anjali Singh",
      age: 22,
      gender: "Female",
      occupation: "Student",
      lifestyle: "early_bird",
      cleanliness: "very_clean",
      smoking: "non_smoker",
      budget: 9500,
      location: "Dharampur, Dehradun",
      preferences: ["Non-smoker", "Early riser", "Study focused"],
      profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Amit Kumar",
      age: 28,
      gender: "Male",
      occupation: "Software Developer",
      lifestyle: "night_owl",
      cleanliness: "moderate",
      smoking: "non_smoker",
      budget: 11000,
      location: "Sahastradhara, Dehradun",
      preferences: ["Non-smoker", "Night owl", "Tech enthusiast"],
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Sneha Reddy",
      age: 25,
      gender: "Female",
      occupation: "Graphic Designer",
      lifestyle: "social",
      cleanliness: "clean",
      smoking: "non_smoker",
      budget: 10500,
      location: "Mussoorie Road, Dehradun",
      preferences: ["Pet friendly", "Vegetarian friendly", "Art lover"],
      profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const lifestyleOptions = [
    { value: 'early_bird', label: 'Early Bird', icon: Clock, description: 'Wake up early, sleep early' },
    { value: 'night_owl', label: 'Night Owl', icon: Zap, description: 'Stay up late, wake up late' },
    { value: 'social', label: 'Social', icon: Users, description: 'Love socializing and parties' },
    { value: 'quiet', label: 'Quiet', icon: Shield, description: 'Prefer peaceful environment' }
  ]

  const cleanlinessOptions = [
    { value: 'very_clean', label: 'Very Clean', icon: Droplets, description: 'Extremely organized and tidy' },
    { value: 'clean', label: 'Clean', icon: CheckCircle, description: 'Generally neat and organized' },
    { value: 'moderate', label: 'Moderate', icon: Star, description: 'Average cleanliness level' }
  ]

  const smokingOptions = [
    { value: 'non_smoker', label: 'Non-Smoker', description: 'No smoking at all' },
    { value: 'okay_with_smoking', label: 'Okay with Smoking', description: 'Fine with occasional smoking' },
    { value: 'smoker', label: 'Smoker', description: 'Regular smoker' }
  ]

  const preferenceOptions = [
    'Non-smoker', 'Vegetarian friendly', 'Pet friendly', 'Gym enthusiast', 
    'Early riser', 'Study focused', 'Night owl', 'Tech enthusiast', 
    'Art lover', 'Fitness enthusiast', 'Organized'
  ]

  const calculateCompatibility = (user, roommate) => {
    let score = 0
    let factors = []

    // Lifestyle compatibility (30 points)
    if (user.lifestyle === roommate.lifestyle) {
      score += 30
      factors.push({ factor: 'Lifestyle Match', points: 30, icon: Clock })
    } else if (
      (user.lifestyle === 'early_bird' && roommate.lifestyle === 'early_bird') ||
      (user.lifestyle === 'night_owl' && roommate.lifestyle === 'night_owl')
    ) {
      score += 20
      factors.push({ factor: 'Similar Schedule', points: 20, icon: Clock })
    }

    // Cleanliness compatibility (25 points)
    if (user.cleanliness === roommate.cleanliness) {
      score += 25
      factors.push({ factor: 'Cleanliness Match', points: 25, icon: Droplets })
    } else if (
      (user.cleanliness === 'very_clean' && roommate.cleanliness === 'clean') ||
      (user.cleanliness === 'clean' && roommate.cleanliness === 'very_clean')
    ) {
      score += 15
      factors.push({ factor: 'Similar Cleanliness', points: 15, icon: Droplets })
    }

    // Smoking compatibility (20 points)
    if (user.smoking === roommate.smoking) {
      score += 20
      factors.push({ factor: 'Smoking Preference Match', points: 20, icon: Shield })
    } else if (
      (user.smoking === 'non_smoker' && roommate.smoking === 'okay_with_smoking') ||
      (user.smoking === 'okay_with_smoking' && roommate.smoking === 'non_smoker')
    ) {
      score += 10
      factors.push({ factor: 'Compatible Smoking', points: 10, icon: Shield })
    }

    // Budget compatibility (15 points)
    const budgetDiff = Math.abs(user.budget - roommate.budget)
    if (budgetDiff <= 1000) {
      score += 15
      factors.push({ factor: 'Budget Match', points: 15, icon: Star })
    } else if (budgetDiff <= 2000) {
      score += 10
      factors.push({ factor: 'Similar Budget', points: 10, icon: Star })
    }

    // Age compatibility (10 points)
    const ageDiff = Math.abs(user.age - roommate.age)
    if (ageDiff <= 2) {
      score += 10
      factors.push({ factor: 'Age Match', points: 10, icon: Users })
    } else if (ageDiff <= 5) {
      score += 5
      factors.push({ factor: 'Similar Age', points: 5, icon: Users })
    }

    return { score, factors }
  }

  const handleProfileChange = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }))
  }

  const handlePreferenceToggle = (preference) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }))
  }

  const runCompatibilityTest = () => {
    const results = sampleRoommates.map(roommate => {
      const compatibility = calculateCompatibility(userProfile, roommate)
      return {
        ...roommate,
        compatibility: compatibility.score,
        factors: compatibility.factors
      }
    }).sort((a, b) => b.compatibility - a.compatibility)

    setCompatibilityResults(results)
    setShowResults(true)
  }

  const steps = [
    { title: 'Basic Info', fields: ['name', 'age', 'gender', 'occupation', 'location'] },
    { title: 'Lifestyle', fields: ['lifestyle'] },
    { title: 'Preferences', fields: ['cleanliness', 'smoking', 'budget'] },
    { title: 'Additional Preferences', fields: ['preferences'] }
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">Name</label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="input"
                placeholder="Enter your name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">Age</label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => handleProfileChange('age', parseInt(e.target.value))}
                  className="input"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">Gender</label>
                <select
                  value={userProfile.gender}
                  onChange={(e) => handleProfileChange('gender', e.target.value)}
                  className="input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">Occupation</label>
              <input
                type="text"
                value={userProfile.occupation}
                onChange={(e) => handleProfileChange('occupation', e.target.value)}
                className="input"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">Location</label>
              <input
                type="text"
                value={userProfile.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                className="input"
                placeholder="Clement Town, Dehradun"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div>
            <label className="block text-sm font-medium text-ink-100/80 mb-4 uppercase tracking-[0.2em]">What's your lifestyle?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lifestyleOptions.map(option => (
                <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
                  <input
                    type="radio"
                    name="lifestyle"
                    value={option.value}
                    checked={userProfile.lifestyle === option.value}
                    onChange={(e) => handleProfileChange('lifestyle', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                    userProfile.lifestyle === option.value
                      ? 'border-emerald-400 bg-emerald-400/15 text-emerald-100'
                      : 'border-white/10 bg-white/5 text-ink-100/70 hover:border-emerald-200/30'
                  }`}>
                    <option.icon className="h-6 w-6 mr-3" />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-ink-100/50">{option.description}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ink-100/80 mb-4 uppercase tracking-[0.2em]">How clean are you?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cleanlinessOptions.map(option => (
                  <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
                    <input
                      type="radio"
                      name="cleanliness"
                      value={option.value}
                      checked={userProfile.cleanliness === option.value}
                      onChange={(e) => handleProfileChange('cleanliness', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                      userProfile.cleanliness === option.value
                        ? 'border-emerald-400 bg-emerald-400/15 text-emerald-100'
                        : 'border-white/10 bg-white/5 text-ink-100/70 hover:border-emerald-200/30'
                    }`}>
                      <option.icon className="h-6 w-6 mr-3" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-ink-100/50">{option.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-100/80 mb-4 uppercase tracking-[0.2em]">Smoking preference?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {smokingOptions.map(option => (
                  <label key={option.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
                    <input
                      type="radio"
                      name="smoking"
                      value={option.value}
                      checked={userProfile.smoking === option.value}
                      onChange={(e) => handleProfileChange('smoking', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                      userProfile.smoking === option.value
                        ? 'border-emerald-400 bg-emerald-400/15 text-emerald-100'
                        : 'border-white/10 bg-white/5 text-ink-100/70 hover:border-emerald-200/30'
                    }`}>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-ink-100/50">{option.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">Monthly Budget (₹)</label>
              <input
                type="number"
                value={userProfile.budget}
                onChange={(e) => handleProfileChange('budget', parseInt(e.target.value))}
                className="input"
                placeholder="10000"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <label className="block text-sm font-medium text-ink-100/80 mb-4 uppercase tracking-[0.2em]">Select your preferences (optional)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {preferenceOptions.map(preference => (
                <label key={preference} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.includes(preference)}
                    onChange={() => handlePreferenceToggle(preference)}
                    className="sr-only"
                  />
                  <div className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                    userProfile.preferences.includes(preference)
                      ? 'border-emerald-400 bg-emerald-400/15 text-emerald-100'
                      : 'border-white/10 bg-white/5 text-ink-100/70 hover:border-emerald-200/30'
                  }`}>
                    <span className="text-sm font-medium">{preference}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const CompatibilityCard = ({ roommate }) => (
    <div className="floating-card group animate-fade-in-up h-full overflow-hidden border border-white/10 relative">
      {/* Compatibility Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium flex items-center z-10 ${
        roommate.compatibility >= 80 ? 'bg-emerald-400/15 text-emerald-200 border border-emerald-300/40' :
        roommate.compatibility >= 60 ? 'bg-champagne-400/15 text-champagne-200 border border-champagne-300/40' :
        'bg-red-400/15 text-red-200 border border-red-300/40'
      }`}>
        <Star className="h-4 w-4 mr-1" />
        {roommate.compatibility}% Match
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={roommate.profilePic}
            alt={roommate.name}
            className="w-16 h-16 rounded-full object-cover mr-4 border border-white/10"
          />
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold text-ivory">{roommate.name}</h3>
            <p className="text-ink-100/70 text-sm">{roommate.age} years • {roommate.gender} • {roommate.occupation}</p>
            <div className="flex items-center text-ink-100/60 text-sm mt-1">
              <span>{roommate.location}</span>
            </div>
          </div>
        </div>
        
        {/* Compatibility Factors */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-ink-100/80 mb-2 uppercase tracking-[0.2em]">Compatibility Factors:</h4>
          <div className="flex flex-wrap gap-2">
            {roommate.factors.map((factor, index) => (
              <span key={index} className="badge badge-emerald flex items-center">
                <factor.icon className="h-3 w-3 mr-1" />
                {factor.factor} (+{factor.points})
              </span>
            ))}
          </div>
        </div>
        
        {/* Preferences */}
        <div className="flex flex-wrap gap-2 mb-4">
          {roommate.preferences.map((pref, index) => (
            <span key={index} className="badge badge-secondary">
              {pref}
            </span>
          ))}
        </div>
        
        {/* Budget */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-ink-100/70">Budget: ₹{roommate.budget.toLocaleString()}/month</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            className="btn btn-primary flex-1 cursor-pointer relative z-10"
            type="button"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Connect
          </button>
          <button 
            className="btn btn-secondary cursor-pointer relative z-10"
            type="button"
          >
            <Heart className="h-4 w-4" />
          </button>
          <button 
            className="btn btn-secondary cursor-pointer relative z-10"
            type="button"
          >
            <UserCheck className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen pb-24">
      <div className="absolute inset-0 bg-hero-radiance opacity-20 blur-3xl"></div>
      <div className="container relative z-10 flex flex-col gap-10 pt-10 md:pt-16">
        <div className="flex flex-col gap-4 animate-fade-in-up">
          <span className="pill flex items-center gap-2 uppercase tracking-[0.35em]">
            <Users className="h-3 w-3" />
            Match Studio
          </span>
          <h1 className="font-display text-4xl text-ivory md:text-5xl">Roommate Compatibility Tester</h1>
          <p className="max-w-3xl text-sm text-ink-100/70 md:text-base">Find your perfect roommate match using our AI-powered compatibility algorithm</p>
        </div>

      {!showResults ? (
        <div className="glass-panel border-white/10 p-8 animate-fade-in-up">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ink-100/80 uppercase tracking-[0.2em]">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-ink-100/60">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-champagne-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Title */}
          <h2 className="text-2xl font-display font-semibold text-ivory mb-6">
            {steps[currentStep].title}
          </h2>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="btn btn-secondary cursor-pointer relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Previous
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn btn-primary cursor-pointer relative z-10"
                type="button"
              >
                Next
              </button>
            ) : (
              <button
                onClick={runCompatibilityTest}
                className="btn btn-primary flex items-center cursor-pointer relative z-10"
                type="button"
              >
                <Star className="h-4 w-4 mr-2" />
                Find My Perfect Match
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in-up">
          {/* Results Header */}
          <div className="glass-panel border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-display font-bold text-ivory mb-2">Your Compatibility Results</h2>
            <p className="text-ink-100/70">
              Based on your profile, we found {compatibilityResults.length} potential roommates
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibilityResults.map((roommate) => (
              <CompatibilityCard key={roommate.id} roommate={roommate} />
            ))}
          </div>

          {/* Restart Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setShowResults(false)
                setCurrentStep(0)
                setUserProfile({
                  name: '',
                  age: '',
                  gender: '',
                  occupation: '',
                  lifestyle: '',
                  cleanliness: '',
                  smoking: '',
                  budget: '',
                  location: '',
                  preferences: []
                })
              }}
              className="btn btn-secondary cursor-pointer relative z-10"
              type="button"
            >
              Take Test Again
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default CompatibilityTester
