import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
// import { unstable_noStore as noStore } from 'next/cache';
import { university_strategic_list } from '@/app/model/pn01-select-list';

export async function GET() {
  //   noStore();

  try {
    const res =
      await sql<university_strategic_list>`SELECT * FROM university_strategic_list ORDER BY id`;

    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({
      message: 'Can not get data!!',
      error,
    });
  }
}
