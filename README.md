🛠 Worker Trust System (WTS)

![React Native](https://img.shields.io/badge/React%20Native-Mobile-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email%20Service-000000?style=for-the-badge)
![Twilio](https://img.shields.io/badge/Twilio-Communication-F22F46?style=for-the-badge&logo=twilio&logoColor=white)

A location-based worker marketplace that connects customers with trusted local workers such as plumbers, electricians, and technicians — starting in Sri Lanka 🇱🇰.

Built with React Native (Expo) and Supabase, WTS focuses on verified registrations, geo-based matching, and future trust scoring.

🚀 Features
👷 Worker Registration

Full name, phone, email

Category selection (plumber, electrician, etc.)

Work photo / ID upload

Province / district / city auto-detection

Latitude & longitude storage

📍 Smart Location Mapping

Uses device GPS

Reverse geocoding

Maps coordinates to Sri Lanka provinces/districts

Handles “Allow Once” permission edge case correctly

🗂 Categories System

Dynamic category loading from database

Icon-based UI (Ionicons)

Easily extendable

🛡 Admin Approval Flow

Registration stored in worker_registration_requests

Admin review required

SMS signup link sent after approval

☁ Supabase Backend

PostgreSQL database

Storage bucket for worker images

Edge functions for notifications

Public URL generation for images
