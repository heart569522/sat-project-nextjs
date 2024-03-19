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
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { notoThai } from '@/app/components/fonts';
import { OverlayLoading } from '@/app/components/loading-screen';
import ModalResponse from '@/app/components/modal/modal-response';
import clsx from 'clsx';

export function ButtonDialog({
  className,
  id,
  apiPath,
  action,
  title,
  detail,
  onSuccess,
  isPN01Draft,
  formData,
  disabled,
}: {
  className?: string;
  id: string | number;
  apiPath: string;
  action: string;
  title: string;
  detail: string;
  onSuccess?: any;
  isPN01Draft?: boolean;
  formData?: any;
  disabled?: boolean;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [isCloseButton, setIsCloseButton] = useState(false);
  const [modalError, setModalError] = useState(false);

  const [formEmailInput, setFormEmailInput] = useState({
    title: '',
    detail: '',
  });

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormEmailInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setValidationError((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;

    // Validate formInput
    for (const key in formEmailInput) {
      if (Object.prototype.hasOwnProperty.call(formEmailInput, key)) {
        const value = formEmailInput[key as keyof typeof formEmailInput];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          isValid = false;

          setValidationError((prevErrors) => ({
            ...prevErrors,
            [key]: `โปรดกรอกข้อมูล`,
          }));

          // console.error(`${key} is required.`);
        }
      }
    }

    return isValid;
  };

  const handleCloseModal = () => {
    setOpenResponseModal(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setValidationError({});
    setOpenDialog(false);
  };

  const handleAction = async () => {
    if (action === 'delete') {
      handleDialogClose();
    }
    setLoading(true);

    let response: any;

    switch (action) {
      case 'delete':
        response = await deleteData(apiPath, id, isPN01Draft);
        break;

      case 'sendEmail':
        const isFormValid = validateForm();
        if (isFormValid) {
          const formDataEmail = {
            email: formData.email,
            name: formData.name,
            title: formEmailInput.title,
            detail: formEmailInput.detail,
          };
          handleDialogClose();
          response = await sendEmail(apiPath, formDataEmail);
        } else {
          setLoading(false);
        }
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
      if (action === 'delete') {
        handleSubmissionError();
      }
      if (action === 'sendEmail') {
        const isFormValid = validateForm();
        if (isFormValid) {
          handleSubmissionError();
        } else {
          setLoading(false);
        }
      }
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
      <Tooltip
        title={
          action == 'delete' ? 'ลบ' : action == 'sendEmail' ? 'ส่งอีเมล' : ''
        }
        arrow
      >
        <button
          onClick={handleDialogOpen}
          className={clsx(
            'rounded-md border p-2',
            disabled
              ? 'cursor-not-allowed bg-gray-100 text-gray-500'
              : 'hover:bg-gray-100',
            className,
          )}
          disabled={disabled}
        >
          <span className="sr-only">{action}</span>
          {action == 'delete' && <TrashIcon className="w-5" />}
          {action == 'sendEmail' && <EnvelopeIcon className="w-5" />}
        </button>
      </Tooltip>
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
            {action === 'sendEmail' && (
              <form action="">
                <div className="py-2">
                  <label
                    htmlFor="title"
                    className={`mb-2 block text-base font-medium underline ${
                      validationError.title ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    หัวข้อ
                  </label>
                  <TextField
                    type="text"
                    name="title"
                    className="flex w-full"
                    value={formEmailInput.title}
                    onChange={handleInputChange}
                    placeholder=""
                    error={Boolean(validationError.title)}
                    helperText={validationError.title}
                    size="small"
                  />
                </div>
                <div className="py-2">
                  <label
                    htmlFor="detail"
                    className={`mb-2 block text-base font-medium underline ${
                      validationError.detail ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    รายละเอียด
                  </label>
                  <TextField
                    type="text"
                    name="detail"
                    className="flex w-full"
                    value={formEmailInput.detail}
                    onChange={handleInputChange}
                    placeholder=""
                    multiline
                    rows={4}
                    sx={{
                      '.MuiOutlinedInput-root': {
                        padding: 1,
                      },
                    }}
                    error={Boolean(validationError.detail)}
                    helperText={validationError.detail}
                  />
                </div>
              </form>
            )}
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
