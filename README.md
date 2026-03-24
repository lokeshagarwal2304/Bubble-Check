# Bubble-check SaaS - Project Management Application

A comprehensive project tracking and ticket management SaaS application built with Next.js 16, React 19, and Tailwind CSS. Features a beautiful glassmorphic design with purple gradients, full authentication, database integration, and advanced project management capabilities.

## Features

### Core Features
- **Dashboard** - Real-time analytics, project overview, and recent activity
- **Ticket Management** - Create, edit, and manage tickets with full lifecycle tracking
- **Ticket Details** - Comprehensive ticket views with tabs for activity, checklists, comments, time tracking, and attachments
- **Comments System** - In-ticket discussions with user attribution
- **Checklists** - Task tracking within tickets with completion progress
- **Time Tracking** - Log hours and track time spent on tickets
- **Activity Log** - Complete audit trail of all actions and changes

### Advanced Views
- **Kanban Board** - Drag-and-drop ticket management across status columns
- **Gantt Chart** - Timeline visualization of ticket progress and deadlines
- **Calendar View** - Due date-based ticket organization with event listing
- **Reports & Analytics** - Charts, metrics, and performance analytics

### User Management
- **Authentication** - JWT-based login and signup with secure password hashing
- **User Profile** - Personal account settings and preferences
- **Accounts** - Multiple account management with team members
- **Team Activity** - Track team productivity and member actions

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT with bcrypt password hashing
- **Charts**: Recharts for data visualization
- **UI Components**: shadcn/ui with custom glassmorphic styling
- **Icons**: Lucide React

## Project Structure

```
app/
├── (auth)/                 # Authentication routes
│   ├── login/
│   └── signup/
├── dashboard/              # Protected dashboard routes
│   ├── page.tsx           # Main dashboard
│   ├── tickets/           # Ticket management
│   ├── kanban-board/      # Kanban view
│   ├── gantt-chart/       # Gantt timeline
│   ├── calendar/          # Calendar view
│   ├── reports/           # Analytics
│   ├── accounts/          # Account management
│   ├── profile/           # User profile
│   ├── activity/          # Activity log
│   ├── time-tracking/     # Time tracking
│   └── layout.tsx
├── api/                    # API routes
│   └── auth/              # Authentication endpoints
└── page.tsx               # Root redirect

components/
├── sidebar.tsx            # Navigation sidebar
├── analytics-card.tsx     # Metric cards
├── ticket-status-chart.tsx # Status overview
├── recent-activity.tsx    # Activity feed
├── ticket-row.tsx         # Ticket list item
├── kanban-column.tsx      # Kanban column
├── ticket-checklist.tsx   # Checklist component
├── ticket-comments.tsx    # Comments section
└── ticket-time-entries.tsx # Time tracking

lib/
├── db.ts                  # Database utilities
├── auth.ts                # Authentication utilities
└── utils.ts               # General utilities

scripts/
└── 01-init-schema.sql     # Database initialization
```

## Database Schema

- **users** - User accounts
- **accounts** - Team accounts/organizations
- **tickets** - Project tickets/issues
- **comments** - Ticket comments
- **checklists** - Checklist items
- **time_entries** - Time tracking logs
- **activity_logs** - Audit trail

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL (or Neon database)
- Environment variables configured

### Environment Variables

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Installation

```bash
# Install dependencies
pnpm install

# Run database migrations
npm run db:migrate

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Default Login
- Navigate to `/login` to access the authentication page
- Use signup to create a new account
- Redirected to dashboard after successful authentication

## Key Components

### Glassmorphic Design
The entire UI uses a purple-based glassmorphic design with:
- Semi-transparent cards with backdrop blur
- Purple gradient accents
- Smooth transitions and hover effects
- Responsive layout that works on all device sizes

### API Endpoints

**Authentication**
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

**Tickets**
- `GET /api/tickets` - List all tickets
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/[id]` - Get ticket details
- `PUT /api/tickets/[id]` - Update ticket

**Comments**
- `GET /api/tickets/[id]/comments` - List comments
- `POST /api/tickets/[id]/comments` - Add comment

**Checklists**
- `GET /api/tickets/[id]/checklists` - List items
- `POST /api/tickets/[id]/checklists` - Create item
- `PATCH /api/tickets/[id]/checklists` - Update item

**Time Entries**
- `GET /api/tickets/[id]/time-entries` - List entries
- `POST /api/tickets/[id]/time-entries` - Create entry

## Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Protected API routes with auth verification
- SQL injection prevention with parameterized queries
- CORS protection
- Secure session management

## Performance Optimizations

- Server-side rendering for dashboard
- Client-side caching with SWR
- Optimized database queries
- Code splitting and lazy loading
- Efficient CSS with Tailwind v4

## Future Enhancements

- Real-time updates with WebSockets
- File attachments and document storage
- Advanced filtering and search
- Email notifications
- Dark mode support
- Mobile app
- Slack integration
- Custom workflows

## License

MIT
