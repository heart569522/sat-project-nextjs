import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { objective_list } from '@/app/model/pn01-select-list';

export async function GET() {
  try {
    const res = await pool.query<objective_list>(
      `SELECT * FROM objective_list ORDER BY id`,
    );

    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({
      message: 'Can not get data!!',
      error,
    });
  }
}
