# CookBook Final Report

## Team Information
- **Zuhao Zhang** (GitHub Username: David123-web) - Email: _davidzhangzuhao@gmail.com_
- **Lihao Xue** (GitHub Username: Madnessvia) - Email: _xuelihaogpa4@gmail.com_

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

*These features align with course requirements by demonstrating full-stack development, secure auth, database interactions, and file storage management.* with course requirements by demonstrating full-stack development, secure auth, database interactions, and file storage management.\*

## User Guide

1. **Signup/Login**

   - Navigate to `/signup`, choose your role, and complete the form.
   - Example:&#x20;

2. **Finding a Chef (Customers)**

   - On the dashboard, view a list of all chefs with their name, specialty tags, and ratings.
   - Click **"View Profile"** to see full details and availability.&#x20;

3. **Creating a Chef Profile (Chefs)**

   - Go to **Profile → Edit Profile** to add bio, specialties, hourly rate, and upload a photo.
   - Set available time slots in the calendar widget.&#x20;

4. **Booking Flow**

   - Select desired date/time and submit a booking request.
   - Check **Bookings → Pending** to view requests and their status.&#x20;

5. **Writing a Review**

   - After a completed booking, navigate to **Bookings → Past** and click **Review**.
   - Submit star rating and comments; chefs can reply publicly.&#x20;

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
   ```
2. **Copy environment template**
   ```bash
   cp .env.example .env
   ```
3. **Configure **``** variables**
   ```dotenv
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Database Initialization
```bash
# Create a new PostgreSQL database named 'cookbook_management'
createdb cookbook_management

# Run Prisma migration to set up tables
npx prisma migrate dev --name init
```

### Cloudinary Configuration

1. **Create a Cloudinary account**: Sign up for a free account at [https://cloudinary.com/](https://cloudinary.com/)
2. **Obtain API credentials**: In your Cloudinary Dashboard, go to **Settings → API Keys** and copy your `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
3. **Define an upload preset**:
   - In the Dashboard, navigate to **Settings → Upload** tab.
   - Under **Upload Presets**, click **Add upload preset**.
   - Name the preset exactly **dev\_setups** and configure any security or transformation settings as needed.
4. **Configure environment variables**: Add the following to your `.env` file:
   ```env
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   UPLOAD_PRESET=dev_setups
   ```
5. **Redeploy your backend**: After updating `.env`, restart or redeploy your server. The `upload_preset: "dev_setups"` setting will now be recognized for image uploads.

### Running Locally
```bash
# Install dependencies
npm install

# Run backend in development mode
npm run dev

# Run frontend in development mode
npm run dev
```

### Testing

- **Unit Tests:** `npm run test` (backend and frontend)
- **Linting / Formatting:** `npm run lint` / `npm run format`

## Deployment Information

- **Live URL:** [*https://cookbook-app.example.com*](https://cookbook-app.example.com)
- **Platform:** Vercel (frontend) and Heroku (backend)
- Environment variables are configured in each platform’s settings.

## Individual Contributions

- **Lihao Xue**
  - Frontend architecture and UI/UX design
  - Authentication flows and role-based routing
  - Chef profile editor and calendar availability component
  - Screenshots and user guide documentation
- **Zuhao Zhang**
  - Express.js API design and implementation
  - PostgreSQL schema with Prisma and database migrations
  - Cloudinary media integration and file upload endpoints

*Contributions are aligned with commit history in our GitHub repository.*

## Lessons Learned and Concluding Remarks

Throughout this project, we enhanced our full-stack development skills, particularly in integrating cloud media services and secure authentication. Key takeaways include:

- **Secure Authentication:** Implementing bcrypt-based password hashing and JWT sessions.
- **Media Management:** Working with Cloudinary for scalable image handling.
- **RESTful API Design:** Building clear, maintainable endpoints for bookings and profiles.
- **Collaboration & Git Workflow:** We adopted feature branching and pull requests, improving code quality and team coordination.

Moving forward, potential enhancements include payment integration, user messaging features, recommendation algorithms, and a mobile-responsive PWA.

---

*Thank you for reviewing our project!*

