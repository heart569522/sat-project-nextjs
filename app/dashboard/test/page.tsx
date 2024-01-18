'use client';
import { Metadata } from 'next';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ModalQuestion, ModalResponse } from '@/app/components/modal';
import { CircularProgress } from '@mui/material';

// export const metadata: Metadata = {
//   title: 'แบบฟอร์มลงชื่อเข้าร่วมโครงการ/กิจกรรม (พน.10)',
// };

export default function Page() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section id="box" className="box text-black">
      <div id="box-area" className="box-area">
        <div id="page-height" className="page-height">
          <div className='flex justify-center items-center mt-20'>
            <CircularProgress />
            <span className="ml-4 text-lg font-medium">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
