# Deployment Instructions for StudentVerse Application

## Vercel Deployment Guide

Your project is ready for deployment to Vercel. Follow these steps to deploy:

### Prerequisites
- Node.js installed on your local machine
- Vercel CLI installed (`npm install -g vercel`)
- A Vercel account

### Step 1: Navigate to the frontend directory
```bash
cd frontend
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open a browser window where you can authenticate with your Vercel account.

### Step 3: Deploy to Production
```bash
vercel --prod
```

The project is already configured with:
- A `vercel.json` file in the frontend directory
- Proper Next.js configuration in `next.config.ts`
- All necessary dependencies in `package.json`

### Alternative Method: GitHub Integration
Instead of deploying from the command line, you can connect your GitHub repository to Vercel:

1. Go to https://vercel.com/dashboard
2. Click "Add New..." and select "Project"
3. Choose "Import Git Repository"
4. Search for your repository: `ParvezCoder/hackathon-2-pahse-2`
5. Vercel will automatically detect that this is a Next.js project in the `frontend` directory
6. Complete the setup and your project will be deployed automatically
7. Future pushes to the repository will trigger automatic deployments

### Project Structure
- Frontend: Next.js application (located in `frontend/` directory)
- Backend: FastAPI application (located in `backend/` directory)

Note: This deployment will only deploy the frontend to Vercel. You'll need to host the backend separately (e.g., on Railway, Heroku, or AWS).

### Environment Variables
If your application requires environment variables, you can add them in the Vercel dashboard under your project settings.

Once deployed, Vercel will provide you with a unique URL for your live application.