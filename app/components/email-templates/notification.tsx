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

interface NotificationEmailProps {
  username?: string;
  updatedDate?: Date;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : '';

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
              <Text style={paragraph}>สวัสดี คุณ{props.recipientName},</Text>
              <Text style={paragraph}>
                You updated the password for your Twitch account If this was
                you, then no further action is required.
              </Text>
              <Text style={paragraph}>
                However if you did NOT perform this password change, please{' '}
                <Link href="#" style={link}>
                  reset your account password
                </Link>{' '}
                immediately.
              </Text>
              <Text style={paragraph}>
                Remember to use a password that is both strong and unique to
                your Twitch account. To learn more about how to create a strong
                and unique password,{' '}
                <Link href="#" style={link}>
                  click here.
                </Link>
              </Text>
              <Text style={paragraph}>
                Still have questions? Please contact{' '}
                <Link href="#" style={link}>
                  Twitch Support
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
            {/* <Row>
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <Img src={`${baseUrl}/static/twitch-icon-twitter.png`} />
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <Img src={`${baseUrl}/static/twitch-icon-facebook.png`} />
            </Column>
          </Row> */}
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
