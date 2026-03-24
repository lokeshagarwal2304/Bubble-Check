# Bubble-check Deployment Guide

## Quick Deployment (5 minutes)

### Prerequisites
- GitHub account (for easy Vercel integration)
- Neon PostgreSQL account (database)
- Vercel account (hosting)

### Step 1: Prepare Database

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Create a database (default name: `neon`)
4. Create a new role with password
5. Copy the connection string: `postgresql://user:password@host/neon`

### Step 2: Deploy to Vercel

**Option A: Git Integration (Recommended)**

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   - `DATABASE_URL` = Your Neon connection string
   - `JWT_SECRET` = Generate a strong random string
5. Click "Deploy"

**Option B: Direct CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

Then set environment variables in Vercel dashboard.

### Step 3: Setup Database Schema

After deployment, run migrations:

```bash
# Option 1: Using Vercel CLI
vercel env pull # Get environment variables
pnpm run db:setup # This should connect to remote DB

# Option 2: Manually
# Connect to Neon and run queries from scripts/01-init-schema.sql
```

## Detailed Deployment Instructions

### 1. Code Repository Setup

```bash
# Initialize Git (if not already done)
git init

# Add remote repository
git remote add origin <your-github-url>

# Initial commit
git add .
git commit -m "feat: initial bubble-check deployment"
git push -u origin main
```

### 2. Environment Configuration

**Local Development** (`.env.local`):
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/bubble_check
JWT_SECRET=your-dev-secret-key-here
NODE_ENV=development
```

**Production** (Vercel Dashboard):
1. Go to Project Settings → Environment Variables
2. Add variables:
   - `DATABASE_URL` - Neon PostgreSQL connection string
   - `JWT_SECRET` - Secure random string (min 32 chars)
   - `NODE_ENV` - Set to "production"

Generate secure JWT secret:
```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256})) | Out-String
```

### 3. Database Setup

**Create Neon Database:**

1. Visit [Neon Console](https://console.neon.tech)
2. Create project → Select region → Create
3. Note the connection string format:
   ```
   postgresql://username:password@hostname/databasename?sslmode=require
   ```

**Initialize Schema:**

```bash
# Option 1: Locally (connects to Neon)
DATABASE_URL="<your-neon-url>" pnpm run db:setup

# Option 2: Using psql directly
psql "<your-connection-string>" -f scripts/01-init-schema.sql

# Option 3: From Neon Console
# Copy/paste SQL from scripts/01-init-schema.sql into Neon SQL editor
```

### 4. Testing Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Open browser
# http://localhost:3000
```

### 5. Monitoring & Maintenance

**Vercel Dashboard:**
- Monitor deployments and functions
- Check build logs
- Review environment variables
- Set up analytics

**Neon Dashboard:**
- Monitor database performance
- Check connection pool status
- View query logs
- Manage backups

## Deployment Checklist

- [ ] Database created and schema initialized
- [ ] Environment variables set on Vercel
- [ ] GitHub repository connected to Vercel
- [ ] Build succeeds: `pnpm build`
- [ ] No TypeScript errors
- [ ] API endpoints tested (using Postman/curl)
- [ ] Authentication flow tested
- [ ] Database queries working
- [ ] Images loading correctly
- [ ] Responsive design working on mobile
- [ ] Error pages displaying
- [ ] Performance acceptable

## Common Deployment Issues

### Issue: Database Connection Error

**Symptoms**: `Error: getaddrinfo ENOTFOUND`

**Solutions**:
1. Verify `DATABASE_URL` in environment variables
2. Check Neon connection string format (must include `?sslmode=require`)
3. Ensure IP is whitelisted in Neon
4. Test connection locally first

```bash
# Test connection
psql "<your-connection-string>"
```

### Issue: JWT Secret Not Set

**Symptoms**: `Error: JWT_SECRET not found`

**Solutions**:
1. Generate new secret: `openssl rand -base64 32`
2. Add to Vercel environment variables
3. Redeploy: `vercel --prod`

### Issue: Build Fails

**Symptoms**: Build error in Vercel logs

**Solutions**:
1. Check build logs for errors
2. Verify all dependencies in `package.json`
3. Check for TypeScript errors: `pnpm type-check`
4. Test locally: `pnpm build`

```bash
# Local debugging
pnpm install    # Reinstall deps
pnpm clean      # Clear cache
pnpm build      # Build locally
pnpm start      # Test build
```

### Issue: API Routes Return 404

**Symptoms**: `/api/tickets` returns 404

**Solutions**:
1. Verify API route file exists: `app/api/tickets/route.ts`
2. Check route handler is exported
3. Verify correct HTTP method (GET, POST, etc.)
4. Check environment variables loaded

### Issue: Authentication Not Working

**Symptoms**: Login fails, tokens not working

**Solutions**:
1. Verify `JWT_SECRET` is set and same in all environments
2. Check token is being stored in localStorage
3. Verify API requests include Authorization header
4. Check token expiration settings in `lib/auth.ts`

## Performance Optimization

### For Production

1. **Database**: Add indexes for frequently queried columns
2. **Images**: Optimize and use Next.js Image component
3. **Caching**: Configure caching headers in `next.config.mjs`
4. **Bundle**: Analyze bundle size: `pnpm run build --analyze`
5. **API**: Implement rate limiting for public endpoints

### Example: Add Index to Database

```sql
-- Speed up common queries
CREATE INDEX idx_tickets_user_id ON tickets(created_by);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_comments_ticket_id ON comments(ticket_id);
```

## Scaling Strategy

### As User Base Grows

1. **Database**:
   - Upgrade Neon plan
   - Add read replicas
   - Implement connection pooling

2. **Application**:
   - Enable Vercel Analytics
   - Use CDN for static assets
   - Implement caching strategy

3. **Features**:
   - Add background jobs (Vercel Cron Jobs)
   - Implement real-time updates (WebSockets)
   - Add email notifications

## Rollback Instructions

If deployment has issues:

```bash
# Vercel automatically keeps previous deployments
# Go to Vercel Dashboard → Deployments
# Click "Promote to Production" on previous deployment

# Or from CLI
vercel rollback
```

## Domain Configuration

1. Go to Vercel Project Settings → Domains
2. Add custom domain
3. Update DNS records (provided by Vercel)
4. Wait for DNS propagation (can take 24-48 hours)

## SSL/HTTPS

- Automatic with Vercel (free Let's Encrypt certificate)
- HTTPS enabled by default
- No additional configuration needed

## Continuous Deployment

**GitHub Actions** (Optional):

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Database Backups

**Neon Automatic Backups**:
- Automatic daily backups
- Retention: 7 days (free), up to 30 days (paid)
- Restore from Neon console

**Manual Backup**:
```bash
# Create backup
pg_dump "<connection-string>" > backup.sql

# Restore backup
psql "<connection-string>" < backup.sql
```

## Monitoring & Alerts

Set up alerts in Vercel for:
- Failed deployments
- High error rate
- Slow response times
- Database connection issues

## Support & Help

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Status Pages**:
  - Vercel Status: https://www.vercel-status.com
  - Neon Status: https://status.neon.tech

## Final Checks

1. ✅ Visit your deployed URL
2. ✅ Test signup/login
3. ✅ Create a ticket
4. ✅ Test all main features
5. ✅ Check mobile responsiveness
6. ✅ Verify all API endpoints
7. ✅ Monitor logs for errors

---

**Deployment is complete!** 🎉

Your Bubble-check application is now live and ready for use.

For any issues, check the Vercel and Neon dashboards for detailed logs and status information.
