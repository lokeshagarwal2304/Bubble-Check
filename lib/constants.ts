export const TICKET_PRIORITIES = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

export const TICKET_STATUSES = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  RESOLVED: 'Resolved',
  REVIEW: 'Review',
  CLOSED: 'Closed',
} as const;

export const PRIORITY_COLORS = {
  High: 'text-red-600 bg-red-50',
  Medium: 'text-yellow-600 bg-yellow-50',
  Low: 'text-green-600 bg-green-50',
} as const;

export const STATUS_COLORS = {
  Pending: 'text-gray-600 bg-gray-50',
  'In Progress': 'text-blue-600 bg-blue-50',
  'On Hold': 'text-yellow-600 bg-yellow-50',
  Resolved: 'text-green-600 bg-green-50',
  Review: 'text-purple-600 bg-purple-50',
  Closed: 'text-gray-600 bg-gray-50',
} as const;

export const ACTIVITY_TYPES = {
  CREATED: 'created',
  UPDATED: 'updated',
  COMMENTED: 'commented',
  STATUS_CHANGED: 'status_changed',
  ASSIGNED: 'assigned',
  UNASSIGNED: 'unassigned',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Priority (High → Low)', value: 'priority_desc' },
  { label: 'Priority (Low → High)', value: 'priority_asc' },
  { label: 'Due Date (Soon)', value: 'due_date_asc' },
  { label: 'Updated Recently', value: 'updated_desc' },
] as const;

export const TIME_TRACKING_UNITS = {
  HOURS: 'hours',
  MINUTES: 'minutes',
  DAYS: 'days',
} as const;
