# Bubble-check Component Library

## Pages

### Authentication Pages
- **`app/(auth)/login/page.tsx`** - User login form
- **`app/(auth)/signup/page.tsx`** - User registration form
- **`app/(auth)/layout.tsx`** - Auth pages layout wrapper

### Dashboard Pages
- **`app/dashboard/page.tsx`** - Main dashboard with metrics and charts
- **`app/dashboard/layout.tsx`** - Dashboard layout with sidebar and header
- **`app/dashboard/tickets/page.tsx`** - Tickets list with filtering
- **`app/dashboard/tickets/new/page.tsx`** - Create new ticket form
- **`app/dashboard/tickets/[id]/page.tsx`** - Ticket detail view
- **`app/dashboard/accounts/page.tsx`** - Account management
- **`app/dashboard/reports/page.tsx`** - Analytics and reports
- **`app/dashboard/time-tracking/page.tsx`** - Time tracking dashboard
- **`app/dashboard/activity/page.tsx`** - Activity log view
- **`app/dashboard/profile/page.tsx`** - User profile settings
- **`app/dashboard/kanban-board/page.tsx`** - Kanban board view
- **`app/dashboard/gantt-chart/page.tsx`** - Gantt timeline view
- **`app/dashboard/calendar/page.tsx`** - Calendar view

## Layout Components

- **`components/sidebar.tsx`** - Main navigation sidebar with menu items and add-ons section
- **`components/header.tsx`** - Top header bar with search, notifications, and user menu
- **`components/protected-route.tsx`** - Route protection wrapper for authenticated pages

## Feature Components

### Dashboard Components
- **`components/analytics-card.tsx`** - Metric card with icon and value
- **`components/ticket-status-chart.tsx`** - Bar chart showing ticket distribution by status
- **`components/recent-activity.tsx`** - Activity feed showing recent changes
- **`components/metrics-card.tsx`** - Enhanced metrics card with trends

### Ticket Components
- **`components/ticket-row.tsx`** - Individual ticket row for list display
- **`components/ticket-checklist.tsx`** - Checklist management for tickets
- **`components/ticket-comments.tsx`** - Comment section for discussions
- **`components/ticket-time-entries.tsx`** - Time tracking entries display
- **`components/badges.tsx`** - Priority and status badge components

### Kanban Components
- **`components/kanban-column.tsx`** - Single column in Kanban board with draggable cards

## UI Components

### Form Components
- **`components/form-field.tsx`** - Form field wrapper with label, error handling, and description
- **`components/confirm-dialog.tsx`** - Confirmation dialog for destructive actions

### Data Display Components
- **`components/empty-state.tsx`** - Empty state display with icon, message, and action
- **`components/skeleton-loader.tsx`** - Loading skeleton screens for various layouts
- **`components/error-boundary.tsx`** - Error boundary for error handling

### Badge Components
- **`components/badges.tsx`** - Priority and status badges with icons

## Utility Modules

### Authentication & Context
- **`contexts/auth-context.tsx`** - Global authentication context and provider
- **`lib/auth.ts`** - JWT token generation and verification

### Database
- **`lib/db.ts`** - Database connection and query execution

### Data Validation
- **`lib/validation.ts`** - Form validation utilities (email, password, length, etc.)
- **`lib/date-utils.ts`** - Date formatting and manipulation functions
- **`lib/toast.ts`** - Toast notification helper functions
- **`lib/constants.ts`** - App-wide constants (priorities, statuses, colors)
- **`lib/types.ts`** - TypeScript interfaces for all data types

### Hooks
- **`hooks/use-fetch.ts`** - Custom hook for API data fetching with SWR

## API Routes

### Authentication
- **`app/api/auth/signup/route.ts`** - User registration endpoint
- **`app/api/auth/login/route.ts`** - User login endpoint
- **`app/api/auth/logout/route.ts`** - User logout endpoint
- **`app/api/auth/me/route.ts`** - Get current user information

### Tickets
- **`app/api/tickets/route.ts`** - List and create tickets
- **`app/api/tickets/[id]/route.ts`** - Get, update, delete single ticket
- **`app/api/tickets/[id]/comments/route.ts`** - Manage ticket comments
- **`app/api/tickets/[id]/checklists/route.ts`** - Manage checklist items
- **`app/api/tickets/[id]/time-entries/route.ts`** - Log time entries

### Accounts
- **`app/api/accounts/route.ts`** - List and create accounts

### Stats
- **`app/api/stats/dashboard/route.ts`** - Dashboard statistics and metrics

## Component Usage Examples

### Using Form Field
```typescript
import { FormField } from '@/components/form-field';
import { Input } from '@/components/ui/input';

<FormField label="Email" required htmlFor="email" error={error}>
  <Input id="email" type="email" placeholder="user@example.com" />
</FormField>
```

### Using Empty State
```typescript
import { EmptyState } from '@/components/empty-state';
import { Inbox } from 'lucide-react';

<EmptyState
  icon={<Inbox className="h-8 w-8" />}
  title="No tickets yet"
  description="Create your first ticket to get started"
  action={{ label: 'Create Ticket', onClick: handleCreate }}
/>
```

### Using Confirm Dialog
```typescript
import { ConfirmDialog } from '@/components/confirm-dialog';

<ConfirmDialog
  open={showDialog}
  title="Delete Ticket"
  description="Are you sure you want to delete this ticket?"
  confirmText="Delete"
  variant="destructive"
  onConfirm={handleDelete}
  onCancel={() => setShowDialog(false)}
/>
```

### Using Data Fetching
```typescript
import { useFetch } from '@/hooks/use-fetch';

const { data: tickets, isLoading, error } = useFetch('/api/tickets');

if (isLoading) return <DashboardSkeleton />;
if (error) return <div>Error loading tickets</div>;
return <TicketList tickets={data} />;
```

### Using Toast Notifications
```typescript
import { showSuccess, showError } from '@/lib/toast';

try {
  await createTicket(data);
  showSuccess('Ticket created successfully!');
} catch (err) {
  showError('Failed to create ticket', err.message);
}
```

## Styling Classes

### Glass Morphism
- `.glassmorphic` - Full glass card styling (semi-transparent with blur)
- `.glass-card` - Standard glass card with padding
- `.glass-card-lg` - Larger glass card with more padding
- `.glass-button` - Glass button styling

### Badges & Status
- `.badge-high` - High priority badge
- `.badge-medium` - Medium priority badge
- `.badge-low` - Low priority badge
- `.status-pending` - Pending status
- `.status-in-progress` - In progress status
- `.status-completed` - Completed status
- `.status-on-hold` - On hold status

### Forms
- `.form-input` - Styled input field
- `.form-label` - Styled label text

### Typography
- `.text-gradient` - Purple gradient text effect

## shadcn/ui Components Used

The application uses the following shadcn/ui components:
- Button
- Input
- Label
- Card
- Badge
- Avatar
- Dropdown Menu
- Dialog
- Alert Dialog
- Tabs
- Select
- Checkbox
- Radio Group
- Switch
- Textarea
- Spinner
- Skeleton
- Toast/Toaster
- Tooltip
- Popover
- Calendar
- And more...

All components are styled with Tailwind CSS and integrated with the glassmorphism theme.
