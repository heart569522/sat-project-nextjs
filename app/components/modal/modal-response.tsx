import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Box, IconButton, Modal } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 5,
};

export default function ModalResponse({
  openModal,
  onCloseModal,
  isSuccess,
  isError,
  title,
  detail,
  buttonLink,
  buttonText,
  isCloseButton,
  haveNextPage,
  isNextTab
}: {
  openModal: boolean;
  onCloseModal?: () => void;
  isSuccess?: boolean;
  isError?: boolean;
  title: string;
  detail: string;
  buttonLink?: string;
  buttonText?: string;
  isCloseButton?: boolean;
  haveNextPage?: boolean;
  isNextTab?: boolean;
}) {
  const router = useRouter();

  const handleSubitButton = () => {
    if (haveNextPage) {
      router.replace(buttonLink as string);
    } else if (isNextTab) {
      window.location.href = (buttonLink as string)
    } else {
      router.push(buttonLink as string);
    }
  };

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 450 }}>
        <div className="flex items-center justify-center pt-6">
          {isSuccess && (
            <CheckCircleOutlinedIcon className="h-14 w-14 text-green-500" />
          )}
          {isError && (
            <ErrorOutlineOutlinedIcon className="h-14 w-14 text-red-500" />
          )}
        </div>

        <div className="mb-2 flex items-center justify-center px-6 pt-4">
          <h3 id="modal-modal-title" className="text-xl font-semibold">
            {title}
          </h3>
        </div>

        <div className="mb-4 px-6 text-center">
          <p id="modal-modal-description">{`${detail}`}</p>
        </div>

        <div className="flex items-center justify-start p-5">
          {isError && (
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-red-500 px-4 py-2 text-base font-medium text-red-500 shadow-sm hover:bg-red-50"
              onClick={onCloseModal}
            >
              ปิด
            </button>
          )}

          {isCloseButton && (
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-blue-500 px-4 py-2 text-base font-medium text-blue-500 shadow-sm hover:bg-blue-50"
              onClick={onCloseModal}
            >
              ปิด
            </button>
          )}

          {isSuccess && (
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              onClick={handleSubitButton}
            >
              {buttonText}
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
}
