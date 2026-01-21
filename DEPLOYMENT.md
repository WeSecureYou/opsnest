# OpsNest Deployment Guide

## Quick Start Deployment (5 minutes)

### Step 1: Prepare Your Code

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial OpsNest deployment"
git branch -M main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using GitHub + Vercel UI

1. Push code to GitHub
   ```bash
   git remote add origin https://github.com/yourusername/opsnest.git
   git push -u origin main
   ```

2. Visit https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

### Step 3: Configure Database

#### MongoDB Atlas (Recommended)

1. **Create MongoDB Account**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up or log in
   - Create organization and project

2. **Create Cluster**
   - Click "Create" → choose "M0 Free" tier
   - Select region closest to users
   - Wait for cluster to be ready (~5-10 min)

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/opsnest`

4. **Create Database User**
   - Go to "Database Access" → "Add New Database User"
   - Create username and password
   - Grant "Atlas admin" role
   - Update connection string with credentials

#### Supabase PostgreSQL (Alternative)

1. **Create Supabase Account**
   - Visit https://supabase.com
   - Sign up with GitHub
   - Create new project
   - Choose region

2. **Get Connection String**
   - Project Settings → Database
   - Copy "Connection string" (URI format)
   - Format: `postgresql://username:password@host:5432/postgres`

3. **Update Prisma**
   - In `prisma/schema.prisma`, change:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```

### Step 4: Set Vercel Environment Variables

In Vercel Dashboard:

1. **Project Settings** → **Environment Variables**

2. **Add variables** (for MongoDB):
   ```
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/opsnest
   NEXTAUTH_SECRET=<generate-new>
   NEXTAUTH_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

3. **Generate NEXTAUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

### Step 5: Initialize Database Schema

After deploying to Vercel, initialize your database:

```bash
# Option 1: Via Vercel Functions (one-time)
# The database schema will be created when the first API request is made

# Option 2: Manually via local setup
npx prisma db push --skip-generate
```

### Step 6: Access Your App

1. Visit your Vercel deployment URL: `https://your-app.vercel.app`
2. Go to `/auth/signup`
3. Create your first account
4. Start using OpsNest!

---

## Production Setup Checklist

### Security
- [ ] Change NEXTAUTH_SECRET to a new secure value
- [ ] Set NEXTAUTH_URL to your production domain
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure database firewall (MongoDB Atlas, Supabase)
- [ ] Set strong passwords for database users
- [ ] Enable MFA on hosting platform account

### Database
- [ ] Verify DATABASE_URL is correct
- [ ] Create database backups
- [ ] Enable automatic backups in MongoDB Atlas or Supabase
- [ ] Monitor database usage and scaling
- [ ] Test disaster recovery procedure

### Monitoring
- [ ] Set up error tracking (optional: Sentry)
- [ ] Enable Vercel analytics
- [ ] Monitor application logs
- [ ] Set up alerts for errors

### Performance
- [ ] Test with production data volume
- [ ] Optimize database indexes
- [ ] Enable caching where applicable
- [ ] Test API response times

---

## Environment Variables Reference

### Required Variables
```env
# Database connection string
DATABASE_URL=<your-database-url>

# NextAuth secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=<your-secret-key>

# Application URL
NEXTAUTH_URL=https://your-domain.com

# Node environment
NODE_ENV=production
```

### Optional Variables
```env
# Email configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@opsnest.io

# Error tracking
SENTRY_DSN=https://your-sentry-dsn

# Analytics
ANALYTICS_ENABLED=true
```

---

## Troubleshooting

### Database Connection Issues

**Error: "connect ENOENT /tmp/.../mongodb.sock"**
- Solution: Check DATABASE_URL format is correct
- Verify MongoDB Atlas network access is enabled
- Check username/password in connection string

**Error: "P1000: Authentication failed"**
- Solution: Verify database credentials
- Ensure database user has proper permissions
- Check for special characters in password (URL encode if needed)

### Deployment Failures

**Build fails with "Module not found"**
- Solution: Delete `node_modules` and `.next`
- Run `npm install` again
- Check for typos in imports

**Build fails with Prisma errors**
- Solution: Run `npx prisma generate`
- Ensure `.env` has valid DATABASE_URL
- Check schema.prisma for syntax errors

### Authentication Issues

**"Invalid token" or "Session expired"**
- Solution: Regenerate NEXTAUTH_SECRET
- Clear browser cookies
- Log out and sign in again

**Can't sign up**
- Solution: Check DATABASE_URL connectivity
- Verify database has tables created
- Check for duplicate email in database

---

## Scaling to Production

### Phase 1: Validation (After Launch)
- Monitor error rates and performance
- Gather user feedback
- Identify bottlenecks
- Plan improvements

### Phase 2: Optimization
- Add caching layer (Redis)
- Optimize database queries
- Implement image optimization
- Enable CDN for static assets

### Phase 3: Advanced Features
- Add real-time WebSockets
- Implement file uploads
- Add email notifications
- Build mobile app

---

## Cost Estimation

### Vercel Hosting
- **Free tier**: Up to 100 GB bandwidth/month
- **Pro tier**: $20/month + overages
- **Enterprise**: Custom pricing

### Database
- **MongoDB Atlas M0**: Free (512 MB)
- **MongoDB Atlas M10**: $57/month (2 GB)
- **Supabase**: Free tier includes generous limits

### Total Monthly Cost
- **Starter**: $0-20 (free tier)
- **Professional**: $20-100 (paid tiers)
- **Enterprise**: $100+ (custom)

---

## Support & Documentation

- **GitHub Issues**: Report bugs and request features
- **Documentation**: See README.md
- **Community**: Join our Discord server
- **Email**: support@opsnest.io

---

**Your OpsNest is now live and ready to manage operations! 🚀**
