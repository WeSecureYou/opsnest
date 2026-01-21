# OpsNest - Quick Start Guide

Get OpsNest running in **less than 5 minutes**.

## 1. Clone & Install (1 minute)

```bash
cd opsnest
npm install
```

## 2. Set Up Environment (1 minute)

### Choose One:

#### Option A: MongoDB Atlas (Easiest)
```bash
# 1. Create free account: https://www.mongodb.com/cloud/atlas
# 2. Create M0 cluster
# 3. Get connection string

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with:
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/opsnest"
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
```

#### Option B: Supabase (PostgreSQL)
```bash
# 1. Create account: https://supabase.com
# 2. Create project
# 3. Get connection string

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with:
DATABASE_URL="postgresql://user:pass@host:5432/postgres"
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
```

## 3. Initialize Database (1 minute)

```bash
npx prisma db push
```

## 4. Run Development Server (1 minute)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 5. Create Account (1 minute)

1. Go to http://localhost:3000
2. Click "Get Started"
3. Sign up with:
   - Name: Your Name
   - Email: your@email.com
   - Password: Secure password
   - Organization: Your Company

4. You're in! Welcome to OpsNest 🎉

---

## Deployment to Vercel (2 minutes)

### Via GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/opsnest.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your repository
   - Add environment variables:
     - `DATABASE_URL` - Your MongoDB/Supabase URL
     - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
     - `NEXTAUTH_URL` - Your Vercel URL

3. **Deploy**
   - Click "Deploy"
   - Done! 🚀

### Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
# Follow prompts and add environment variables
```

---

## First Steps After Setup

1. **Create Your First Task**
   - Go to Dashboard → Tasks
   - Click "New Task"
   - Fill in details and create

2. **Invite Team Members**
   - Go to Dashboard → Team
   - Click "Invite Member"
   - Send invitations to colleagues

3. **Post an Announcement**
   - Go to Dashboard → Announcements
   - Click "New Announcement"
   - Share important updates

4. **Create an Approval Workflow**
   - Go to Dashboard → Approvals
   - Click "Request Approval"
   - Set up multi-step approvals

---

## Common Issues

### "connect ENOENT" Error
**Solution:** Check your DATABASE_URL is correct in .env.local

### "Module not found" Error
**Solution:** Run `npm install` again

### Can't sign up
**Solution:** Verify your database is connected by running `npx prisma studio`

### Stuck?
Check [README.md](./README.md) or [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Tech Stack Overview

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Backend:** Node.js + Next.js API Routes
- **Database:** MongoDB or Supabase PostgreSQL
- **Auth:** NextAuth.js with JWT
- **UI:** Tailwind CSS + custom components
- **ORM:** Prisma

---

## What's Included

✅ Multi-tenant architecture
✅ Role-based access control (Admin/Manager/Member/Guest)
✅ Complete task management
✅ Approval workflows
✅ Announcements system
✅ Team management
✅ Activity logging
✅ JWT authentication
✅ Beautiful UI with Tailwind

---

## Next: Learn More

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT.md) - Production setup
- [API Documentation](./README.md#api-endpoints) - API reference
- [Architecture](./README.md#project-structure) - Project structure

---

## Support

- 📧 Email: support@opsnest.io
- 🐛 Report Issues: GitHub Issues
- 💬 Community: Discord

**Happy building! 🚀**
