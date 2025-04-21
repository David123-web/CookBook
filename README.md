# CookBook Final Report

## Team Information
- **Zuhao Zhang 1005828080** (GitHub Username: David123-web) - Email: _davidzhangzuhao@gmail.com_
- **Lihao Xue 1011809875** (GitHub Username: Madnessvia) - Email: _xuelihaogpa4@gmail.com_

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
- **File / Media Storage:** Cloudinary for chef profile images
- **Authentication / Authorization:** Passwords hashed with bcrypt, JWT for session tokens

## Features

1. **User Authentication**
   - Role-based signup (Chef or User) with secure password hashing (bcrypt)
   - JWT-based tokens for authenticated requests
2. **Cloud Storage for Profile Photos**
   - Utilize Cloudinary for profile photo storage
3. **Chef Profiles**
   - Profile creation: bio, specialties, hourly rate, and availability calendar
   - Image upload via Cloudinary
   - Public reviews and ratings display
4. **Browsing & Booking**
   - Browse a list of available chefs with basic details
   - Booking requests with date/time selection
5. **Review System**
   - Post-service star rating (1–5) and comment box
   - Chef public responses to reviews
6. **Message Box**  
   - Messaging functionality between Chef and User 
   - Message history rendered real-time

*These features align with course requirements by demonstrating full-stack development, secure auth, database interactions, and file storage management.*
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
  

### Scenario: Browsing Chefs

1.  **Visit Home Page:** Open the application root (`/`) to see all available chefs displayed as cards.
    
2.  **Explore Chef Cards:** Each card presents the chef’s photo, name, location, and average rating.
    
3.  **View & Book:** Click **View & Book** on any card to view full profile details and initiate a booking.
    

![Homepage](CookBook_photos/homepage.jpg)


### Scenario: User Signup

1.  On the top right corner of the **CookBook** homepage, click the **Sign Up** button.
    
2.  On the signup form, enter your **Name**, **Email**, and **Password**.
    
3.  **Select your role**:
    
    -   **Chef**: Your profile will become a card on the home page that customers can view and book.
        
    -   **Customer**: You can browse chef cards and request bookings.
        
4.  (Optional) Upload a profile picture or leave the default avatar.
    
5.  Click **Sign Up** to create your account.
    
6.  Upon successful registration:
    
    -   **Chefs** are redirected to their profile page, where they can edit their bio, specialties, pricing, and availability.
        
    -   **Customers** are redirected to the home page to browse and book chefs.
        

![Signup Page](CookBook_photos/signuppage.jpg)

### Scenario: Booking a Chef

1.  **Select a Chef:** On the home page, click **View & Book** on your chosen chef’s card. ![Chef Card](CookBook_photos/chef_card.jpg)
    
2.  **Review Availability:** On the chef’s profile page, review their bio, specialties, and calendar. Available dates are highlighted in green.
    
3.  **Pick a Date:** Click a green date to select it. Only available dates can be chosen. ![Select Available Date](CookBook_photos/submitbooking.jpg)
    
4.  **Message the Chef:** Navigate to **Messages** to chat with the chef and finalize the exact time and location. ![Messaging Chef](CookBook_photos/messages&reviews.jpg)
    

### Scenario: Chef Manages Availability

1.  **Log in as a Chef:** Access your account and click on your profile icon in the top-right corner.
    
2.  **Edit Your Profile:** Select **Edit Profile** to open the profile editor.
    
3.  **Set Available Dates:** In the availability calendar, click on dates to toggle availability (green = available, gray = unavailable).
    
4.  **Save Changes:** Click **Save Profile** to submit your availability updates.
    
5.  **Verify on Home Page:** Log out or switch to a Customer view; the updated availability will be reflected on your chef card calendar highlights.
    

![Chef Profile & Editing](CookBook_photos/profile&editing.jpg)

### Scenario: Viewing Bookings

-   **For Customers:**
    
    1.  After requesting a booking, click the **Bookings** tab in the navigation bar.
        
    2.  Under **Pending**, find your request with the chef’s name, date, and status.
        
    3.  Under **Past**, review completed bookings and leave reviews if desired.
        
-   **For Chefs:**
    
    1.  Log in and click the **Bookings** tab.
        
    2.  Under **Pending**, accept or decline new booking requests.
        
    3.  Under **Upcoming**, view confirmed upcoming services.
        
    4.  Under **Completed**, see past bookings and respond to customer reviews.
        

![View Bookings](CookBook_photos/loginaschef&andviewbookings.jpg)

### Scenario: Submitting a Review

1.  **Log back in as a Customer** and navigate to the **Bookings** tab.
    
2.  Under **Past**, locate the completed booking you want to review and click **Review**.
    
3.  In the **Review Form**, select a star rating (1–5) and enter your comments.
    
4.  Click **Submit Review** to save your feedback.
    
5.  Refresh the **Chef’s Profile** or return to the home page to see:
    
    -   The new review in the **Reviews** list.
        
    -   The updated overall star rating is displayed on the chef’s card.
        

![Write and Submit Review](CookBook_photos/message&reviews2.jpg)


## Development Guide

### Prerequisites

- Node.js v16+ and npm
- PostgreSQL v12+
- Cloudinary account (cloud name, API key, API secret)

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/David123-web/CookBook
   cd CookBook/backend
   ```
2. **Copy environment template**
   ```bash
   cp .env.example .env
   ```
3. **Configure **`.env`** variables**
   ```dotenv
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME   // Your database URL
   JWT_SECRET=your_jwt_secret                                  // anything is good here
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Database Initialization
```bash
cd CookBook/backend

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
   ```
5. **Redeploy your backend**: After updating `.env`, restart or redeploy your server. The `upload_preset: "dev_setups"` setting will now be recognized for image uploads.

### Running Locally
```bash
# Install dependencies and run in development mode
cd CookBook/backend
npm install
npm run dev

cd CookBook/frontend
npm install
npm run dev
```

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
