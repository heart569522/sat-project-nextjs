import { render } from '@react-email/render';

interface EmailProps {
  EmailComponent: React.ComponentType<any>;
  recipientName?: string;
}

export default function ConvertReactToEmail({ EmailComponent, recipientName }: EmailProps) {
  const htmlEmail = render(<EmailComponent recipientName={recipientName}/>);
  return htmlEmail;
}
