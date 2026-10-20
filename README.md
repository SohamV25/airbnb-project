# Wanderlust

A full-stack Airbnb-style accommodation booking and listing application built with Node.js and Express. The project allows users to browse property listings, create new listings, edit or delete them, leave reviews, and sign up or log in to manage their own content.

This app is inspired by Airbnb and serves as a practical full-stack project to learn backend development, authentication, database modeling, and file uploads.

## Project Overview

The application includes:

- Property listings with images, price, location, and country
- User authentication and session management
- Secure login/signup flow using Passport.js
- CRUD operations for listings
- Review system for each property
- Image upload support through Cloudinary
- Flash messages for user feedback
- Responsive EJS-based frontend views

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- EJS (Embedded JavaScript templates)
- HTML/CSS
- JavaScript

### Authentication & Security
- Passport.js
- Passport-Local strategy
- express-session
- connect-flash

### File Uploads & Media
- multer
- Cloudinary
- multer-storage-cloudinary

### Validation & Utilities
- Joi
- method-override
- ejs-mate
- cookie-parser
- connect-mongo

## Project Structure

- `app.js` – Main Express server setup and configuration
- `controllers/` – Route logic for listings, users, and reviews
- `models/` – Mongoose schemas for users, listings, and reviews
- `routs/` – API routing for listings, users, and reviews
- `views/` – EJS templates for pages
- `public/` – Static assets such as CSS and frontend files
- `cloudConfig.js` – Cloudinary configuration for image storage
- `middleware.js` – Authentication and validation middleware
- `schema.js` – Validation schema definitions

## Features

### Listings
Users can:
- View all rental listings
- See detailed listing pages
- Add new listings
- Update existing listings
- Delete their own listings

### Reviews
Users can:
- Add reviews to a listing
- Remove reviews they no longer want

### Authentication
Users can:
- Sign up with username/email/password
- Log in securely
- Stay authenticated across the session
- Log out safely

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SohamV25/airbnb-project.git
   cd airbnb-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the required environment variables:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the application:
   ```bash
   node app.js
   ```

   Or use a development watcher such as:
   ```bash
   nodemon app.js
   ```

## Notes

This project demonstrates a practical full-stack architecture using Express and MongoDB, with EJS-based server-rendered pages rather than a modern SPA setup. It is a strong example of how to build a complete web application with authentication, CRUD operations, and file-based media management.

## License

This project is licensed under the ISC License.
