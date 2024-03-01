'use client';
import { deleteData, sendEmail } from '@/app/lib/api-service';
import { TrashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { notoThai } from '@/app/components/fonts';
import { OverlayLoading } from '@/app/components/loading-screen';
import { ModalResponse } from '@/app/components/modal';

export function ButtonDialog({
  id,
  apiPath,
  action,
  title,
  detail,
  onSuccess,
  isPN01Draft,
  formData
}: {
  id: string;
  apiPath: string;
  action: string;
  title: string;
  detail: string;
  onSuccess?: any;
  isPN01Draft?: boolean;
  formData?: any;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [isCloseButton, setIsCloseButton] = useState(false);
  const [modalError, setModalError] = useState(false);

  const handleCloseModal = () => {
    setOpenResponseModal(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAction = async () => {
    handleDialogClose();
    setLoading(true);

    let response: any;

    switch (action) {
      case 'delete':
        response = await deleteData(apiPath, id, isPN01Draft);
        break;

      case 'sendEmail':
        response = await sendEmail(apiPath, formData);
        break;

      default:
        break;
    }

    if (response && (response.status === 201 || response.status === 200)) {
      setLoading(false);
      setIsCloseButton(true);
      setTitleModal(
        action === 'sendEmail'
          ? 'ส่งอีเมลแจ้งเตือนสำเร็จ'
          : action === 'delete'
          ? 'ลบข้อมูลสำเร็จ'
          : '',
      );
      setOpenResponseModal(true);

      if (action === 'delete') {
        onSuccess();
      }
    } else {
      handleSubmissionError();
    }
  };

  const handleSubmissionError = () => {
    setLoading(false);
    setModalError(true);
    setTitleModal('ผิดพลาด');
    setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
    setOpenResponseModal(true);
  };

  return (
    <React.Fragment>
      <button
        onClick={handleDialogOpen}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">{action}</span>
        {action == 'delete' && <TrashIcon className="w-5" />}
        {action == 'sendEmail' && <EnvelopeIcon className="w-5" />}
      </button>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p className={`${notoThai.className} text-xl font-semibold`}>
            {title}
          </p>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p
              className={`${notoThai.className} whitespace-normal text-base text-gray-800`}
            >
              {detail}
            </p>
          </DialogContentText>
        </DialogContent>

        <div className="flex items-center justify-end bg-gray-50">
          <DialogActions>
            <button
              type="button"
              className={`flex w-auto justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100`}
              onClick={handleDialogClose}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className={`${
                action == 'delete'
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } flex w-auto justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium `}
              onClick={handleAction}
            >
              ตกลง
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <ModalResponse
        openModal={openResponseModal}
        onCloseModal={handleCloseModal}
        title={titleModal}
        detail={detailModal}
        isError={modalError}
        isCloseButton={isCloseButton}
      />

      <OverlayLoading showLoading={loading} />
    </React.Fragment>
  );
}
