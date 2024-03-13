'use client';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React, { useState } from 'react';
import ModalResponse from '@/app/components/modal/modal-response';
import { OverlayLoading } from '@/app/components/loading-screen';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import Link from 'next/link';
import { updateData } from '@/app/lib/api-service';

export default function ChangePasswordForm({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalNextPage, setModalNextPage] = useState(true);
  const [buttonLink, setButtonLink] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [nextTab, setNextTab] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [formInput, setFormInput] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const handleCloseModal = () => {
    setOpenResponseModal(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'confirmNewPassword') {
      if (value !== formInput.newPassword) {
        setValidationError((prevErrors) => ({
          ...prevErrors,
          [name]: 'รหัสผ่านไม่ตรงกัน',
        }));
      } else {
        setValidationError((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    } else {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    console.log('--validateForm--');

    let isValid = true;

    // Validate formInput
    for (const key in formInput) {
      if (Object.prototype.hasOwnProperty.call(formInput, key)) {
        const value = formInput[key as keyof typeof formInput];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          isValid = false;

          setValidationError((prevErrors) => ({
            ...prevErrors,
            [key]:
              key == 'faculty' || key == 'major'
                ? 'โปรดเลือกข้อมูล'
                : `โปรดกรอกข้อมูล`,
          }));

          console.error(`${key} is required.`);
        }
      }
    }

    if (formInput.newPassword !== formInput.confirmNewPassword) {
      isValid = false;

      setValidationError((prevErrors) => ({
        ...prevErrors,
        confirmNewPassword: 'รหัสผ่านไม่ตรงกัน',
      }));

      console.error('Passwords do not match.');
    }

    // Check if password is at least 6 characters long
    if (formInput.newPassword.length < 6 && formInput.newPassword.length >= 1) {
      isValid = false;

      setValidationError((prevErrors) => ({
        ...prevErrors,
        newPassword: 'รหัสผ่านต้องมีจำนวน 6 ตัวอักษรขึ้นไป',
      }));

      console.error('Password must be at least 6 characters long.');
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    resetResponseModal();

    const isFormValid = validateForm();

    if (isFormValid) {
      const formData = {
        currentPassword : formInput.password,
        newPassword : formInput.newPassword
      }
      try {
        const checkCurrentPasswordResponse = await updateData(
          'auth/change-password',
          formData,
          userId,
          true
        );

        if (
          checkCurrentPasswordResponse &&
          checkCurrentPasswordResponse.status === 200
        ) {
          setLoading(false);
          setModalSuccess(true);
          setTitleModal('เปลี่ยนรหัสผ่านสำเร็จ');
          setButtonLink(`/profile`);
          setButtonText('ตกลง');
          setOpenResponseModal(true);
        } else {
          handleSubmissionError();
        }
      } catch (error) {
        handleSubmissionError();
      }
    } else {
      setLoading(false);
    }
  };

  const handleSubmissionError = () => {
    setLoading(false);
    setModalError(true);
    setTitleModal('ผิดพลาด');
    setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
    setOpenResponseModal(true);
  };

  const resetResponseModal = () => {
    setModalSuccess(false);
    setModalError(false);
    setTitleModal('');
    setDetailModal('');
    setButtonLink('');
    setButtonText('');
  };

  return (
    <React.Fragment>
      <div className="rounded-md border border-gray-200 p-4 pb-8">
        <form action={handleSubmit} className="space-y-3">
          <div className="flex flex-col">
            <label
              className="my-3 text-base font-medium text-gray-900"
              htmlFor="password"
            >
              รหัสผ่านปัจจุบัน / Current Password
            </label>
            <FormControl variant="outlined">
              <OutlinedInput
                className="w-full"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formInput.password}
                onChange={handleInputChange}
                error={Boolean(validationError.password)}
                placeholder=""
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon className="h-5 w-5 text-gray-600" />
                      ) : (
                        <VisibilityOutlinedIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText className="text-red-600">
                {validationError.password}
              </FormHelperText>
            </FormControl>
            <label
              className="my-3 text-base font-medium text-gray-900"
              htmlFor="newPassword"
            >
              รหัสผ่านใหม่ / New Password
            </label>
            <FormControl variant="outlined">
              <OutlinedInput
                className="w-full"
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={formInput.newPassword}
                onChange={handleInputChange}
                error={Boolean(validationError.newPassword)}
                placeholder=""
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle newPassword visibility"
                      onClick={handleShowNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <VisibilityOffOutlinedIcon className="h-5 w-5 text-gray-600" />
                      ) : (
                        <VisibilityOutlinedIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText className="text-red-600">
                {validationError.newPassword}
              </FormHelperText>
            </FormControl>
            <label
              className="my-3 text-base font-medium text-gray-900"
              htmlFor="confirmNewPassword"
            >
              ยืนยันรหัสผ่านใหม่ / Confirm New Password
            </label>
            <FormControl variant="outlined">
              <OutlinedInput
                className="w-full"
                id="confirmNewPassword"
                type={showConfirmNewPassword ? 'text' : 'password'}
                name="confirmNewPassword"
                value={formInput.confirmNewPassword}
                onChange={handleInputChange}
                error={Boolean(validationError.confirmNewPassword)}
                placeholder=""
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmNewPassword visibility"
                      onClick={handleShowConfirmNewPassword}
                      edge="end"
                    >
                      {showConfirmNewPassword ? (
                        <VisibilityOffOutlinedIcon className="h-5 w-5 text-gray-600" />
                      ) : (
                        <VisibilityOutlinedIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText className="text-red-600">
                {validationError.confirmNewPassword}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="mb-2 flex justify-center gap-2">
            <Link
              href={'/profile'}
              className="flex h-10 items-center rounded-md bg-gray-100 px-4 text-base font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              ยกเลิก
            </Link>
            <button className="h-10 items-center rounded-md bg-blue-500 px-4 text-base font-medium text-white transition-colors hover:bg-blue-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
              ตกลง
            </button>
          </div>
        </form>
      </div>
      <OverlayLoading showLoading={loading} />

      <ModalResponse
        openModal={openResponseModal}
        onCloseModal={handleCloseModal}
        title={titleModal}
        detail={detailModal}
        isSuccess={modalSuccess}
        isError={modalError}
        buttonLink={buttonLink}
        buttonText={buttonText}
        haveNextPage={modalNextPage}
      />
    </React.Fragment>
  );
}
