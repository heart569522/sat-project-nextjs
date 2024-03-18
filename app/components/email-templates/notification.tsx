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

export default function NotificationEmail(props: any) {
  return (
    <Html>
      <Head />
      {/* <Preview>สถานะคำร้องขอเอกสารระเบียนกิจกรรม</Preview> */}
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
              <Text style={paragraph} className="text-center text-xl font-bold">
                {props.title}
              </Text>
              <Text style={paragraph}>สวัสดี คุณ{props.recipientName},</Text>
              <Text style={paragraph}>{props.detail}</Text>
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
