-- RoomNook AI incremental schema upgrade script
-- Run these statements against your existing roomnook_ai database
-- to align with the latest application models without dropping data.

USE roomnook_ai;

-- 1. Students / Owners moderation flags
ALTER TABLE students
  ADD COLUMN IF NOT EXISTS is_blocked TINYINT(1) DEFAULT 0 AFTER smoking_preference;

ALTER TABLE pg_owners
  ADD COLUMN IF NOT EXISTS is_blocked TINYINT(1) DEFAULT 0 AFTER verification_status;

-- 2. PG Listings unified location + status vocabulary
ALTER TABLE pg_listings
  ADD COLUMN IF NOT EXISTS location VARCHAR(100) AFTER address,
  ADD COLUMN IF NOT EXISTS gender_preference ENUM('male','female','any') DEFAULT 'any' AFTER room_type,
  ADD COLUMN IF NOT EXISTS status ENUM('active','inactive','booked') DEFAULT 'active' AFTER rules,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS state,
  DROP COLUMN IF EXISTS pincode,
  DROP COLUMN IF EXISTS contact_phone,
  DROP COLUMN IF EXISTS contact_email,
  DROP COLUMN IF EXISTS latitude,
  DROP COLUMN IF EXISTS longitude;

-- backfill location with former address fragment if needed
UPDATE pg_listings
SET location = SUBSTRING_INDEX(address, ',', 1)
WHERE (location IS NULL OR location = '') AND address IS NOT NULL;

-- 3. Mess listings monthly_cost + streamlined schema
ALTER TABLE mess_listings
  ADD COLUMN IF NOT EXISTS location VARCHAR(100) AFTER address,
  ADD COLUMN IF NOT EXISTS monthly_cost INT AFTER location,
  ADD COLUMN IF NOT EXISTS meal_timing VARCHAR(100) AFTER food_type,
  ADD COLUMN IF NOT EXISTS contact_number VARCHAR(15) AFTER meal_timing,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS state,
  DROP COLUMN IF EXISTS pincode,
  DROP COLUMN IF EXISTS contact_phone,
  DROP COLUMN IF EXISTS contact_email,
  DROP COLUMN IF EXISTS meal_plans,
  DROP COLUMN IF EXISTS pricing,
  DROP COLUMN IF EXISTS service_hours,
  DROP COLUMN IF EXISTS delivery_available,
  DROP COLUMN IF EXISTS total_reviews;

-- convert legacy JSON pricing to integer monthly_cost (best-effort)
UPDATE mess_listings
SET monthly_cost = CASE
  WHEN JSON_VALID(pricing) AND JSON_EXTRACT(pricing, '$.monthly') IS NOT NULL
    THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(pricing, '$.monthly')) AS UNSIGNED)
  ELSE monthly_cost
END
WHERE monthly_cost IS NULL OR monthly_cost = 0;

-- 4. Timestamp parity (enable updated_at)
ALTER TABLE students
  MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE pg_owners
  MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE pg_listings
  MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE mess_listings
  MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 5. Review foreign keys ensure cascading behaviour
ALTER TABLE reviews
  ADD CONSTRAINT fk_reviews_pg_listing
    FOREIGN KEY (pg_listing_id) REFERENCES pg_listings(id) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT fk_reviews_mess_listing
    FOREIGN KEY (mess_listing_id) REFERENCES mess_listings(id) ON DELETE SET NULL ON UPDATE CASCADE;

-- 6. Bookmark null-safety
ALTER TABLE bookmarks
  MODIFY COLUMN pg_listing_id INT NULL,
  MODIFY COLUMN mess_listing_id INT NULL;

-- 7. PG Applications timestamps parity
ALTER TABLE pg_applications
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHANGE COLUMN status status ENUM('pending','accepted','rejected','withdrawn') DEFAULT 'pending',
  CHANGE COLUMN application_date application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- 8. Audit optional (record timestamp for Roommate profile)
ALTER TABLE roommate_profile
  MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 9. Default location for legacy rows
UPDATE mess_listings
SET location = IFNULL(location, 'City Centre')
WHERE location IS NULL OR location = '';

-- 10. Recalculate stats caches (if you store aggregated data elsewhere)
-- (Optional) call backend scripts or clear caches here.

SELECT 'RoomNook schema upgrade complete' AS status_message;

