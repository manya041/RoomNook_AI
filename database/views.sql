-- RoomNook AI Database Views
USE roomnook_ai;

-- View for student PG listings with owner details
CREATE OR REPLACE VIEW view_student_pg_listings AS
SELECT 
    pl.id,
    pl.title,
    pl.description,
    pl.address,
    pl.location,
    pl.rent_amount,
    pl.deposit_amount,
    pl.room_type,
    pl.gender_preference,
    pl.available_from,
    pl.images,
    pl.amenities,
    pl.rules,
    pl.status,
    pl.verification_status,
    po.name as owner_name,
    po.phone as owner_phone,
    po.verification_status as owner_verification,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as review_count,
    pl.created_at,
    pl.updated_at
FROM pg_listings pl
LEFT JOIN pg_owners po ON pl.owner_id = po.id
LEFT JOIN reviews r ON pl.id = r.pg_listing_id
WHERE pl.status = 'active' AND pl.verification_status = 'verified'
GROUP BY pl.id;

-- View for owner PG summary
CREATE OR REPLACE VIEW view_owner_pg_summary AS
SELECT 
    po.id as owner_id,
    po.name as owner_name,
    po.email,
    po.phone,
    COUNT(pl.id) as total_listings,
    COUNT(CASE WHEN pl.status = 'active' THEN 1 END) as active_listings,
    COUNT(CASE WHEN pl.status = 'booked' THEN 1 END) as booked_listings,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as total_reviews,
    COUNT(pa.id) as total_applications,
    COUNT(CASE WHEN pa.status = 'pending' THEN 1 END) as pending_applications
FROM pg_owners po
LEFT JOIN pg_listings pl ON po.id = pl.owner_id
LEFT JOIN reviews r ON pl.id = r.pg_listing_id
LEFT JOIN pg_applications pa ON pl.id = pa.pg_listing_id
GROUP BY po.id;

-- View for admin overview
CREATE OR REPLACE VIEW view_admin_overview AS
SELECT 
    'students' as entity_type,
    COUNT(*) as total_count,
    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_last_30_days
FROM students
UNION ALL
SELECT 
    'pg_owners' as entity_type,
    COUNT(*) as total_count,
    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_last_30_days
FROM pg_owners
UNION ALL
SELECT 
    'pg_listings' as entity_type,
    COUNT(*) as total_count,
    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_last_30_days
FROM pg_listings
UNION ALL
SELECT 
    'mess_listings' as entity_type,
    COUNT(*) as total_count,
    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_last_30_days
FROM mess_listings;

-- View for AI data (compatibility matching)
CREATE OR REPLACE VIEW view_ai_data AS
SELECT 
    s.id as student_id,
    s.name as student_name,
    s.budget_min,
    s.budget_max,
    s.preferred_location,
    s.food_preference,
    s.cleanliness_level,
    s.lifestyle,
    s.smoking_preference,
    rp.bio,
    rp.interests,
    rp.study_schedule,
    rp.social_level,
    rp.party_frequency,
    rp.guest_policy,
    rp.is_looking_for_roommate,
    pl.id as pg_listing_id,
    pl.title as pg_title,
    pl.location as pg_location,
    pl.rent_amount,
    pl.room_type,
    pl.gender_preference,
    ml.id as mess_listing_id,
    ml.name as mess_name,
    ml.location as mess_location,
    ml.monthly_cost,
    ml.food_type,
    ml.rating as mess_rating
FROM students s
LEFT JOIN roommate_profile rp ON s.id = rp.student_id
LEFT JOIN pg_listings pl ON s.preferred_location = pl.location AND pl.status = 'active'
LEFT JOIN mess_listings ml ON s.preferred_location = ml.location AND ml.status = 'active';
