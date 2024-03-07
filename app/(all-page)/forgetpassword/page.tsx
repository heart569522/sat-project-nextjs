'use client';
import { checkExist } from '@/app/lib/api-service';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import ModalResponse from '@/app/components/modal/modal-response';
import { OverlayLoading } from '@/app/components/loading-screen';

export default function ForgetPassForm() {
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    email: '',
  });

  const [existEmail, setExistEmail] = useState(null);

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckEmailExist = async () => {
    const { email } = formInput;

    if (email.length > 0) {
      try {
        const response = await checkExist('email', email);
        setExistEmail(response);
      } catch (error) {
        setExistEmail(null);
      }
    } else {
      setExistEmail(null);
    }
  };

  return (
    <React.Fragment>
      <form action="" className="space-y-3">
        <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
          <h1
            className={`mb-3 text-center text-2xl font-semibold text-gray-800`}
          >
            ลืมรหัสผ่าน
          </h1>
          <div className="flex flex-col w-full gap-2">
            <label
              className="my-3 text-base text-center font-medium text-gray-900"
              htmlFor="email"
            >
              กรุณากรอกอีเมลเพื่อยืนยันตัวตน และ
              เราจะส่งลิงค์สำหรับรีเซตรหัสผ่านไปยังอีเมลของคุณ
            </label>
            <div className="flex gap-1">
              {existEmail && (
                <>
                  <HighlightOffOutlinedIcon className="text-red-500" />
                  <p className="font-semibold text-red-500">
                    อีเมลนี้ถูกใช้ไปแล้ว
                  </p>
                </>
              )}
              {!existEmail && existEmail != null && (
                <>
                  <TaskAltOutlinedIcon className="text-green-500" />
                  <p className="font-semibold text-green-500">
                    สามารถใช้งานได้
                  </p>
                </>
              )}
            </div>

            <TextField
              className="w-full"
              id="email"
              type="email"
              name="email"
              value={formInput.email}
              onChange={handleInputChange}
              onBlur={handleCheckEmailExist}
              error={Boolean(validationError.email)}
              helperText={validationError.email}
              placeholder=""
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mb-2 mt-6 flex justify-center gap-2">
          <button
            className="flex h-10 items-center rounded-md bg-blue-500 px-4 text-base font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            type="submit"
          >
            ยืนยันอีเมล
          </button>
        </div>
      </form>

      <OverlayLoading showLoading={loading} />
    </React.Fragment>
  );
}
