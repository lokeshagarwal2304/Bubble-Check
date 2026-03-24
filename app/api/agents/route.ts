import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/agents - fetch all agents
export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM agents ORDER BY name ASC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Get agents error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/agents - create new agent
export async function POST(request: NextRequest) {
  try {
    const { name, email, role } = await request.json();

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check for duplicate email
    const existing = await query('SELECT id FROM agents WHERE email = $1', [email.trim().toLowerCase()]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'An agent with this email already exists' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const result = await query(
      `INSERT INTO agents (id, name, email, role, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [id, name.trim(), email.trim().toLowerCase(), role || 'Support']
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    // Handle unique constraint violation from DB level
    if (error?.code === '23505') {
      return NextResponse.json({ error: 'An agent with this email already exists' }, { status: 409 });
    }
    console.error('Create agent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
