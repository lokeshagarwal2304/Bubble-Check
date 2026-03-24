# Bubble-check - Setup & Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (via Neon)
- Environment variables configured

### Environment Variables

Create a `.env.local` file with the following:

```env
DATABASE_URL=postgresql://user:password@host/database
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

### Installation

```bash
pnpm install
```

### Database Setup

```bash
# Create tables and initial schema
pnpm run db:setup
```

### Running the Application

```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start
```

## Features Overview

### Core Features

#### Authentication
- User signup and login with email/password
- JWT-based session management
- Password hashing with bcrypt
- Protected routes with automatic redirect

#### Dashboard
- Welcome message with user name
- Key metrics (Total Tickets, Accounts, Pending, In Progress)
- Ticket status distribution chart
- Recent activity feed
- Quick access to create new tickets

#### Ticket Management
- Create, read, update, delete tickets
- Set priority (High, Medium, Low)
- Change status (Pending, In Progress, On Hold, Resolved, Review, Closed)
- Assign to team members
- Set due dates
- Add customer/account association
- Filter and search functionality
- Pagination support

#### Ticket Details View
- Complete ticket information
- Activity timeline with all changes
- Checklist management with progress tracking
- Comments and discussions
- Time tracking entries
- File attachments

#### Add-on Features

##### Kanban Board
- Visual status columns
- Drag-and-drop ticket management
- Real-time status updates
- Card preview information

##### Gantt Chart
- Timeline view of tickets
- Duration visualization
- Progress bars
- Milestone tracking

##### Calendar View
- Monthly calendar display
- Event listing sidebar
- Color-coded by priority
- Quick ticket creation

### Supporting Features

#### Time Tracking
- Log hours per ticket
- Daily/weekly/monthly summaries
- Billable hours tracking
- Team member time allocation

#### Reports & Analytics
- Ticket distribution charts
- Priority breakdown
- Status trends
- Team performance metrics
- Custom date ranges

#### User Accounts
- Team member management
- Account organization
- Member count tracking
- Account-specific permissions

#### Activity Log
- Complete audit trail
- Action history
- User tracking
- Timestamp recording

#### User Profile
- Personal settings
- Password management
- Avatar upload
- Notification preferences

## Architecture

### Frontend Structure
```
app/
├── (auth)/              # Authentication pages (login, signup)
├── dashboard/           # Protected dashboard routes
│   ├── page.tsx        # Main dashboard
│   ├── tickets/        # Ticket management
│   ├── kanban-board/   # Kanban view
│   ├── gantt-chart/    # Gantt view
│   ├── calendar/       # Calendar view
│   ├── reports/        # Analytics
│   ├── accounts/       # Account management
│   ├── time-tracking/  # Time entries
│   ├── activity/       # Activity log
│   └── profile/        # User profile
├── api/                 # API routes
└── layout.tsx          # Root layout

components/
├── sidebar.tsx          # Navigation sidebar
├── header.tsx          # Top header bar
├── ticket-*.tsx        # Ticket-related components
├── kanban-column.tsx   # Kanban board column
├── analytics-card.tsx  # Metrics card
├── recent-activity.tsx # Activity list
└── ui/                 # shadcn/ui components

lib/
├── db.ts              # Database connection
├── auth.ts            # JWT utilities
├── validation.ts      # Form validation
├── constants.ts       # App constants
├── types.ts           # TypeScript types
└── utils.ts           # Helper functions
```

### Backend Structure
```
api/
├── auth/               # Authentication endpoints
│   ├── login
│   ├── signup
│   ├── logout
│   └── me
├── tickets/           # Ticket endpoints
│   ├── route.ts
│   └── [id]/
├── accounts/          # Account endpoints
├── stats/             # Analytics endpoints
└── comments/          # Comment endpoints
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** 201 Created
```json
{
  "id": "user-id",
  "email": "john@example.com",
  "name": "John Doe",
  "token": "jwt-token"
}
```

#### POST /api/auth/login
Authenticate and get JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** 200 OK
```json
{
  "id": "user-id",
  "email": "john@example.com",
  "name": "John Doe",
  "token": "jwt-token"
}
```

#### POST /api/auth/logout
Invalidate current session.

**Response:** 200 OK

#### GET /api/auth/me
Get current user information.

**Headers:** `Authorization: Bearer {token}`

**Response:** 200 OK
```json
{
  "id": "user-id",
  "email": "john@example.com",
  "name": "John Doe",
  "avatar": "url"
}
```

### Ticket Endpoints

#### GET /api/tickets
List all tickets for the user.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status
- `priority`: Filter by priority
- `search`: Search by title or description

#### POST /api/tickets
Create a new ticket.

#### GET /api/tickets/{id}
Get ticket details.

#### PUT /api/tickets/{id}
Update ticket information.

#### DELETE /api/tickets/{id}
Delete a ticket.

#### POST /api/tickets/{id}/comments
Add a comment to a ticket.

#### POST /api/tickets/{id}/checklists
Add a checklist item.

#### POST /api/tickets/{id}/time-entries
Log time spent on ticket.

## Development Tips

### Authentication Flow
1. User signs up/logs in
2. Server generates JWT token
3. Token stored in localStorage (frontend)
4. Token sent in Authorization header for API requests
5. Token validated on backend for protected routes

### Form Validation
Use provided validation utilities:
```typescript
import { validateEmail, validatePassword } from '@/lib/validation';

const isEmailValid = validateEmail(email);
const passwordCheck = validatePassword(password);
```

### Data Fetching
Use the custom `useFetch` hook:
```typescript
import { useFetch } from '@/hooks/use-fetch';

const { data, error, isLoading, mutate } = useFetch('/api/tickets');
```

### Toast Notifications
```typescript
import { showSuccess, showError, showInfo } from '@/lib/toast';

showSuccess('Ticket created!');
showError('Failed to create ticket');
showInfo('Processing...');
```

### Database Queries
Connection uses Neon PostgreSQL with parameterized queries:
```typescript
import { query } from '@/lib/db';

const result = await query(
  'SELECT * FROM tickets WHERE user_id = $1',
  [userId]
);
```

## Security Considerations

- All passwords hashed with bcrypt
- JWT tokens expire and require re-authentication
- SQL injection prevention via parameterized queries
- CORS configured for allowed origins
- Environment variables for sensitive data
- Protected API routes with token validation

## Customization

### Theme Colors
Update design tokens in `globals.css`:
```css
:root {
  --primary: oklch(...);
  --secondary: oklch(...);
  /* ... other tokens */
}
```

### Navigation Menu
Edit sidebar items in `components/sidebar.tsx`:
```typescript
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  // Add more items
];
```

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL in .env.local
- Check Neon connection string
- Ensure network access is allowed

### Authentication Errors
- Clear localStorage and retry login
- Verify JWT_SECRET matches between sessions
- Check token expiration settings

### API Errors
- Check browser console for error messages
- Verify API request headers include Authorization
- Confirm database schema is created

## Support

For issues or feature requests, please create an issue in the repository or contact support.

## License

MIT License - See LICENSE file for details
