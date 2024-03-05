import { convertISOStringToDateTimeText } from '@/app/lib/services';
import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
  Tailwind,
  Button,
} from '@react-email/components';
import * as React from 'react';

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : '';

export default function VerifyEmail(props: any) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Tailwind>
          <Container style={container}>
            <Section style={logo}>
              <Img
                width={150}
                src={
                  'https://onedrive.live.com/embed?resid=DCF10387FCEEEA77%217719&authkey=%21AHsXEtq8vLT6tSA&width=416&height=122'
                }
              />
            </Section>
            <Section className="flex w-full items-center justify-center">
              <Row>
                <Column style={sectionBlueBorder} />
              </Row>
            </Section>
            <Section style={content}>
              <Text style={paragraph}>สวัสดี คุณ{props.recipientName},</Text>
              <Text style={paragraph}>
                คุณได้ส่งคำร้องขอเอกสารคำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11) เมื่อวันที่{' '}
                {convertISOStringToDateTimeText(new Date().toISOString())}
              </Text>
              <Text style={paragraph}>
                กรุณาคลิกปุ่มยืนยัน
                เพื่อให้คำร้องขอเอกสารคำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11) ของคุณเสร็จสมบูรณ์
              </Text>
              <Row>
                <Column style={containerCenter}>
                  <Button style={button} href={props.verifyLink}>
                    ยืนยัน
                  </Button>
                </Column>
              </Row>
              <Text style={paragraph}>
                หากไม่สามารถคลิกปุ่มได้ กรุณาคลิกลิ้งค์นี้{' '}
                <Link href={props.verifyLink} style={link}>
                  {props.verifyLink}
                </Link>
              </Text>
              <Text style={paragraph}>
                ขอบคุณ,
                <br />
                สำนักพัฒนานักศึกษา มหาวิทยาลัยพายัพ
              </Text>
            </Section>
          </Container>
          <Section style={footer}>
            <Row>
              <Text style={{ textAlign: 'center', color: '#706a7b' }}>
                © 2024 Payap University, All Rights Reserved <br />
                272 หมู่ 2 ตำบลสันพระเนตร อำเภอสันทราย จังหวัดเชียงใหม่ 50210
              </Text>
            </Row>
          </Section>
        </Tailwind>
      </Body>
    </Html>
  );
}

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: '580px',
  margin: '30px auto 10px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  maxWidth: '580px',
  margin: '0 auto',
};

const content = {
  padding: '5px 20px 10px 20px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionBlueBorder = {
  borderBottom: '1px solid rgb(0, 116, 255)',
  width: '550px',
};

const link = {
  textDecoration: 'underline',
};

const containerCenter = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
  cursor: 'pointer',
};
