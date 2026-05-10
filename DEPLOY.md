# Deployment Guide — Vercel (frontend) + Render (backend) + MongoDB Atlas

This document describes a recommended deployment flow for this repository:

- Frontend: Vercel (static site from `frontend`)
- Backend: Render (Node web service from `backend`)
- Database: MongoDB Atlas

Summary
1. Create a MongoDB Atlas cluster and database user.
2. Deploy the backend to Render (or Railway) and set environment variables.
3. Deploy the frontend to Vercel and set `VITE_API_BASE` to the backend URL.

Prerequisites
- A GitHub account with the repository connected
- Accounts for MongoDB Atlas, Vercel, and Render (or alternatives)

1) MongoDB Atlas (create cluster + user)
- Create a free cluster in Atlas.
- Add a database user with a strong password (note the username/password).
- Add your application IP or use `0.0.0.0/0` for testing (not recommended for production).
- Copy the connection string (SRV):
  `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`

2) Backend — Render (recommended)
- In Render: New → Web Service → Connect GitHub → select this repo.
- Set the **Root Directory** to `backend` (so Render runs build/start in that folder).
- Build Command: `npm install`
- Start Command: `node index.js` (or `npm start`)
- Add environment variables in Render dashboard:
  - `MONGODB_URI` — Atlas connection string
  - `SECRET_KEY` — JWT secret
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (if using Cloudinary)
  - `FRONTEND_URL` — the Vercel URL (set after frontend deploy)
- Deploy and check logs for `Database connected successfully`.

3) Frontend — Vercel
- Import Project → GitHub → select this repo.
- Set **Root Directory** to `frontend`.
- Framework Preset: Vite (or set Build Command `npm run build`, Output Directory `dist`).
- Set Environment Variable in Vercel:
  - `VITE_API_BASE` = `https://<your-backend-url>` (e.g., the Render service URL)
- Deploy. After deployment, copy the Vercel URL and set `FRONTEND_URL` on the backend host.

4) Verify
- Backend logs should show DB connected.
- Visit frontend URL, verify API calls succeed (browser devtools Network tab).
- Use `backend/mongo-ping.js` to validate connectivity (see README above).

Notes & alternatives
- You can host backend on Railway, Heroku, or Render; adjust start/build commands accordingly.
- For single-host deployments, Render can host both frontend (Static Site) and backend (Web Service).
- Do NOT commit secrets to the repo; use the hosting provider UI / secret store.
