import { pool } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { strategic_plan_kpi_list } from '@/app/model/pn01-select-list';

export async function GET() {
  noStore();

  try {
    const res = await pool.query<strategic_plan_kpi_list>(
      `SELECT * FROM strategic_plan_kpi_list ORDER BY id`,
    );
    return NextResponse.json(res.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not get data!!',
        error,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  noStore();
  try {
    const formData = await req.json();

    const insertQuery = `
      INSERT INTO strategic_plan_kpi_list (id, name)
      VALUES ($1, $2)
    `;

    const deleteQuery = `
      DELETE FROM strategic_plan_kpi_list WHERE id = $1
    `;

    const existingRows = await pool.query(
      'SELECT * FROM strategic_plan_kpi_list',
    );

    for (const row of existingRows.rows) {
      const { id: existingId } = row;

      const matchingRow = formData.find(
        ({ id }: { id: number }) => id === existingId,
      );

      if (!matchingRow) {
        await pool.query(deleteQuery, [existingId]);
      }
    }

    for (const { id, name } of formData) {
      const existingRow = await pool.query(
        'SELECT * FROM strategic_plan_kpi_list WHERE id = $1',
        [id],
      );
      if (existingRow.rows.length === 0) {
        await pool.query(insertQuery, [id, name]);
      } else {
        await pool.query(
          'UPDATE strategic_plan_kpi_list SET name = $1 WHERE id = $2',
          [name, id],
        );
      }
    }

    return NextResponse.json(
      {
        message: 'Update data success',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Can not update data!!',
        error,
      },
      { status: 500 },
    );
  }
}
