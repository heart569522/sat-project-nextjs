import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { OverlayLoading } from '@/app/components/loading-screen';
import { PN01Status } from '@/app/model/pn01-status';
import Form from '@/app/components/login-register/form';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}
