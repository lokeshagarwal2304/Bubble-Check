import { NextRequest, NextResponse } from 'next/server';
import { getTimeEntries, createTimeEntry } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const entries = await getTimeEntries(id);
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Get time entries error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { hours, note } = await request.json();

    if (!hours) {
      return NextResponse.json(
        { error: 'Missing hours' },
        { status: 400 }
      );
    }

    const entry = await createTimeEntry(id, auth.userId, hours, note || '');
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error('Create time entry error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
