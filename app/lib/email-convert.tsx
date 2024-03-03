import { render } from '@react-email/render';

interface EmailProps {
  EmailComponent: React.ComponentType<any>;
  recipientName?: string;
  verifyLink?: string;
}

export default function ConvertReactToEmail({
  EmailComponent,
  recipientName,
  verifyLink,
}: EmailProps) {
  const htmlEmail = render(
    <EmailComponent recipientName={recipientName} verifyLink={verifyLink} />,
    {
      pretty: true,
    },
  );
  return htmlEmail;
}
