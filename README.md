# CookBook Final Report

## Team Information
- **Zuhao Zhang** (Student #: 1005828080) - Email: _davidzhangzuhao@gmail.com_
- **Lihao Xue** (Student #: 1011809875) - Email: _xuelihaogpa4@gmail.com_

## Motivation
Modern lifestyles are increasingly fast-paced, leaving many individuals and families with limited time to prepare nutritious, personalized meals at home. Traditional restaurants and takeout services often lack customization to specific dietary needs and can be cost-prohibitive. While meal-kit platforms address ingredient sourcing, they don’t offer the cooking expertise of a personal chef. Conversely, high-end chef-booking services are typically geared toward special events rather than regular, day-to-day meal planning.

**CookBook** addresses this gap by connecting skilled home chefs with customers seeking affordable, customized home-cooked meals. This solution promotes healthier eating through ingredient transparency, supports local culinary talent, and fosters community engagement around food.

## Objectives
- **Build a seamless matchmaking platform** between home chefs and customers.
- **Enable personalized meal experiences**, accommodating dietary restrictions and taste preferences.
- **Provide reliable booking tools and notifications**.
- **Offer review and rating functionality** to maintain quality and trust.

## Technical Stack
- **Frontend:** React (Vite), React Router, React Query, Tailwind CSS, shadcn/ui
- **Backend:** Express.js server with RESTful API
- **Database:** PostgreSQL managed via Prisma ORM
- **File / Media Storage:** Cloudinary for chef profile images and meal photos
- **Authentication / Authorization:** Passwords hashed with bcrypt, JWT for session tokens

## Features
1. **User Authentication**
   - Role-based signup (Chef or Customer) with secure password hashing (bcrypt)
   - JWT-based tokens for authenticated requests
2. **Chef Profiles**
   - Profile creation: bio, specialties, hourly rate, and availability calendar
   - Image upload via Cloudinary
   - Public reviews and ratings display
3. **Browsing & Booking**
   - Browse a list of available chefs with basic details
   - Booking requests with date/time selection and special requests field
   - In-app notifications on booking status changes
4. **Review System**
   - Post-service star rating (1–5) and comment box
   - Chef public responses to reviews

*These features align with course requirements by demonstrating full-stack development, secure auth, database interactions, and file storage management.*

## User Guide
1. **Signup/Login**
   - Navigate to `/signup`, choose your role, and complete the form.
   - Example:
     ![Signup Form](screenshots/signup.png)

2. **Finding a Chef (Customers)**
   - On the dashboard, view a list of all chefs with their name, specialty tags, and ratings.
   - Click **"View Profile"** to see full details and availability.
   ![Chef List](screenshots/chef-list.png)

3. **Creating a Chef Profile (Chefs)**
   - Go to **Profile → Edit Profile** to add bio, specialties, hourly rate, and upload a photo.
   - Set available time slots in the calendar widget.
   ![Profile Editor](screenshots/profile-editor.png)

4. **Booking Flow**
   - Select desired date/time and submit a booking request.
   - Check **Bookings → Pending** to view requests and their status.
   ![Booking Calendar](screenshots/booking-calendar.png)

5. **Writing a Review**
   - After a completed booking, navigate to **Bookings → Past** and click **Review**.
   - Submit star rating and comments; chefs can reply publicly.
   ![Review Form](screenshots/review-form.png)

## Development Guide

### Prerequisites
- Node.js v16+ and npm
- PostgreSQL v12+
- Cloudinary account (cloud name, API key, API secret)

### Environment Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-org>/cookbook.git
   cd cookbook
