# 🛠 Worker Trust System (WTS)

![React Native](https://img.shields.io/badge/React%20Native-Mobile-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-Framework-000020?style=for-the-badge&logo=expo&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email-000000?style=for-the-badge)
![Twilio](https://img.shields.io/badge/Twilio-SMS-F22F46?style=for-the-badge&logo=twilio&logoColor=white)

<div align="center">
  <img src="assets/wts-1.jpg" alt="System Introduction" width="700"/>
</div>

A location-based worker marketplace that connects customers with trusted local workers such as plumbers, electricians, and technicians — starting in Sri Lanka 🇱🇰.

Built with React Native (Expo) and Supabase, WTS focuses on verified registrations, geo-based matching, and future trust scoring.

## 🚀 Features

### 👷 Worker Registration

- Full name, phone, email

- Category selection (plumber, electrician, etc.)

- Work photo / ID upload

- Province / district / city auto-detection

- Latitude & longitude storage

### 📍 Smart Location Mapping

- Uses device GPS

- Reverse geocoding

- Maps coordinates to Sri Lanka provinces/districts

- Handles “Allow Once” permission edge case correctly

### 🌍 Multi-Language Support

The application supports three languages:

- 🇬🇧 English
- 🇱🇰 Sinhala (සිංහල)
- 🇱🇰 Tamil (தமிழ்)

### 🛡 SMS and Email Integration

- Admins receive an email when a worker sends application , through which they can approve or reject.

- Once admin approves, the new worker will receive a deep link through SMS.

- Using the deep link , the worker can reset his password and use the app.

### ☁ Supabase Backend

- PostgreSQL database

- Storage bucket for worker images

- Edge functions for notifications

## ⚙️ System Architecture

<div align="center">
  <img src="assets/architecture.png" alt="System Architecture" width="700"/>
</div>

---

<div align="center">
  <img src="assets/wts-2.jpg" alt="App images" width="700"/>
</div>


## ⚙️ Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Himindu-Kularathne/wts.git
cd worker-trust-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=your-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### 4️⃣ Start development

```bash
npx expo start
```
