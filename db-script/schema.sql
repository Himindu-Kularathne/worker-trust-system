-- Worker Trust System Database Schema
-- Author: Horizon (based on project proposal)
-- Date: 2025-09-30

-- Drop existing tables if needed (to reset)
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS worker_profiles;
DROP TABLE IF EXISTS users;

-- =====================================
-- USERS (generalized for both customers & workers)
-- =====================================
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    role ENUM('worker', 'customer') NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    language_pref ENUM('en','si','ta') DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================
-- WORKER PROFILES
-- Only for users with role = 'worker'
-- =====================================
CREATE TABLE worker_profiles (
    worker_id CHAR(36) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    location_lat DECIMAL(9,6),
    location_lng DECIMAL(9,6),
    description TEXT,
    trust_score DECIMAL(3,2) DEFAULT 0.0,
    FOREIGN KEY (worker_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Add index for searching workers by category + location
CREATE INDEX idx_worker_category_location
    ON worker_profiles (category, location_lat, location_lng);

-- =====================================
-- REVIEWS
-- Customers can review workers (one review per service interaction)
-- =====================================
CREATE TABLE reviews (
    review_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    worker_id CHAR(36) NOT NULL,
    customer_id CHAR(36) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(worker_id, customer_id),   -- Prevent multiple reviews per worker/customer combo
    FOREIGN KEY (worker_id) REFERENCES worker_profiles(worker_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================================
-- SERVICES (optional: links workers and customers via service requests)
-- =====================================
CREATE TABLE services (
    service_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    worker_id CHAR(36) NOT NULL,
    customer_id CHAR(36) NOT NULL,
    description TEXT,
    service_date DATE,
    status ENUM('requested','completed','cancelled') DEFAULT 'requested',
    FOREIGN KEY (worker_id) REFERENCES worker_profiles(worker_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================================
-- REPORTS (users can report suspicious workers/customers)
-- =====================================
CREATE TABLE reports (
    report_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    reported_user_id CHAR(36) NOT NULL,
    reporter_id CHAR(36) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================================
-- NOTIFICATIONS (for push via Firebase Cloud Messaging)
-- =====================================
CREATE TABLE notifications (
    notification_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    title VARCHAR(150),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
