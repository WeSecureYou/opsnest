# OpsNest - Enterprise Operations Management SaaS

A modern, multi-tenant SaaS platform for managing internal operations including tasks, approvals, announcements, and team access with enterprise-grade security and role-based access control.

## Features

✅ **Multi-Tenant Architecture** - Secure data isolation with Row-Level Security
✅ **Task Management** - Create, assign, and track tasks with priority levels and due dates
✅ **Approval Workflows** - Multi-step approval chains with audit trails
✅ **Announcements** - Organization-wide or role-specific announcements
✅ **Team Management** - Hierarchical organization structure with departments
✅ **Role-Based Access Control** - Admin, Manager, Member, Guest roles with granular permissions
✅ **Activity Logging** - Complete audit trail for compliance
✅ **Enterprise Security** - JWT authentication, password hashing, CSRF protection

## Tech Stack

### Frontend
- Next.js 14 (React 18, TypeScript)
- Tailwind CSS for styling
- Sonner for notifications
- React Hook Form for forms
- Zod for validation
- Axios for API calls
- TanStack Query for data fetching

### Backend
- Next.js API Routes
- Node.js runtime
- NextAuth.js for authentication

### Database
- **MongoDB** (recommended for SaaS) or **Supabase PostgreSQL**
- Prisma ORM
- Row-Level Security (RLS) for multi-tenancy

## Getting Started

### Prerequisites
- Node.js 18+ (LTS)
- npm or yarn
- MongoDB Atlas account OR Supabase account
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/opsnest.git
cd opsnest
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

**For MongoDB:**
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/opsnest"
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

**For Supabase PostgreSQL:**
```env
DATABASE_URL="postgresql://user:password@host:5432/opsnest"
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

4. **Generate NEXTAUTH_SECRET**
```bash
openssl rand -base64 32
```

5. **Initialize database**
```bash
npx prisma db push
```

This will create all tables based on the schema.

6. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

7. **Create your first account**
- Navigate to `/auth/signup`
- Sign up with your details
- You'll be created as an admin of your organization

## Project Structure

```
opsnest/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── tasks/             # Task API routes
│   │   ├── approvals/         # Approval API routes
│   │   └── announcements/     # Announcement API routes
│   ├── auth/                  # Auth pages (signin, signup)
│   ├── dashboard/             # Protected dashboard routes
│   │   ├── tasks/
│   │   ├── approvals/
│   │   ├── announcements/
│   │   ├── team/
│   │   └── analytics/
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # Auth utilities
│   └── rbac.ts                # Role-based access control
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── .env.example               # Environment template
└── package.json
```

## Database Schema Highlights

### Multi-Tenancy
- **Organization** - Represents a company/tenant
- **User** - Users belong to an organization
- **UserRole** - Maps users to roles with hierarchical levels

### Features
- **Task** - Work items with status, priority, and assignments
- **Approval** - Approval requests with workflow tracking
- **Announcement** - Organization-wide or role-targeted announcements
- **Department** - Hierarchical organizational structure
- **ActivityLog** - Audit trail for compliance

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in with credentials
- `POST /api/auth/signup` - Create new account/organization
- `POST /api/auth/signout` - Sign out

### Tasks
- `GET /api/tasks` - List tasks (paginated, with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/[id]` - Get task details
- `PATCH /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Approvals
- `GET /api/approvals` - List approvals
- `POST /api/approvals` - Create approval request
- `GET /api/approvals/[id]` - Get approval details
- `POST /api/approvals/[id]/approve` - Approve request
- `POST /api/approvals/[id]/reject` - Reject request

### Announcements
- `GET /api/announcements` - List announcements
- `POST /api/announcements` - Create announcement
- `GET /api/announcements/[id]` - Get announcement
- `DELETE /api/announcements/[id]` - Delete announcement

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Set environment variables:
  - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
  - `NEXTAUTH_URL` - Your production domain (e.g., https://opsnest.vercel.app)
  - `DATABASE_URL` - Your MongoDB or Supabase connection string

3. **Deploy**
- Vercel will auto-deploy on push to main
- Your app is now live!

### Database Setup

#### Option 1: MongoDB Atlas (Recommended for SaaS)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`
4. Add to Vercel environment variables

#### Option 2: Supabase (PostgreSQL)

1. Create account at https://supabase.com
2. Create a new project
3. Copy connection string from project settings
4. Change Prisma provider in `schema.prisma` to `postgresql`
5. Add to Vercel environment variables

## Role-Based Access Control

### Roles Hierarchy
- **Admin (Level 3)** - Full access, organization management
- **Manager (Level 2)** - Can create/edit tasks and approvals, manage team
- **Member (Level 1)** - Can create tasks and approvals
- **Guest (Level 0)** - Read-only access

### Permission Matrix

| Action | Admin | Manager | Member | Guest |
|--------|-------|---------|--------|-------|
| Create Task | ✅ | ✅ | ✅ | ❌ |
| Edit Task | ✅ | ✅ | Own only | ❌ |
| Delete Task | ✅ | ✅ | ❌ | ❌ |
| Create Approval | ✅ | ✅ | ✅ | ❌ |
| Approve/Reject | ✅ | ✅ | ❌ | ❌ |
| Create Announcement | ✅ | ✅ | ❌ | ❌ |
| Manage Team | ✅ | ✅ | ❌ | ❌ |
| View Activity Logs | ✅ | ❌ | ❌ | ❌ |

## Security Features

✅ **Authentication** - NextAuth.js with JWT tokens
✅ **Password Security** - bcryptjs hashing with salt
✅ **Session Management** - 30-day session expiration
✅ **CORS** - Configured for secure cross-origin requests
✅ **Rate Limiting** - Prevent brute force attacks (can be enabled)
✅ **CSRF Protection** - Built into NextAuth.js
✅ **Input Validation** - Zod schema validation on all endpoints
✅ **SQL Injection Prevention** - Prisma ORM prevents SQL injection
✅ **Multi-Tenancy Isolation** - Organization-level data separation
✅ **Audit Logging** - Complete activity trail

## Monitoring & Logging

The application logs all critical actions:
- User login/logout
- Task creation/modification/deletion
- Approval workflow changes
- Permission changes
- Failed authentication attempts

Check logs in your hosting provider's dashboard.

## Performance Optimization

- ✅ Database indexes on org_id, user_id, created_at
- ✅ Connection pooling with Prisma
- ✅ Query pagination (20 items per page)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Image optimization

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Future Enhancements

- [ ] Real-time WebSocket support for live updates
- [ ] File attachments for tasks and approvals
- [ ] Email notifications system
- [ ] Advanced analytics and reporting
- [ ] Custom workflows
- [ ] API key authentication for integrations
- [ ] Mobile app
- [ ] Single sign-on (SSO) integration

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For questions or issues, please open a GitHub issue or contact support@opsnest.io

---

**Built with ❤️ for enterprise operations**
