'use client';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import React, { useState } from 'react';
import ModalResponse from '@/app/components/modal/modal-response';
import { OverlayLoading } from '@/app/components/loading-screen';
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';

export default function checkPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalNextPage, setModalNextPage] = useState(true);
  const [buttonLink, setButtonLink] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [formInput, setFormInput] = useState({
    password: '',
  });

  const handleCloseModal = () => {
    setOpenResponseModal(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      let response: any;
    

      // response = await ;

    } catch (error) {
      
      
    }
  };
 

 
  return (
    <React.Fragment>
      <div className="height-forgot-password rounded-md border border-gray-200 p-4 pb-8">
        <form action={handleSubmit} className="space-y-3">
          <h1
            className="mb-3 text-center text-2xl font-semibold text-gray-800"
          >
            แก้ไขรหัสผ่าน
          </h1>
          <div className="flex flex-col">
            <label
              className="my-3 text-base font-medium text-gray-900"
              htmlFor="password"
            >
              รหัสผ่านเดิม / Password
            </label>
            <FormControl variant="outlined">
              <OutlinedInput
                className="w-full"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formInput.password}
                onChange={handleInputChange}
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
            </FormControl>
          </div>
          <div className="mb-2 mt-4 flex justify-center gap-2">
            <button className="h-10 items-center rounded-md  bg-blue-500 px-4 text-base  font-medium text-white transition-colors hover:bg-blue-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
              ยืนยันรหัสผ่าน
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
};
