import { NextRequest, NextResponse } from 'next/server';
import { getTickets, createTicket } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tickets = await getTickets(auth.accountId);
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Get tickets error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { subject, description, priority, customerId, assignedTo } =
      await request.json();

    if (!subject || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ticket = await createTicket({
      accountId: auth.accountId,
      subject,
      description,
      priority: priority || 'Medium',
      customerId,
      assignedTo,
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Create ticket error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
