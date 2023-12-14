'use client';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import faculties from '@/app/model/faculties';
import majors from '@/app/model/majors';
import Link from 'next/link';
import { Button } from '../button';

export default function PN11Form() {
  const [formInput, setFormInput] = useState({
    firstname: '',
    lastname: '',
    studentId: '',
    phone: '',
    major: '',
    faculty: '',
    email: '',
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
  });

  const [formRadio, setFormRadio] = useState({
    deliveryMethod: '',
  });

  const isSending = formRadio.deliveryMethod == 'send';

  const checkSendRadio = () => {
    if (!isSending) {
      setFormInput((prevTypes) => ({
        ...prevTypes,
        recipientName: '',
        recipientAddress: '',
        recipientPhone: '',
      }));

      setValidationError((prevErrors) => ({
        ...prevErrors,
        recipientName: '',
        recipientAddress: '',
        recipientPhone: '',
      }));
    }
  };

  useEffect(() => {
    checkSendRadio();
  }, [isSending]);

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

    setValidationError((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleFacultyChange = (event: { target: { value: any } }) => {
    const facultyValue = event.target.value;
    setFormInput((prevInput) => ({
      ...prevInput,
      faculty: facultyValue,
      major: '', // Reset major when changing faculty
    }));
    setValidationError((prevError) => ({ ...prevError, faculty: '' }));
  };

  const handleMajorChange = (event: { target: { value: any } }) => {
    const majorValue = event.target.value;
    setFormInput((prevInput) => ({ ...prevInput, major: majorValue }));
    setValidationError((prevError) => ({ ...prevError, major: '' }));
  };

  const handleRadioChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;

    setFormRadio((prevTypes) => ({
      ...prevTypes,
      [name]: value,
    }));

    setValidationError((prevErrors) => ({
      ...prevErrors,
      formRadio: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const excludedFields = ['recipientName', 'recipientAddress', 'recipientPhone'];

    console.log('--validateForm--');

    // Validate formInput
    for (const key in formInput) {
      if (Object.prototype.hasOwnProperty.call(formInput, key)) {
        if (!isSending) {
          if (excludedFields.includes(key)) {
            continue;
          }
        }

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

    return isValid;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      // const formData = setFinalFormData();
      // console.log('formData: ',formData);
      console.log('form valid');
      
    } else {
      console.error('Form validation failed. Please check the form fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className="mb-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
        <div className={`mb-0 grid gap-6 md:grid-cols-2`}>
          <div>
            <label
              htmlFor="firstname"
              className={`mb-2 block text-base font-medium ${
                validationError.firstname ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              ชื่อจริง
            </label>
            <TextField
              type="text"
              name="firstname"
              className="flex w-full"
              value={formInput.firstname}
              onChange={handleInputChange}
              placeholder=""
              error={Boolean(validationError.firstname)}
              helperText={validationError.firstname}
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className={`mb-2 block text-base font-medium ${
                validationError.lastname ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              นามสกุล
            </label>
            <TextField
              type="text"
              name="lastname"
              className="flex w-full"
              value={formInput.lastname}
              onChange={handleInputChange}
              placeholder=""
              error={Boolean(validationError.lastname)}
              helperText={validationError.lastname}
            />
          </div>
          <div>
            <label
              htmlFor="studentId"
              className={`mb-2 block text-base font-medium ${
                validationError.studentId ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              รหัสประจำตัวนักศึกษา
            </label>
            <TextField
              type="text"
              name="studentId"
              className="flex w-full"
              value={formInput.studentId}
              onChange={handleInputChange}
              placeholder=""
              error={Boolean(validationError.studentId)}
              helperText={validationError.studentId}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className={`mb-2 block text-base font-medium ${
                validationError.phone ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              หมายเลขโทรศัพท์
            </label>
            <TextField
              type="text"
              name="phone"
              className="flex w-full"
              value={formInput.phone}
              onChange={handleInputChange}
              placeholder=""
              error={Boolean(validationError.phone)}
              helperText={validationError.phone}
            />
          </div>
          <div>
            <label
              htmlFor="faculty"
              className={`mb-2 block text-base font-medium ${
                validationError.faculty ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              คณะ/วิทยาลัย
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationError.faculty)}
            >
              <Select
                name="faculty"
                value={formInput.faculty}
                onChange={handleFacultyChange}
              >
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{validationError.faculty}</FormHelperText>
            </FormControl>
          </div>
          <div>
            <label
              htmlFor="major"
              className={`mb-2 block text-base font-medium text-gray-900`}
            >
              สาขาวิชา
            </label>
            <FormControl
              className="flex w-full"
            >
              <Select
                name="major"
                value={formInput.major}
                onChange={handleMajorChange}
                disabled={!formInput.faculty}
              >
                {majors[formInput.faculty as keyof typeof majors]?.map(
                  (major) => (
                    <MenuItem key={major} value={major}>
                      {major}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </div>
          <div>
            <label
              htmlFor="email"
              className={`mb-2 block text-base font-medium ${
                validationError.email ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              Email (สำหรับส่งการแจ้งเตือนเพื่อรับเอกสาร)
            </label>
            <TextField
              type="email"
              name="email"
              className="flex w-full"
              value={formInput.email}
              onChange={handleInputChange}
              placeholder=""
              error={Boolean(validationError.email)}
              helperText={validationError.email}
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
        <h3
          className={`mb-3 block text-lg font-semibold ${
            validationError.formRadio ? 'text-red-600' : 'text-gray-900'
          }`}
        >
          การรับเอกสาร
        </h3>
        <div
          className={`mb-6 ${
            validationError.formRadio ? ' text-red-600' : 'text-gray-900'
          }`}
        >
          <div className="mb-6 grid gap-x-6 gap-y-3 md:grid-cols-2">
            <div
              className={`flex items-center rounded border ${
                validationError.formRadio ? 'border-red-600' : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="deliveryMethod"
                type="radio"
                value="receive"
                checked={formRadio.deliveryMethod === 'receive'}
                onChange={handleRadioChange}
                className="h-5 w-5 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
              />
              <label className="ms-2 w-full py-4 text-sm font-medium">
                รับเอกสารด้วยตนเอง ที่ สำนักพัฒนานักศึกษา
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.formRadio ? 'border-red-600' : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="deliveryMethod"
                type="radio"
                value="send"
                checked={formRadio.deliveryMethod === 'send'}
                onChange={handleRadioChange}
                className="h-5 w-5 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
              />
              <label className="ms-2 w-full py-4 text-sm font-medium">
                จัดส่งทางไปรษณีย์ ค่าบริการไปรษณีย์ 33 บาท
              </label>
            </div>
          </div>
          {validationError.formRadio && (
            <p className="ml-3 pt-[4px] text-xs tracking-wider text-red-600">
              {validationError.formRadio}
            </p>
          )}

          {isSending && (
            <div className={`mb-0 grid gap-3 md:grid-cols-1`}>
              <div>
                <label
                  htmlFor="recipientName"
                  className={`mb-2 block text-base font-medium ${
                    validationError.recipientName
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}
                >
                  ชื่อ-นามสกุล (ผู้รับ)
                </label>
                <TextField
                  type="text"
                  name="recipientName"
                  className="flex w-full"
                  value={formInput.recipientName}
                  onChange={handleInputChange}
                  placeholder=""
                  error={Boolean(validationError.recipientName)}
                  helperText={validationError.recipientName}
                />
              </div>
              <div>
                <label
                  htmlFor="recipientAddress"
                  className={`mb-2 block text-base font-medium ${
                    validationError.recipientAddress
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}
                >
                  ที่อยู่ในการจัดส่ง (ผู้รับ)
                </label>
                <TextField
                  type="text"
                  name="recipientAddress"
                  className="flex w-full"
                  value={formInput.recipientAddress}
                  onChange={handleInputChange}
                  placeholder=""
                  multiline
                  rows={4}
                  sx={{
                    '.MuiOutlinedInput-root': {
                      padding: 1,
                    },
                  }}
                  error={Boolean(validationError.recipientAddress)}
                  helperText={validationError.recipientAddress}
                />
              </div>
              <div>
                <label
                  htmlFor="recipientPhone"
                  className={`mb-2 block text-base font-medium ${
                    validationError.recipientPhone
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}
                >
                  หมายเลขโทรศัพท์ (ผู้รับ)
                </label>
                <TextField
                  type="text"
                  name="recipientPhone"
                  className="flex w-full"
                  value={formInput.recipientPhone}
                  onChange={handleInputChange}
                  placeholder=""
                  error={Boolean(validationError.recipientPhone)}
                  helperText={validationError.recipientPhone}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/activity-history/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          ยกเลิก
        </Link>
        <Button type="submit">ตกลง</Button>
      </div>
    </form>
  );
}
