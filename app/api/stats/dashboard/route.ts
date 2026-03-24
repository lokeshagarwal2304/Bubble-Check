import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get ticket counts by status
    const ticketsResult = await query(
      `SELECT status, COUNT(*) as count FROM tickets 
       WHERE created_by = $1 
       GROUP BY status`,
      [decoded.userId]
    );

    // Get total accounts
    const accountsResult = await query(
      'SELECT COUNT(*) as count FROM accounts WHERE user_id = $1',
      [decoded.userId]
    );

    // Get total time spent
    const timeResult = await query(
      `SELECT COALESCE(SUM(hours), 0) as total_hours FROM time_entries 
       WHERE user_id = $1`,
      [decoded.userId]
    );

    // Get recent activities
    const activitiesResult = await query(
      `SELECT * FROM activity_logs 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 5`,
      [decoded.userId]
    );

    const statusCounts: { [key: string]: number } = {};
    ticketsResult.rows.forEach(row => {
      statusCounts[row.status] = parseInt(row.count);
    });

    return NextResponse.json({
      totalTickets: Object.values(statusCounts).reduce((a: number, b: number) => a + b, 0),
      totalAccounts: parseInt(accountsResult.rows[0]?.count || 0),
      totalTimeSpent: parseFloat(timeResult.rows[0]?.total_hours || 0),
      statusCounts,
      recentActivities: activitiesResult.rows,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
