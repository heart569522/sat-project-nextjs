import { render } from '@react-email/render';

interface EmailProps {
  EmailComponent: React.ComponentType<any>;
  recipientName?: string;
  verifyLink?: string;
  documentLink?: string;
}

export default function ConvertReactToEmail({
  EmailComponent,
  recipientName,
  verifyLink,
  documentLink,
}: EmailProps) {
  const htmlEmail = render(
    <EmailComponent
      recipientName={recipientName}
      verifyLink={verifyLink}
      documentLink={documentLink}
    />,
    {
      pretty: true,
    },
  );
  return htmlEmail;
}
