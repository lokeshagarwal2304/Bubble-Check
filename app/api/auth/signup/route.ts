import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, query } from '@/lib/db';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await createUser(email, hashedPassword, name);

    // Create account
    const accountId = crypto.randomUUID();
    await query(
      'INSERT INTO accounts (id, owner_id, name) VALUES ($1, $2, $3)',
      [accountId, user.id, `${name}'s Account`]
    );

    // Create token
    const token = createToken(user.id, user.email, accountId);
    await setAuthCookie(token);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
