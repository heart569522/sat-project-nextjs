'use client';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../buttons/button';
import { PN11 } from '@/app/model/pn11';
import { Faculties, Majors } from '@/app/model/faculties-majors';
import {
  createData,
  getAllData,
  sendEmail,
  updateData,
  createVerifyToken,
} from '@/app/lib/api-service';
import { useRouter } from 'next/navigation';
import ModalQuestion from '@/app/components/modal/modal-question';
import ModalResponse from '@/app/components/modal/modal-response';
import { OverlayLoading } from '../loading-screen';
import { uuidv7 } from 'uuidv7';

export default function PN11Form({
  editData,
  isEditing,
}: {
  editData?: any;
  isEditing?: boolean;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [handleAction, setHandleAction] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalNextPage, setModalNextPage] = useState(true);
  const [buttonLink, setButtonLink] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [faculties, setFaculties] = useState<Faculties[]>([]);
  const [majors, setMajors] = useState<Majors[]>([]);

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

  const handleOpenModal = (isCancel?: boolean, isSubmit?: boolean) => {
    console.log('handleOpenModal');

    if (isCancel) {
      setTitleModal(
        isEditing
          ? 'ยกเลิกการแก้ไขคำร้องขอระเบียนกิจกรรม'
          : 'ยกเลิกการร้องขอระเบียนกิจกรรม',
      );
      setDetailModal(
        isEditing
          ? 'คุณยืนยันที่จะยกเลิกการแก้ไขคำร้องขอระเบียนกิจกรรม'
          : 'คุณยืนยันที่จะยกเลิกคำร้องขอระเบียนกิจกรรม',
      );
      setHandleAction('cancel');
      setOpenQuestionModal(true);
    }

    if (isSubmit) {
      const isFormValid = validateForm();

      if (isFormValid) {
        setTitleModal(
          isEditing
            ? 'แก้ไขข้อมูลคำร้องขอระเบียนกิจกรรม'
            : 'ร้องขอระเบียนกิจกรรม',
        );
        setDetailModal(
          isEditing
            ? 'คุณยืนยันที่แก้ไขข้อมูลคำร้องขอระเบียนกิจกรรม'
            : 'คุณยืนยันที่จะส่งข้อมูลคำร้องขอระเบียนกิจกรรม',
        );
        setHandleAction('submit');
        setOpenQuestionModal(true);
      }
    }
  };

  const [formInput, setFormInput] = useState({
    firstname: isEditing ? editData.firstname : '',
    lastname: isEditing ? editData.lastname : '',
    studentId: isEditing ? editData.student_id : '',
    phone: isEditing ? editData.phone : '',
    major: isEditing ? editData.major_id : '',
    faculty: isEditing ? editData.faculty_id : '',
    email: isEditing ? editData.email : '',
    recipientName: isEditing ? editData.recipient_name : '',
    recipientAddress: isEditing ? editData.recipient_address : '',
    recipientPhone: isEditing ? editData.recipient_phone : '',
  });

  const [formRadio, setFormRadio] = useState({
    deliveryMethod: isEditing ? editData.delivery_method : '',
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
    const excludedFields = [
      'recipientName',
      'recipientAddress',
      'recipientPhone',
    ];

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

    // Validate formRadio
    if (!formRadio.deliveryMethod) {
      isValid = false;

      setValidationError((prevErrors) => ({
        ...prevErrors,
        formRadio: `โปรดเลือกวิธีการจัดส่ง`,
      }));

      console.error(`Delivery method is required.`);
    }

    return isValid;
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
    setOpenQuestionModal(false);
    setOpenResponseModal(false);
  };

  const handleSubmissionError = () => {
    setLoading(false);
    setModalError(true);
    setTitleModal(isEditing ? 'แก้ไขข้อมูลผิดพลาด' : 'ผิดพลาด');
    setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
    setOpenResponseModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    resetResponseModal();

    const formData = setFinalFormData();
    console.log('formData: ', formData);

    try {
      let response: any;

      if (isEditing) {
        response = await updateData(
          'activity-transcript',
          formData,
          editData.id,
        );
      } else {
        response = await createData('activity-transcript', formData);
      }

      if (response && (response.status === 201 || response.status === 200)) {
        if (isEditing) {
          setLoading(false);
          setModalSuccess(true);
          setTitleModal('แก้ไขข้อมูลสำเร็จ');
          setDetailModal('');
          setButtonLink(`/management/pn11/document/${editData.id}`);
          setButtonText('ไปยังเอกสารเอกสาร พน.11');
          setOpenResponseModal(true);
        } else {
          const verificationToken = generateUniqueToken();
          await storeToken(
            response.data.id,
            response.data.data.email,
            verificationToken,
          );

          const verifyLink = `${process.env.API_URL}/verify/pn11/${verificationToken}`;

          const formDataEmail = {
            firstname: response.data.data.firstname,
            lastname: response.data.data.lastname,
            email: response.data.data.email,
            verifyLink: verifyLink,
          };

          const emailResponse = await sendEmail(
            'send-email/verify/pn11',
            formDataEmail,
          );
          if (emailResponse && emailResponse.status === 200) {
            setLoading(false);
            setModalSuccess(true);
            setTitleModal('สำเร็จ');
            setDetailModal(
              `ส่งอีเมลยืนยันตัวตนไปยัง : ${response.data.data.email} 
              , กรุณาคลิกลิงก์ในอีเมลเพื่อยืนยันตัวตน และรอการแจ้งเตือนเพื่อรับเอกสารระเบียนกิจกรรม`,
            );
            setButtonLink(`/activity-history`);
            setButtonText('ตกลง');
            setOpenResponseModal(true);
          }
        }
      } else {
        handleSubmissionError();
      }
    } catch (error) {
      handleSubmissionError();
    }
  };

  const generateUniqueToken = () => {
    return uuidv7();
  };

  const storeToken = async (id: string, email: string, token: string) => {
    const formDataToken = {
      email: email,
      token: token,
    };
    try {
      await createVerifyToken(
        'activity-transcript/verify-token',
        id,
        formDataToken,
      );
    } catch (error) {
      console.log('🚀 ~ storeVerificationToken ~ error:', error);
    }
  };

  const setFinalFormData = () => {
    console.log('--set form--');

    const finalFormData: PN11 = {
      firstname: formInput.firstname,
      lastname: formInput.lastname,
      studentId: formInput.studentId,
      phone: formInput.phone,
      faculty: formInput.faculty,
      major: formInput.major,
      email: formInput.email,
      deliveryMethod: formRadio.deliveryMethod,
      recipientName: formInput.recipientName,
      recipientAddress: formInput.recipientAddress,
      recipientPhone: formInput.recipientPhone,
    };

    return finalFormData;
  };

  return (
    <>
      <form className="py-2">
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
                size="small"
              >
                <Select
                  name="faculty"
                  value={formInput.faculty}
                  onChange={handleFacultyChange}
                >
                  {faculties.map((faculty) => (
                    <MenuItem
                      divider={true}
                      key={faculty.id}
                      value={faculty.id}
                    >
                      {faculty.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{validationError.faculty}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <label
                htmlFor="major"
                className={`mb-2 block text-base font-medium ${
                  formInput.faculty ? `text-gray-900` : `text-gray-400`
                } `}
              >
                สาขาวิชา
              </label>
              <FormControl className="flex w-full" size="small">
                <Select
                  name="major"
                  value={formInput.major}
                  onChange={handleMajorChange}
                  disabled={!formInput.faculty}
                >
                  {majors
                    .filter(
                      (major) => major.faculty_id === Number(formInput.faculty),
                    )
                    .map((filteredMajor) => (
                      <MenuItem
                        divider={true}
                        key={filteredMajor.id}
                        value={filteredMajor.id}
                      >
                        {filteredMajor.name}
                      </MenuItem>
                    ))}
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
            className={`mb-3 block text-lg font-medium ${
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
            <div
              className={`${
                validationError.formRadio ? 'mb-0' : 'mb-6'
              } grid gap-x-6 gap-y-3 md:grid-cols-2`}
            >
              <div
                className={`flex items-center rounded border ${
                  validationError.formRadio
                    ? 'border-red-600'
                    : 'border-gray-200'
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
                  validationError.formRadio
                    ? 'border-red-600'
                    : 'border-gray-200'
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
      </form>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={() => handleOpenModal(true, false)}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          ยกเลิก
        </button>
        <Button onClick={() => handleOpenModal(false, true)}>ตกลง</Button>
      </div>

      <ModalQuestion
        openModal={openQuestionModal}
        onCloseModal={handleCloseModal}
        title={titleModal}
        detail={detailModal}
        okAction={handleAction}
        onOk={(action) => {
          console.log(action);
          if (action === 'submit') {
            handleSubmit();
          } else if (action === 'cancel') {
            router.push(isEditing ? '/management/pn11' : '/activity-history/', {
              scroll: false,
            });
          }
        }}
      />

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

      <OverlayLoading showLoading={loading} />
    </>
  );
}
