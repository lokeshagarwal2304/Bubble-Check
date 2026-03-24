export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  account_id: string;
  created_by: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'On Hold' | 'Resolved' | 'Review' | 'Closed';
  assigned_to?: string;
  customer_id?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  ticket_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Checklist {
  id: string;
  ticket_id: string;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TimeEntry {
  id: string;
  ticket_id: string;
  user_id: string;
  hours: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  ticket_id?: string;
  action_type: string;
  description: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
