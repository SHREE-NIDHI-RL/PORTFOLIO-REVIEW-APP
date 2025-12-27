# Portfolio Review App - MERN Stack

A complete portfolio review platform where portfolio owners can get feedback from professional reviewers.

## Features
- User authentication (Owner/Reviewer roles)
- Portfolio creation with multiple versions
- File upload support (PDF, external links)
- Review request system
- Structured review feedback
- Community posts
- Real-time notifications

## Tech Stack
- **Frontend**: React, React Router, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Setup Instructions

### 1. MongoDB Setup
Follow instructions in `Backend/MONGODB_SETUP.md`

### 2. Backend Setup
```bash
cd Backend
npm install
npm run dev
```
Server runs on http://localhost:5000

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Portfolios
- POST `/api/portfolios` - Create portfolio
- GET `/api/portfolios/my-portfolios` - Get user's portfolios
- GET `/api/portfolios/public` - Get public portfolios
- POST `/api/portfolios/:id/versions` - Add portfolio version
- PATCH `/api/portfolios/:id/visibility` - Update visibility

### Reviews
- POST `/api/reviews/request` - Send review request
- GET `/api/reviews/requests` - Get review requests
- GET `/api/reviews/my-reviews` - Get user's reviews
- PATCH `/api/reviews/:id/status` - Update review status
- PATCH `/api/reviews/:id/submit` - Submit review
- POST `/api/reviews/:id/post` - Create post from review

### Users
- GET `/api/users/reviewers` - Get all reviewers
- GET `/api/users/reviewer/:email` - Get reviewer by email
- GET `/api/users/posts` - Get all posts

## Environment Variables
Create `.env` file in Backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-review
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

## Usage
1. Register as Owner or Reviewer
2. Owners can create portfolios and request reviews
3. Reviewers can accept requests and provide structured feedback
4. Completed reviews can be posted to community
5. All users can view community posts

## Database Schema
- **Users**: Authentication and profile data
- **Portfolios**: Portfolio content with versions
- **Reviews**: Review requests and feedback
- **Posts**: Community posts with reviews