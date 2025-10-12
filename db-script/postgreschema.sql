-- ======================================================
-- Worker Trust System (Google Auth Version) - PostgreSQL
-- Author: Horizon (Converted by ChatGPT)
-- Date: 2025-10-11
-- ======================================================

-- Drop existing tables (if re-run)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS worker_profiles CASCADE;
DROP TABLE IF EXISTS app_users CASCADE;

-- ======================================================
-- Enable UUID Extension (required for uuid_generate_v4)
-- ======================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ======================================================
-- Helper Function & Trigger for auto-updating timestamps
-- ======================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ======================================================
-- APP USERS
-- ======================================================
CREATE TABLE app_users (
    google_uid VARCHAR(128) PRIMARY KEY,
    role VARCHAR(20) CHECK (role IN ('worker', 'customer')) NOT NULL,
    full_name VARCHAR(150),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    language_pref VARCHAR(5) CHECK (language_pref IN ('en', 'si', 'ta')) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_app_users_updated_at
BEFORE UPDATE ON app_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ======================================================
-- WORKER PROFILES
-- ======================================================
CREATE TABLE worker_profiles (
    worker_id VARCHAR(128) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    location_lat DECIMAL(9,6),
    location_lng DECIMAL(9,6),
    description TEXT,
    trust_score DECIMAL(3,2) DEFAULT 0.0,
    FOREIGN KEY (worker_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

CREATE INDEX idx_worker_category_location
    ON worker_profiles (category, location_lat, location_lng);

-- ======================================================
-- REVIEWS
-- ======================================================
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id VARCHAR(128) NOT NULL,
    customer_id VARCHAR(128) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(worker_id, customer_id),
    FOREIGN KEY (worker_id) REFERENCES worker_profiles(worker_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- ======================================================
-- SERVICES
-- ======================================================
CREATE TABLE services (
    service_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id VARCHAR(128) NOT NULL,
    customer_id VARCHAR(128) NOT NULL,
    description TEXT,
    service_date DATE,
    status VARCHAR(20) CHECK (status IN ('requested','completed','cancelled')) DEFAULT 'requested',
    FOREIGN KEY (worker_id) REFERENCES worker_profiles(worker_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- ======================================================
-- REPORTS
-- ======================================================
CREATE TABLE reports (
    report_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reported_user_id VARCHAR(128) NOT NULL,
    reporter_id VARCHAR(128) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_user_id) REFERENCES app_users(google_uid) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- ======================================================
-- NOTIFICATIONS
-- ======================================================
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(128) NOT NULL,
    title VARCHAR(150),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- ======================================================
-- END OF SCHEMA
-- ======================================================
