'use client';

import { sendEmail, verifyData } from '@/app/lib/api-service';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Link from 'next/link';

export default function Verify({ params }: { params: { token: string } }) {
  const token = params.token;

  if (!token) {
    notFound();
  }

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [verifiedError, setVerifiedError] = useState(false);
  const [userId, setUserId] = useState('');
  console.log('🚀 ~ Verify ~ userId:', userId);

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const [formInput, setFormInput] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'confirmPassword') {
      if (value !== formInput.password) {
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
            [key]: `โปรดกรอกข้อมูล`,
          }));

          console.error(`${key} is required.`);
        }
      }
    }

    // Check if password and confirmPassword match
    if (formInput.password !== formInput.confirmPassword) {
      isValid = false;

      setValidationError((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'รหัสผ่านไม่ตรงกัน',
      }));

      console.error('Passwords do not match.');
    }

    // Check if password is at least 6 characters long
    if (formInput.password.length < 6 && formInput.password.length >= 1) {
      isValid = false;

      setValidationError((prevErrors) => ({
        ...prevErrors,
        password: 'รหัสผ่านต้องมีจำนวน 6 ตัวอักษรขึ้นไป',
      }));

      console.error('Password must be at least 6 characters long.');
    }

    return isValid;
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await verifyData(
        'auth/forgot-password/token/check-expire',
        token,
        false,
      );

      if (response && response.status === 200) {
        if (response.data.token_valid) {
          setLoading(false);
          setVerified(true);
          setVerifiedError(false);
          setUserId(response.data.id);
        } else {
          setLoading(false);
          setVerifiedError(true);
          setVerified(false);
        }
      }
    } catch (error) {
      console.log("🚀 ~ verifyToken ~ error:", error)
      setLoading(false);
      setVerifiedError(true);
      setVerified(false);
    }
  };

  return (
    <div className="flex h-modal items-center justify-center">
      <div className="rounded-md border border-gray-400 p-4 shadow-md max-md:w-full">
        <div className="text-center">
          {loading && (
            <>
              <div className="mb-2 flex flex-col items-center justify-center gap-3">
                <CircularProgress />
                <p className="text-2xl">กำลังตรวจสอบข้อมูล</p>
              </div>
              <p className="text-lg">โปรดรอจนกว่าระบบจะยืนยันเสร็จสิ้น</p>
            </>
          )}

          {verifiedError && (
            <>
              <div className="mb-2 flex flex-col items-center justify-center gap-3">
                <ErrorOutlineOutlinedIcon className="h-14 w-14 text-red-500" />
                <p className="text-2xl">ผิดพลาด</p>
              </div>
              <p className="text-lg">โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง</p>
            </>
          )}

          {verified && (
            <form>
              <div className="mb-2 flex flex-col items-center justify-center gap-3">
                <p className="text-2xl">กรอกรหัสผ่านใหม่</p>
              </div>
              <div className="mb-2">
                <div className="flex flex-col">
                  <label
                    className="my-3 text-left text-base font-medium text-gray-900"
                    htmlFor="password"
                  >
                    รหัสผ่าน / Password
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
                      placeholder="จำนวน 6 ตัวอักษรขึ้นไป"
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
                </div>
                <div className="flex flex-col">
                  <label
                    className="my-3 text-left text-base font-medium text-gray-900"
                    htmlFor="confirmPassword"
                  >
                    ยืนยันรหัสผ่าน / Confirm Password
                  </label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      className="w-full"
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formInput.confirmPassword}
                      onChange={handleInputChange}
                      error={Boolean(validationError.confirmPassword)}
                      placeholder=""
                      autoComplete="off"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffOutlinedIcon className="h-5 w-5 text-gray-600" />
                            ) : (
                              <VisibilityOutlinedIcon className="h-5 w-5 text-gray-600" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText className="text-red-600">
                      {validationError.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                ไปยังเอกสารคำร้องขอระเบียนกิจกรรม
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
