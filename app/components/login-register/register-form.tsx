'use client';

import { getAllData } from '@/app/lib/api-service';
import { Faculties, Majors } from '@/app/model/faculties-majors';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from '../buttons/button';

export default function RegisterForm() {
  const [formInput, setFormInput] = useState({
    firstname: '',
    lastname: '',
    studentId: '',
    phone: '',
    major: '',
    faculty: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [faculties, setFaculties] = useState<Faculties[]>([]);
  const [majors, setMajors] = useState<Majors[]>([]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getFaculties = async () => {
    try {
      const data = await getAllData('faculties');
      setFaculties(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMajors = async () => {
    try {
      const data = await getAllData('majors');
      setMajors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('fetch list fac/major');

    const fetchData = async () => {
      await getFaculties();
      await getMajors();
    };

    fetchData();
  }, []);

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

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

  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-center text-2xl font-semibold text-gray-800`}>
          สมัครสมาชิก
        </h1>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="firstname"
              >
                ชื่อจริง / First Name
              </label>
              <input
                className="w-full rounded-md border border-gray-200 text-base outline-2 placeholder:text-gray-500"
                id="firstname"
                type="text"
                name="firstname"
                placeholder=""
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="lastname"
              >
                นามสกุล / Last Name
              </label>
              <input
                className="w-full rounded-md border border-gray-200 text-base outline-2 placeholder:text-gray-500"
                id="lastname"
                type="text"
                name="lastname"
                placeholder=""
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="email"
              >
                อีเมล / Email
              </label>
              <input
                className="w-full rounded-md border border-gray-200 text-base outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder=""
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="phone"
              >
                เบอร์โทรศัพท์ / Phone
              </label>
              <input
                className="w-full rounded-md border border-gray-200 text-base outline-2 placeholder:text-gray-500"
                id="phone"
                type="text"
                name="phone"
                placeholder=""
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="faculty"
              >
                คณะ - วิทยาลัย / Faculty
              </label>
              <FormControl
                className="w-full appearance-none rounded border leading-tight text-gray-900"
                error={Boolean(validationError.faculty)}
              >
                <Select
                  className="bg-white"
                  name="faculty"
                  id="faculty"
                  value={formInput.faculty}
                  onChange={handleFacultyChange}
                >
                  {faculties.map((faculty) => (
                    <MenuItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{validationError.faculty}</FormHelperText>
              </FormControl>
            </div>
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="major"
              >
                สาขาวิชา / Major
              </label>
              <FormControl
                className="w-full appearance-none rounded border leading-tight text-gray-900"
                error={Boolean(validationError.major)}
              >
                <Select
                  className="bg-white"
                  name="major"
                  id="major"
                  value={formInput.major}
                  onChange={handleMajorChange}
                  disabled={!formInput.faculty}
                >
                  {majors
                    .filter(
                      (major) => major.faculty_id === Number(formInput.faculty),
                    )
                    .map((filteredMajor) => (
                      <MenuItem key={filteredMajor.id} value={filteredMajor.id}>
                        {filteredMajor.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{validationError.faculty}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="username"
              >
                ชื่อผู้ใช้ / Username
              </label>
              <input
                className="w-full rounded-md border border-gray-200 text-base outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder=""
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="password"
              >
                รหัสผ่าน / Password
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-md border border-gray-200 text-base outline-2 placeholder:text-gray-500"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder=""
                  required
                  minLength={6}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer peer-focus:text-gray-900"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="text-gray-500" />
                  ) : (
                    <EyeIcon className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="my-3 text-base font-medium text-gray-900"
                htmlFor="confirmPassword"
              >
                ยืนยันรหัสผ่าน / Confirm Password
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-md border border-gray-200 text-base outline-2 placeholder:text-gray-500"
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder=""
                  required
                  minLength={6}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleShowConfirmPassword}
                  className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer peer-focus:text-gray-900"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="text-gray-500" />
                  ) : (
                    <EyeIcon className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-6 flex justify-center gap-2">
        <button className="flex h-10 items-center rounded-md bg-gray-100 px-4 text-base font-medium text-gray-600 transition-colors hover:bg-gray-200">
          ยกเลิก
        </button>
        <button
          className="flex h-10 items-center rounded-md bg-blue-500 px-4 text-base font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          type="submit"
        >
          ยืนยัน
        </button>
      </div>
    </form>
  );
}
