import { convertISOStringToDateTimeText } from '@/app/lib/services';
import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

export default function PN11NotificationEmail(props: any) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Tailwind>
          <Container style={container}>
            <Section style={logo}>
              <Column style={containerCenter}>
                <Img
                  width={150}
                  src={
                    'https://onedrive.live.com/embed?resid=DCF10387FCEEEA77%217719&authkey=%21AHsXEtq8vLT6tSA&width=416&height=122'
                  }
                />
              </Column>
            </Section>
            <Section className="flex w-full items-center justify-center">
              <Row>
                <Column style={sectionBlueBorder} />
              </Row>
            </Section>
            <Section style={content}>
              <Text style={paragraph}>สวัสดี คุณ{props.recipientName},</Text>
              <Text style={paragraph}>
                คุณได้ยืนยันคำร้องขอเอกสารคำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11)
                เมื่อวันที่{' '}
                {convertISOStringToDateTimeText(new Date().toISOString())}
              </Text>
              <Text style={paragraph}>
                คลิกลิ้งค์นี้เพื่อไปยังหน้าเอกสารคำร้องขอหลักฐานการเข้าร่วมโครงการ (พน.11) <br />
                <Link href={props.documentLink} style={link}>
                  {props.documentLink}
                </Link>
              </Text>
              <Text style={paragraph}>
                โปรดพิมพ์และส่งเอกสารฉบับนี้พร้อมลายเซ็นต์ที่สำนักพัฒนานักศึกษา มหาวิทยาลัยพายัพ
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
