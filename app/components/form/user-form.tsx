'use client';
import {
  checkExist,
  createData,
  getAllData,
  updateData,
} from '@/app/lib/api-service';
import { Faculties, Majors } from '@/app/model/faculties-majors';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Users } from '@/app/model/user';

import { OverlayLoading } from '@/app/components/loading-screen';
import ModalResponse from '@/app/components/modal/modal-response';
import Link from 'next/link';

export default function UserForm({
  editData,
  isCreating,
  isEditing,
  isAdminEditing,
  isAdminTable,
}: {
  editData?: any;
  isCreating?: boolean;
  isEditing?: boolean;
  isAdminEditing?: boolean;
  isAdminTable?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [buttonLink, setButtonLink] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [nextTab, setNextTab] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formInput, setFormInput] = useState({
    firstname: isEditing ? editData.firstname : '',
    lastname: isEditing ? editData.lastname : '',
    email: isEditing ? editData.email : '',
    phone: isEditing ? editData.phone : '',
    faculty: isEditing ? editData.faculty_id : '',
    major: isEditing ? editData.major_id : '',
    username: isEditing ? editData.username : '',
    password: '',
    verify: isEditing ? editData.is_verify : false,
    role: isEditing ? editData.role : '',
  });

  const [existEmail, setExistEmail] = useState(null);
  const [existUsername, setExistUsername] = useState(null);

  const [faculties, setFaculties] = useState<Faculties[]>([]);
  const [majors, setMajors] = useState<Majors[]>([]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
      await Promise.all([getFaculties(), getMajors()]);
    };

    fetchData();
  }, []);

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const [isFormEdited, setIsFormEdited] = useState(false);

  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setIsFormEdited(true);
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

  const handleCheckUsernameExist = async () => {
    const { username } = formInput;

    if (username.length > 0) {
      try {
        const response = await checkExist('username', username);
        setExistUsername(response);
      } catch (error) {
        setExistUsername(null);
      }
    } else {
      setExistUsername(null);
    }
  };

  const handleFacultyChange = (event: { target: { value: any } }) => {
    const facultyValue = event.target.value;
    setFormInput((prevInput) => ({
      ...prevInput,
      faculty: facultyValue,
      major: '', // Reset major when changing faculty
    }));
    setValidationError((prevError) => ({ ...prevError, faculty: '' }));

    setIsFormEdited(true);
  };

  const handleMajorChange = (event: { target: { value: any } }) => {
    const majorValue = event.target.value;
    setFormInput((prevInput) => ({ ...prevInput, major: majorValue }));
    setValidationError((prevError) => ({ ...prevError, major: '' }));

    setIsFormEdited(true);
  };

  const handleRoleChange = (event: { target: { value: any } }) => {
    const roleValue = event.target.value;
    setFormInput((prevInput) => ({
      ...prevInput,
      role: roleValue,
    }));
    setValidationError((prevError) => ({ ...prevError, role: '' }));

    setIsFormEdited(true);
  };

  const handleToggle = async () => {
    setFormInput((prevInput) => ({
      ...prevInput,
      verify: !prevInput.verify,
    }));

    setIsFormEdited(true);
  };

  const validateForm = () => {
    console.log('--validateForm--');

    let isValid = true;
    const excludedFields = [
      'verify',
      isAdminTable || isEditing ? 'password' : '',
    ];

    // Validate formInput
    for (const key in formInput) {
      if (Object.prototype.hasOwnProperty.call(formInput, key)) {
        if (excludedFields.includes(key)) {
          continue;
        }
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

    return isValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    resetResponseModal();

    const isFormValid = validateForm();

    if (isFormValid) {
      const formData = setFinalFormData();
      console.log('🚀 ~ handleSubmit ~ formData:', formData);

      try {
        let response: any;

        if (isAdminTable && isEditing) {
          response = await updateData('users', formData, editData.id);
        } else if (isEditing) {
          response = await updateData(
            'profile/update-profile',
            formData,
            editData.id,
          );
        } else {
          response = await createData('users', formData);
        }

        if (response && (response.status === 201 || response.status === 200)) {
          setLoading(false);
          setModalSuccess(true);
          setTitleModal(
            isAdminTable && !isCreating
              ? 'แก้ไขข้อมูลผู้ใช้สำเร็จ'
              : isCreating
                ? 'เพิ่มผู้ใช้สำเร็จ'
                : 'แก้ไขข้อมูลโปรไฟล์สำเร็จ',
          );
          setButtonLink(
            isAdminTable || isCreating ? '/management/users' : '/profile',
          );
          setButtonText('ตกลง');
          setNextTab(true);
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

  const setFinalFormData = () => {
    console.log('--set form--');

    const commonFields = {
      firstname: formInput.firstname,
      lastname: formInput.lastname,
      phone: formInput.phone,
      email: formInput.email.toLowerCase(),
      faculty_id: Number(formInput.faculty),
      major_id: Number(formInput.major),
      username: formInput.username.toLowerCase(),
    };

    const specificFields =
      isAdminTable && isEditing
        ? { role: formInput.role, is_verify: formInput.verify }
        : isCreating
          ? {
              password: formInput.password,
              role: formInput.role,
              is_verify: formInput.verify,
            }
          : {};

    const finalFormData = {
      ...commonFields,
      ...specificFields,
    };

    return finalFormData;
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

  const handleCloseModal = () => {
    setOpenResponseModal(false);
  };

  return (
    <React.Fragment>
      <OverlayLoading showLoading={loading} />
      <div className="height-forgot-password rounded-md border border-gray-200 p-4 pb-8">
        <form action={handleSubmit} className="space-y-3">
          <div className="flex-1 rounded-lg px-6 pb-4">
            <div className="w-full">
              <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                <div className="flex flex-col">
                  <label
                    className="my-3 text-base font-medium text-gray-900"
                    htmlFor="firstname"
                  >
                    ชื่อจริง / First Name
                  </label>
                  <TextField
                    size="small"
                    className="w-full"
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={formInput.firstname}
                    onChange={handleInputChange}
                    error={Boolean(validationError.firstname)}
                    helperText={validationError.firstname}
                    placeholder=""
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="my-3 text-base font-medium text-gray-900"
                    htmlFor="lastname"
                  >
                    นามสกุล / Last Name
                  </label>
                  <TextField
                    size="small"
                    className="w-full"
                    id="lastname"
                    type="text"
                    name="lastname"
                    value={formInput.lastname}
                    onChange={handleInputChange}
                    error={Boolean(validationError.lastname)}
                    helperText={validationError.lastname}
                    placeholder=""
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <label
                      className="my-3 text-base font-medium text-gray-900"
                      htmlFor="email"
                    >
                      อีเมล / Email
                    </label>
                    {/* <div className="flex gap-1">
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
                  </div> */}
                  </div>
                  <TextField
                    size="small"
                    className="w-full"
                    id="email"
                    type="email"
                    name="email"
                    value={formInput.email}
                    onChange={handleInputChange}
                    // onBlur={handleCheckEmailExist}
                    error={Boolean(validationError.email)}
                    helperText={validationError.email}
                    placeholder=""
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="my-3 text-base font-medium text-gray-900"
                    htmlFor="phone"
                  >
                    เบอร์โทรศัพท์ / Phone
                  </label>
                  <TextField
                    size="small"
                    className="w-full"
                    id="phone"
                    type="text"
                    name="phone"
                    value={formInput.phone}
                    onChange={handleInputChange}
                    error={Boolean(validationError.phone)}
                    helperText={validationError.phone}
                    placeholder=""
                    autoComplete="off"
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
                    size="small"
                  >
                    <Select
                      className="bg-white"
                      name="faculty"
                      id="faculty"
                      value={formInput.faculty}
                      onChange={handleFacultyChange}
                    >
                      {faculties.map((faculty) => (
                        <MenuItem
                          key={faculty.id}
                          value={faculty.id}
                          divider={true}
                        >
                          {faculty.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{validationError.faculty}</FormHelperText>
                  </FormControl>
                </div>
                <div className="flex flex-col">
                  <label
                    className={`my-3 text-base font-medium ${
                      formInput.faculty ? 'text-gray-900' : 'text-gray-400'
                    }`}
                    htmlFor="major"
                  >
                    สาขาวิชา / Major
                  </label>
                  <FormControl
                    className="w-full appearance-none rounded border leading-tight text-gray-900"
                    error={Boolean(validationError.major)}
                    size="small"
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
                          (major) =>
                            major.faculty_id === Number(formInput.faculty),
                        )
                        .map((filteredMajor) => (
                          <MenuItem
                            key={filteredMajor.id}
                            value={filteredMajor.id}
                            divider={true}
                          >
                            {filteredMajor.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{validationError.major}</FormHelperText>
                  </FormControl>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <label
                      className="my-3 text-base font-medium text-gray-900"
                      htmlFor="username"
                    >
                      ชื่อผู้ใช้ / Username
                    </label>
                    <div className="flex gap-1">
                      {existUsername && (
                        <>
                          <HighlightOffOutlinedIcon className="text-red-500" />
                          <p className="font-semibold text-red-500">
                            ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว
                          </p>
                        </>
                      )}
                      {!existUsername && existUsername != null && (
                        <>
                          <TaskAltOutlinedIcon className="text-green-500" />
                          <p className="font-semibold text-green-500">
                            สามารถใช้งานได้
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <TextField
                    size="small"
                    className="w-full"
                    id="username"
                    type="text"
                    name="username"
                    value={formInput.username}
                    onChange={handleInputChange}
                    // onBlur={handleCheckUsernameExist}
                    error={Boolean(validationError.username)}
                    helperText={validationError.username}
                    placeholder="ตัวอักษรภาษาอังกฤษ(พิมพ์เล็ก) หรือตัวเลขจำนวน 6 ตัวขึ้นไป"
                    autoComplete="off"
                    disabled={!isAdminTable && !isCreating}
                  />
                </div>
              </div>
              {isCreating && (
                <div className="mt-2 grid grid-cols-1 gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <label
                        className="my-3 text-base font-medium text-gray-900"
                        htmlFor="password"
                      >
                        รหัสผ่าน / Password
                      </label>
                    </div>
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
                        size="small"
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
                </div>
              )}

              {(isAdminTable || isCreating || isAdminEditing) && (
                <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                  <div className="flex flex-col">
                    <label
                      className="my-3 text-base font-medium text-gray-900"
                      htmlFor="role"
                    >
                      ตำแหน่ง / Role
                    </label>
                    <FormControl
                      className="w-full appearance-none rounded border leading-tight text-gray-900"
                      error={Boolean(validationError.role)}
                      size="small"
                    >
                      <Select
                        className="bg-white"
                        name="role"
                        id="role"
                        value={formInput.role}
                        onChange={handleRoleChange}
                      >
                        <MenuItem value="teacher" divider={true}>
                          อาจารย์
                        </MenuItem>
                        <MenuItem value="admin" divider={true}>
                          เจ้าหน้าที่
                        </MenuItem>
                      </Select>
                      <FormHelperText>{validationError.role}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className="flex w-full flex-col border-b border-gray-400 hover:border-gray-900">
                    <label
                      className="my-3 text-base font-medium text-gray-900"
                      htmlFor="verify"
                    >
                      ยันยืนบัญชี / Verify
                    </label>
                    <div className="ml-4 flex items-center justify-start gap-2">
                      <p className="text-base">ไม่ยืนยัน</p>
                      <Switch
                        checked={formInput.verify}
                        onClick={handleToggle}
                        color="success"
                      />
                      <p className="text-base">ยืนยันแล้ว</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mb-2 mt-6 flex justify-center gap-2">
            <Link
              href={
                isAdminTable || isCreating
                  ? '/management/users'
                  : isAdminEditing
                    ? '/profile'
                    : '/profile'
              }
              className="flex h-10 items-center rounded-md bg-gray-100 px-4 text-base font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              ยกเลิก
            </Link>

            <button
              className={
                !isFormEdited
                  ? 'flex h-10 items-center rounded-md bg-gray-300 px-4 text-base font-medium text-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
                  : 'flex h-10 items-center rounded-md bg-blue-500  px-4 text-base font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
              }
              type="submit"
              disabled={!isFormEdited}
            >
              {isCreating ? 'ตกลง' : 'ยืนยันการแก้ไขข้อมูล'}
            </button>
          </div>
        </form>
      </div>

      <ModalResponse
        openModal={openResponseModal}
        onCloseModal={handleCloseModal}
        title={titleModal}
        detail={detailModal}
        isSuccess={modalSuccess}
        isError={modalError}
        buttonLink={buttonLink}
        buttonText={buttonText}
        isNextTab={nextTab}
      />
    </React.Fragment>
  );
}
