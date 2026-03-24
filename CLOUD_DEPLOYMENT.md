# 🌐 Cloud Deployment Guide: Bubble-check SaaS

This guide explains how to deploy your application online using **Vercel** (for the frontend/API) and **Neon** (for the PostgreSQL database).

---

## 🏗️ Phase 1: Database Setup (Neon)

1.  **Create an Account**: Go to [neon.tech](https://neon.tech) and sign up.
2.  **Create a Project**: Click "Create a Project" and name it `bubble-track`.
3.  **Get Connection String**: Once created, you will see a `DATABASE_URL`. It looks like:
    `postgresql://user:password@ep-lucky-smoke-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`
4.  **Keep this URL safe**; you will need it for Vercel and your `.env.local`.

---

## 🚀 Phase 2: Deploy to Vercel

1.  **Push to GitHub**:
    - Create a new repository on GitHub.
    - Push your local code to the repository:
      ```bash
      git init
      git add .
      git commit -m "Initialize Bubble-track"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
      git push -u origin main
      ```
2.  **Import to Vercel**:
    - Go to [vercel.com](https://vercel.com) and click "Add New" > "Project".
    - Import your GitHub repository.
3.  **Configure Environment Variables**:
    - During the setup, add the following Environment Variables:
      - `DATABASE_URL`: (The string you got from Neon)
      - `JWT_SECRET`: (Use a long random string, e.g., from your `.env.local`)
      - `NODE_ENV`: `production`
4.  **Deploy**: Click "Deploy". Vercel will build and host your site.

---

## 🛠️ Phase 3: Initialize the Database Schema

Once your Neon DB is connected, you need to create the tables.

1.  Go to the **SQL Editor** in your Neon dashboard.
2.  Paste the contents of [scripts/01-init-schema.sql](file:///c:/Users/Lokesh%20Agarwal/Desktop/bubble-track/scripts/01-init-schema.sql) into the editor.
3.  Click **Run**.

---

## ✅ End-to-End Verification

After deployment, check the following:
1.  **Signup**: Create a new account at `https://your-app.vercel.app/signup`.
2.  **Login**: Ensure you can log in and get redirected to the dashboard.
3.  **Dashboard**: Check if the metrics (though initially 0) load without errors.
4.  **Tickets**: Create a test ticket to verify the database connection is working.

---

### 💡 Pro Tips for Regular Usage
- **Custom Domain**: You can add a custom domain in Vercel settings under "Domains".
- **Logs**: Use `vercel logs` or the "Logs" tab in the Vercel dashboard to debug errors in real-time.
- **Backups**: Neon provides automatic snapshots of your data.
