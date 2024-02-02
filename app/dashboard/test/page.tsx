'use client';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { OverlayLoading } from '@/app/components/loading-screen';
import { PN01Status } from '@/app/model/pn01-status';

export default function BasicDatePicker() {
  return (
    <div>
      {/* <OverlayLoading /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="Basic date picker" views={['year']} />
        </DemoContainer>
      </LocalizationProvider>

      <div>
        <p> {PN01Status[0]}</p>
      </div>
    </div>
  );
}
