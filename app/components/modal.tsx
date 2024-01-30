// 'use client';

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

interface ModalQuestionProps {
  openModal: boolean;
  onCloseModal: () => void;
  title: string;
  detail: string;
  onOk: (action: string) => void;
  okAction: string;
}

export function ModalQuestion(props: ModalQuestionProps) {
  return (
    <Modal
      open={props.openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 450 }}>
        <div className="absolute right-0 top-0 mr-1 mt-1">
          <IconButton
            aria-label="close"
            size="small"
            onClick={props.onCloseModal}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className="mb-2 flex items-center justify-between px-6 pt-6">
          <h3 id="modal-modal-title" className="text-xl font-semibold">
            {props.title}
          </h3>
        </div>

        <div className="mb-4 px-6">
          <p id="modal-modal-description">{props.detail}</p>
        </div>

        <div className="flex items-center justify-end gap-x-1 bg-gray-50 px-4 py-3">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={props.onCloseModal}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              props.onOk(props.okAction);
              props.onCloseModal();
            }}
          >
            ตกลง
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export function ModalResponse({
  openModal,
  onCloseModal,
  isSuccess,
  isError,
  title,
  detail,
  buttonLink,
  buttonText,
}: {
  openModal: boolean;
  onCloseModal?: () => void;
  isSuccess?: boolean;
  isError?: boolean;
  title: string;
  detail: string;
  buttonLink: string;
  buttonText?: string;
}) {
  const router = useRouter();

  const handleNextPage = () => {
    router.replace(buttonLink)
  }

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
          <p id="modal-modal-description">{detail}</p>
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

          {isSuccess && (
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              onClick={handleNextPage}
            >
              {buttonText}
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
}
