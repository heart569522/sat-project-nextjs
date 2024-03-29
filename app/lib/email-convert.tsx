import { render } from '@react-email/render';

interface EmailProps {
  EmailComponent: React.ComponentType<any>;
  recipientName?: string;
  verifyLink?: string;
  documentLink?: string;
  forgotPasswordLink?: string;
  title?: string;
  detail?: string;
}

export default function ConvertReactToEmail({
  EmailComponent,
  recipientName,
  verifyLink,
  forgotPasswordLink,
  documentLink,
  title,
  detail,
}: EmailProps) {
  const htmlEmail = render(
    <EmailComponent
      recipientName={recipientName}
      verifyLink={verifyLink}
      forgotPasswordLink={forgotPasswordLink}
      documentLink={documentLink}
      title={title}
      detail={detail}
    />,
    {
      pretty: true,
    },
  );
  return htmlEmail;
}
