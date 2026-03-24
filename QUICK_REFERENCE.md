# Bubble-check Quick Reference Guide

## 🚀 Quick Start (30 seconds)

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL

# 3. Run development server
pnpm dev

# 4. Open browser
# Visit http://localhost:3000
```

## 📝 Key Files to Edit

| Task | File |
|------|------|
| Change app name | `app/layout.tsx` (metadata) |
| Update navigation menu | `components/sidebar.tsx` (navigation array) |
| Modify colors/theme | `app/globals.css` (CSS variables) |
| Add new API endpoint | `app/api/[resource]/route.ts` |
| Create new page | `app/dashboard/[new-page]/page.tsx` |
| Add new component | `components/[component-name].tsx` |
| Update authentication | `lib/auth.ts` |

## 🔑 Essential Commands

```bash
# Development
pnpm dev                  # Start dev server (port 3000)
pnpm build               # Build for production
pnpm start               # Run production build
pnpm lint                # Run linter
pnpm type-check          # Check TypeScript

# Database
pnpm run db:setup        # Create tables
pnpm run db:seed         # Seed test data (if available)
```

## 🗂️ Directory Map

```
app/              → Next.js pages and API routes
components/       → Reusable React components
contexts/         → Global state (Auth context)
hooks/            → Custom React hooks
lib/              → Utilities and helpers
public/           → Static assets
scripts/          → Database migrations and scripts
```

## 🔐 Authentication Flow

```
User Signs Up/In
    ↓
POST /api/auth/signup or /api/auth/login
    ↓
Server generates JWT token
    ↓
Token stored in localStorage
    ↓
Token sent in Authorization header for API calls
    ↓
Backend verifies token
    ↓
Access granted to protected resources
```

## 📡 API Request Example

```typescript
// Fetch with authentication
const response = await fetch('/api/tickets', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

## 🎨 Common CSS Classes

```html
<!-- Glass card -->
<div class="glass-card">Content</div>

<!-- Large glass card -->
<div class="glass-card-lg">Content</div>

<!-- Priority badge -->
<span class="badge-high">High</span>
<span class="badge-medium">Medium</span>
<span class="badge-low">Low</span>

<!-- Status badge -->
<span class="status-pending">Pending</span>
<span class="status-in-progress">In Progress</span>
<span class="status-completed">Completed</span>

<!-- Gradient button -->
<button class="gradient-purple">Click me</button>
```

## 🔧 Common Imports

```typescript
// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

// Custom Components
import { EmptyState } from '@/components/empty-state';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { FormField } from '@/components/form-field';

// Utilities
import { useFetch } from '@/hooks/use-fetch';
import { useAuth } from '@/contexts/auth-context';
import { showSuccess, showError } from '@/lib/toast';
import { formatDate, formatRelativeTime } from '@/lib/date-utils';
import { validateEmail, validatePassword } from '@/lib/validation';

// Icons
import { 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
```

## 📊 Database Query Examples

```typescript
import { query } from '@/lib/db';

// Simple SELECT
const users = await query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);

// INSERT
const ticket = await query(
  'INSERT INTO tickets (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
  [title, description, userId]
);

// UPDATE
const updated = await query(
  'UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *',
  [status, ticketId]
);

// DELETE
await query('DELETE FROM tickets WHERE id = $1', [ticketId]);
```

## ✅ Form Validation Examples

```typescript
import { validateEmail, validatePassword, validateRequired } from '@/lib/validation';

// Email validation
if (!validateEmail(email)) {
  setError('Invalid email address');
}

// Password validation
const passwordCheck = validatePassword(password);
if (!passwordCheck.valid) {
  setError(passwordCheck.errors[0]); // Show first error
}

// Required field
if (!validateRequired(value)) {
  setError('This field is required');
}
```

## 🔔 Toast Notification Examples

```typescript
import { showSuccess, showError, showInfo, showWarning } from '@/lib/toast';

// Success
showSuccess('Ticket created successfully!');

// Error
showError('Failed to create ticket', 'Please try again');

// Info
showInfo('Processing your request');

// Warning
showWarning('You have unsaved changes');
```

## 📋 Form Component Examples

```typescript
import { Form, FormField, FormSection } from '@/components/form-field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MyForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <FormSection title="Personal Info" description="Enter your details">
        <FormField 
          label="Email" 
          required 
          htmlFor="email"
          error={errors.email}
        >
          <Input id="email" type="email" {...register('email')} />
        </FormField>
      </FormSection>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

## 🎯 Data Fetching Examples

```typescript
import { useFetch } from '@/hooks/use-fetch';

// In a component
const { data: tickets, isLoading, error, mutate } = useFetch('/api/tickets');

if (isLoading) return <Spinner />;
if (error) return <div>Error loading</div>;

// Refetch data
const handleRefresh = () => {
  mutate(); // Refetch the data
};

return (
  <div>
    {tickets?.map(ticket => (
      <TicketRow key={ticket.id} ticket={ticket} />
    ))}
    <Button onClick={handleRefresh}>Refresh</Button>
  </div>
);
```

## 🛡️ Protected Route Example

```typescript
'use client';

import { ProtectedRoute } from '@/components/protected-route';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
```

## 📱 Responsive Grid Examples

```html
<!-- 4 columns on desktop, 2 on tablet, 1 on mobile -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</div>
```

## 🔗 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://typescriptlang.org

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Token expired | Clear localStorage and re-login |
| DB connection error | Check DATABASE_URL in .env.local |
| Component not rendering | Check if component is wrapped in client directive (`'use client'`) |
| API returns 401 | Token missing or invalid - check Authorization header |
| Styles not applying | Ensure Tailwind CSS classes are spelled correctly |
| Build fails | Run `pnpm install` to ensure all dependencies are installed |

## 📈 Performance Tips

- Use `useFetch` for data fetching (handles caching)
- Lazy load images with `next/image`
- Implement pagination for large lists
- Use React.memo for expensive components
- Debounce search inputs
- Code split pages with dynamic imports

## 🔐 Security Checklist

- [ ] Never commit `.env.local` file
- [ ] Always validate user input on backend
- [ ] Use HTTPS in production
- [ ] Keep JWT_SECRET secure
- [ ] Implement rate limiting on API routes
- [ ] Use CORS properly for API routes
- [ ] Hash passwords with bcrypt
- [ ] Validate file uploads

## 📚 File Templates

### New API Route
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify auth
    const token = request.headers.get('authorization')?.slice(7);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    
    // Your logic here
    return NextResponse.json({ data: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### New Page Component
```typescript
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useFetch } from '@/hooks/use-fetch';

export default function MyPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useFetch('/api/endpoint');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="p-8">
      {/* Your content */}
    </div>
  );
}
```

---

**For more details, refer to SETUP.md, COMPONENTS.md, and BUILD_SUMMARY.md**
