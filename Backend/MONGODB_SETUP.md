# MongoDB Setup Instructions

## Step 1: Install MongoDB
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install MongoDB following the installer instructions
3. Make sure MongoDB service is running

## Step 2: Create Database
1. Open MongoDB Compass (GUI tool) or use MongoDB shell
2. Create a new database named: `portfolio-review`
3. The application will automatically create collections when needed

## Step 3: Alternative - Use MongoDB Atlas (Cloud)
If you prefer cloud database:
1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update the MONGODB_URI in .env file with your Atlas connection string

## Step 4: Environment Setup
Make sure your .env file has the correct MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/portfolio-review
```

Or for Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-review
```

## Step 5: Install Backend Dependencies
```bash
cd Backend
npm install
```

## Step 6: Start the Backend Server
```bash
npm run dev
```

The server will run on http://localhost:5000

## Collections Created Automatically:
- users (for authentication and user profiles)
- portfolios (for portfolio data and versions)
- reviews (for review requests and completed reviews)
- posts (for community posts)

## Default Test Data:
The application will work with empty database. You can register new users through the frontend.