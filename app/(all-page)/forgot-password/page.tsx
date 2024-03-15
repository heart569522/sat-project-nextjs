'use client';
import {
  checkAvaliable,
  createForgotPasswordToken,
  getOneData,
  sendEmail,
} from '@/app/lib/api-service';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Alert, TextField } from '@mui/material';
import React, { useState } from 'react';
import ModalResponse from '@/app/components/modal/modal-response';
import { OverlayLoading } from '@/app/components/loading-screen';
import { uuidv7 } from "uuidv7";

export default function ForgetPassForm() {
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    email: '',
  });

  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalNextPage, setModalNextPage] = useState(true);
  const [buttonLink, setButtonLink] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [avaliableEmail, setAvaliableEmail] = useState(true);

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

  const handleCheckEmailAvaliable = async () => {
    const { email } = formInput;

    if (email.length > 0) {
      try {
        const response = await checkAvaliable(
          'users/check-avaliable-email',
          email,
        );

        setAvaliableEmail(response);
        return response;
      } catch (error) {
        setAvaliableEmail(false);
        return false;
      }
    } else {
      setAvaliableEmail(false);
      return false;
    }
  };

  const generateUniqueToken = () => {
    return uuidv7();
  };

  const storeToken = async (email: string, token: string) => {
    const formDataToken = {
      email: email,
      token: token,
    };
    try {
      await createForgotPasswordToken(
        'auth/forgot-password/token',
        email,
        formDataToken,
      );
    } catch (error) {
      console.log('🚀 ~ storeVerificationToken ~ error:', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    resetResponseModal();

    const isEmailValid = await handleCheckEmailAvaliable();

    if (isEmailValid) {
      setValidationError({});
      setAvaliableEmail(true);

      try {
        const response = await getOneData('users/email', formInput.email);
        console.log('🚀 ~ handleSubmit ~ response:', response);
        if (response && response.status === 200) {
          const verificationToken = generateUniqueToken();
          await storeToken(formInput.email, verificationToken);

          const forgotPasswordLink = `${process.env.API_URL}/verify/forgot-password/${verificationToken}`;

          const formDataEmail = {
            firstname: response.data[0].firstname,
            lastname: response.data[0].lastname,
            email: formInput.email,
            forgotPasswordLink: forgotPasswordLink,
          };
          console.log('🚀 ~ handleSubmit ~ formDataEmail:', formDataEmail);

          const emailResponse = await sendEmail(
            'send-email/forgot-password',
            formDataEmail,
          );
          if (emailResponse && emailResponse.status === 200) {
            setLoading(false);
            setModalSuccess(true);
            setTitleModal('สำเร็จ');
            setDetailModal(
              `ส่งอีเมลยืนยันไปยัง : ${formInput.email} 
              , สามารถคลิกลิงก์ในอีเมลเพื่อแก้ไขรหัสผ่านของคุณ`,
            );
            setButtonLink(`/`);
            setButtonText('ตกลง');
            setOpenResponseModal(true);
          }
        }
      } catch (error) {
        handleSubmissionError();
      }
    } else {
      setLoading(false);
      setValidationError((prevErrors) => ({
        ...prevErrors,
        email: 'ไม่พบอีเมลนี้ในระบบ — โปรดลองอีกครั้ง',
      }));
    }
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

  const handleSubmissionError = () => {
    setLoading(false);
    setModalError(true);
    setTitleModal('ผิดพลาด');
    setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
    setOpenResponseModal(true);
  };

  return (
    <React.Fragment>
      <div className="height-forgot-password rounded-md border border-gray-200 p-4 pb-8">
        <form action={handleSubmit} className="space-y-3">
          <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
            <h1
              className={`mb-3 text-center text-2xl font-semibold text-gray-800`}
            >
              ลืมรหัสผ่าน
            </h1>
            <div className="flex w-full flex-col gap-1">
              <label
                className="text-base font-medium text-gray-900"
                htmlFor="email"
              >
                อีเมล / Email
              </label>
              <TextField
                className="w-full"
                id="email"
                type="email"
                name="email"
                value={formInput.email}
                onChange={handleInputChange}
                error={Boolean(validationError.email)}
                placeholder=""
                autoComplete="off"
                size="small"
              />
              {!avaliableEmail && (
                <div className="w-full py-2">
                  <Alert severity="error">{validationError.email}</Alert>
                </div>
              )}
            </div>
          </div>
          <div className="mb-2 mt-4 flex justify-center gap-2">
            <button
              className={`${
                formInput.email
                  ? 'bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600'
                  : 'bg-gray-300 text-gray-500'
              } flex h-10 items-center rounded-md  px-4 text-base font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  aria-disabled:cursor-not-allowed aria-disabled:opacity-50`}
              type="submit"
              disabled={!formInput.email}
            >
              ยืนยันอีเมล
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
