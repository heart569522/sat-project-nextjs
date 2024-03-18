import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import NotificationEmail from '@/app/components/email-templates/notification';
import ConvertReactToEmail from '@/app/lib/email-convert';

const sendingEmail = process.env.SENDING_EMAIL;

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const { email, name, title, detail } = formData;

  try {
    const htmlEmail = ConvertReactToEmail({
      EmailComponent: NotificationEmail,
      recipientName: name,
      title: title,
      detail: detail,
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
      subject: title,
      html: htmlEmail,
    };

    await transporter.sendMail(mailOptions as any);

    return NextResponse.json(
      { message: 'Email Sent Success' },
      { status: 200 },
    );
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 },
    );
  }
}
