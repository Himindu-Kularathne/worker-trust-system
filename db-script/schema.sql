-- ======================================================
-- Worker Trust System (Google Auth Version)
-- Author: Horizon (Updated for Firebase/Google Auth)
-- Date: 2025-10-07
-- ======================================================

-- Drop existing tables (to reset if re-run)
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS worker_profiles;
DROP TABLE IF EXISTS app_users;

-- =====================================
-- APP USERS
-- =====================================
-- This replaces the old "users" table.
-- Google / Firebase UID is the unique identifier.
-- No passwords are stored locally.
create table public.app_users (
  id uuid primary key default gen_random_uuid(),
  google_uid varchar(128) not null unique,
  full_name varchar(150),
  email varchar(150) unique,
  language_pref varchar(5) default 'en',
  created_at timestamp default now(),
  updated_at timestamp default now()
);


-- =====================================
-- WORKER PROFILES
-- Only for users with role = 'worker'
-- =====================================
CREATE TABLE worker_profiles (
    worker_id VARCHAR(128) PRIMARY KEY,             
    category VARCHAR(100) NOT NULL,
    location_lat DECIMAL(9,6),
    location_lng DECIMAL(9,6),
    description TEXT,
    trust_score DECIMAL(3,2) DEFAULT 0.0,
    FOREIGN KEY (worker_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
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
    worker_id VARCHAR(128) NOT NULL,
    customer_id VARCHAR(128) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(worker_id, customer_id),   -- Prevent multiple reviews per worker/customer combo
    FOREIGN KEY (worker_id) REFERENCES worker_profiles(worker_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- =====================================
-- SERVICES
-- Links workers and customers via service requests
-- =====================================
CREATE TABLE services (
    service_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    worker_id VARCHAR(128) NOT NULL,
    customer_id VARCHAR(128) NOT NULL,
    description TEXT,
    service_date DATE,
    status ENUM('requested','completed','cancelled') DEFAULT 'requested',
    FOREIGN KEY (worker_id) REFERENCES worker_profiles(worker_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- =====================================
-- REPORTS
-- Users can report suspicious workers/customers
-- =====================================
CREATE TABLE reports (
    report_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    reported_user_id VARCHAR(128) NOT NULL,
    reporter_id VARCHAR(128) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reported_user_id) REFERENCES app_users(google_uid) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- =====================================
-- NOTIFICATIONS
-- For push via Firebase Cloud Messaging (FCM)
-- =====================================
CREATE TABLE notifications (
    notification_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(128) NOT NULL,
    title VARCHAR(150),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES app_users(google_uid) ON DELETE CASCADE
);

-- =====================================
-- WORKERS
-- Stores worker details and status
-- =====================================

create table public.workers (
  id uuid primary key default gen_random_uuid(),

  google_uid varchar(128) not null unique,
  full_name varchar(150) not null,
  phone varchar(20) not null,
  email varchar(150),

  address text not null,
  category varchar(100) not null,

  rating_avg numeric(3,2) default 0,
  rating_count int default 0,

  created_at timestamp default now()
);


-- =====================================
-- WORKER REGISTRATION REQUESTS
-- Stores requests from users to become workers
-- =====================================

create table public.worker_registration_requests (
  id uuid primary key default gen_random_uuid(),

  full_name varchar(150) not null,
  phone varchar(20) not null,
  email varchar(150),
  address text not null,
  category varchar(100) not null,

  status varchar(20) not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),

  created_at timestamp default now(),
  reviewed_at timestamp
);

-- =====================================
-- WORKER CATEGORIES
-- Predefined categories (eg-: Electrician) for workers
-- =====================================

create table worker_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- =====================================
-- WORKER SUBCATEGORIES
-- Subcategories linked to main categories(Eg-: Wiring under Electrician)
-- =====================================

create table worker_subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references worker_categories(id) on delete cascade,
  name text not null,
  unique(category_id, name)
);

-- =====================================
-- TRIGGERS
-- Automatically handle worker profile creation on approval

create or replace function handle_worker_approval()
returns trigger
language plpgsql
as $$
begin
  -- Only run when status changes from pending → approved
  if OLD.status = 'pending' and NEW.status = 'approved' then
    
    -- Insert worker into worker_profiles
    insert into worker_profiles (worker_id, category)
    values (NEW.id::text, NEW.category);
    
  end if;

  return NEW;
end;
$$;






-- ======================================================
-- END OF SCHEMA
-- ======================================================
