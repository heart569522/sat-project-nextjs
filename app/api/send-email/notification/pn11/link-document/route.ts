import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ConvertReactToEmail from '@/app/lib/email-convert';
import PN11NotificationEmail from '@/app/components/email-templates/pn11-noti';

const sendingEmail = process.env.SENDING_EMAIL;

export async function POST(req: NextRequest) {
  const formData = await req.json();

  const { firstname, lastname, email, documentLink } = formData;

  try {
    const htmlEmail = ConvertReactToEmail({
      EmailComponent: PN11NotificationEmail,
      recipientName: `${firstname} ${lastname}`,
      documentLink: documentLink
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: sendingEmail,
        pass: process.env.SENDING_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: sendingEmail,
      to: email,
      subject: 'เอกสารคำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)',
      html: htmlEmail,
    };

    await transporter.sendMail(mailOptions as any);

    return NextResponse.json(
      { message: 'Email Sent Success' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 },
    );
  }
}
