import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function query(text: string, params?: any[]) {
  try {
    const result = await sql(text, params);
    return { rows: result };
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function getUser(id: string) {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

export async function createUser(email: string, password: string, name: string) {
  const id = crypto.randomUUID();
  const result = await query(
    'INSERT INTO users (id, email, password_hash, name) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, email, password, name]
  );
  return result.rows[0];
}

export async function getTickets(accountId: string) {
  const result = await query(
    'SELECT * FROM tickets WHERE account_id = $1 ORDER BY created_at DESC',
    [accountId]
  );
  return result.rows;
}

export async function getTicket(id: string) {
  const result = await query('SELECT * FROM tickets WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createTicket(data: {
  accountId: string;
  subject: string;
  description: string;
  priority: string;
  customerId?: string;
  assignedTo?: string;
}) {
  const id = crypto.randomUUID();
  const result = await query(
    `INSERT INTO tickets (id, account_id, subject, description, priority, customer_id, assigned_to, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [id, data.accountId, data.subject, data.description, data.priority, data.customerId, data.assignedTo, 'Open']
  );
  return result.rows[0];
}

export async function updateTicket(id: string, data: any) {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  for (const [key, value] of Object.entries(data)) {
    const column = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    updates.push(`${column} = $${paramCount}`);
    values.push(value);
    paramCount++;
  }

  values.push(id);
  const query_str = `UPDATE tickets SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  const result = await query(query_str, values);
  return result.rows[0];
}

export async function getTicketComments(ticketId: string) {
  const result = await query(
    'SELECT c.*, u.name, u.email FROM comments c JOIN users u ON c.user_id = u.id WHERE c.ticket_id = $1 ORDER BY c.created_at ASC',
    [ticketId]
  );
  return result.rows;
}

export async function createComment(ticketId: string, userId: string, content: string) {
  const id = crypto.randomUUID();
  const result = await query(
    'INSERT INTO comments (id, ticket_id, user_id, content) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, ticketId, userId, content]
  );
  return result.rows[0];
}

export async function getChecklistItems(ticketId: string) {
  const result = await query(
    'SELECT * FROM checklists WHERE ticket_id = $1 ORDER BY created_at ASC',
    [ticketId]
  );
  return result.rows;
}

export async function createChecklistItem(ticketId: string, title: string) {
  const id = crypto.randomUUID();
  const result = await query(
    'INSERT INTO checklists (id, ticket_id, title, completed) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, ticketId, title, false]
  );
  return result.rows[0];
}

export async function updateChecklistItem(id: string, completed: boolean) {
  const result = await query(
    'UPDATE checklists SET completed = $1 WHERE id = $2 RETURNING *',
    [completed, id]
  );
  return result.rows[0];
}

export async function getTimeEntries(ticketId: string) {
  const result = await query(
    'SELECT * FROM time_entries WHERE ticket_id = $1 ORDER BY created_at DESC',
    [ticketId]
  );
  return result.rows;
}

export async function createTimeEntry(ticketId: string, userId: string, hours: number, note: string) {
  const id = crypto.randomUUID();
  const result = await query(
    'INSERT INTO time_entries (id, ticket_id, user_id, hours, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, ticketId, userId, hours, note]
  );
  return result.rows[0];
}
