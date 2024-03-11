import { pool } from '@/app/lib/db';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

async function fetchStudentDetails(studentId: string) {
  const studentDetailsUrl = `${process.env.APP_SCRIPT_STUDENT_SHEET}?studentId=${studentId}`;
  const studentDetailsResponse = await axios.get(studentDetailsUrl);
  return studentDetailsResponse.data;
}

export async function POST(req: NextRequest) {
  const client = await pool.connect();
  const googleSheetsInsertAttendance =
    process.env.APP_SCRIPT_INSERT_ATTENDANCE_SHEET;

  let dataToJSON : any

  try {
    await client.query('BEGIN');

    const formData = await req.json();
    const { projectCode, students, projectName, projectYear, userId, pn01Id } =
      formData;

    const studentDetailsPromises = students.map((studentId: string) =>
      fetchStudentDetails(studentId),
    );

    const studentDetailsResults = await Promise.all(studentDetailsPromises);

    if (googleSheetsInsertAttendance) {
      const googleSheetsDataArray = studentDetailsResults.map(
        ({ data }, index) => {
          const studentData = data[0];
          const firstname = studentData.firstname || '';
          const lastname = studentData.lastname || '';

          return {
            id: index + 1,
            Name: `${firstname} ${lastname}`,
            Std: students[index],
            ProjectName: projectName,
            AcademicYear: projectYear,
            remark: ''
          };
        },
      );
      console.log("🚀 ~ POST ~ googleSheetsDataArray:", googleSheetsDataArray)

      dataToJSON = JSON.stringify(googleSheetsDataArray);
      console.log("🚀 ~ POST ~ dataToJSON:", dataToJSON)

      try {
        const response = await axios.post(
          googleSheetsInsertAttendance,
          dataToJSON,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log('Google Sheets API Response:', response.data);
      } catch (error) {
        console.error('Error inserting data into Google Sheets:', error);
      }
    }

    const response = await client.query(
      `
        INSERT INTO student_attendance_pn10 (
          project_code, project_name, students, project_year, created_by
        )
        VALUES (
          $1, $2, $3, $4, 
          (SELECT id FROM users WHERE id = $5)
        )
        RETURNING *;
      `,
      [projectCode, projectName, dataToJSON, projectYear, userId],
    );

    await client.query(
      `
        UPDATE project_proposal_pn01
        SET is_create_attendance = true
        WHERE id = $1;
      `,
      [pn01Id],
    );

    await client.query('COMMIT');

    return NextResponse.json(
      {
        message: 'Create attendance success',
        id: response.rows[0].id,
        data: response.rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json(
      { message: `Server error, please try again later` },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
