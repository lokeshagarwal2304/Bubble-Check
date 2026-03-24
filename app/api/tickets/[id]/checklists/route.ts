import { NextRequest, NextResponse } from 'next/server';
import { getChecklistItems, createChecklistItem, updateChecklistItem } from '@/lib/db';
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

    const items = await getChecklistItems(id);
    return NextResponse.json(items);
  } catch (error) {
    console.error('Get checklists error:', error);
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

    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Missing title' },
        { status: 400 }
      );
    }

    const item = await createChecklistItem(id, title);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Create checklist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await params; // params not needed for PATCH (uses itemId from body)
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { itemId, completed } = await request.json();

    if (!itemId) {
      return NextResponse.json(
        { error: 'Missing itemId' },
        { status: 400 }
      );
    }

    const item = await updateChecklistItem(itemId, completed);
    return NextResponse.json(item);
  } catch (error) {
    console.error('Update checklist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
