'use client';
import { Metadata } from 'next';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ModalQuestion, ModalResponse } from '@/app/components/modal';

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
    <div className="flex justify-center">
      <Button onClick={handleOpen}>Open modal</Button>
      {/* <ModalQuestion
        openModal={open}
        onCloseModal={handleClose}
        title="หัวข้อ"
        detail="รายละเอียด"
      /> */}
      {/* <ModalResponse
        openModal={open}
        onCloseModal={handleClose}
        isError={true}
        isSuccess={false}
        title="หัวข้อสำเร็จ"
        detail="รายละเอียดว่าจะทำอะไรยังไงตรงไหนต่อไป"
      /> */}
    </div>
  );
}
