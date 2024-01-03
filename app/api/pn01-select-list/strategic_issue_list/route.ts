import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { strategic_issue_list } from '@/app/model/pn01-select-list';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore()
  try {
    const res =
      await sql<strategic_issue_list>`SELECT * FROM strategic_issue_list ORDER BY id`;

    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({
      message: 'Can not get data!!',
      error,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
  } catch (error) {
    return NextResponse.json({
      message: 'Can not post data!!',
      error,
    });
  }
}
