'use client';
import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { notoThai } from '@/app/components/fonts';
import { Alert, CircularProgress, IconButton, StepLabel } from '@mui/material';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ClearIcon from '@mui/icons-material/Clear';
import { convertISOStringToDateTimeText } from '@/app/lib/services';
import {
  createData,
  searchProjectProposalCode,
  updateData,
} from '@/app/lib/api-service';
import { PaperPN01 } from '@/app/model/pn01';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Link from 'next/link';

const steps = ['รหัสโครงการ', 'บันทึกรายการนักศึกษา', 'สรุปผล'];

export default function PN10Form({
  userID,
  userRole,
}: {
  userID: string;
  userRole: string;
}) {
  const [activeStep, setActiveStep] = useState(0);

  const [searchValue, setSearchValue] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentIdList, setStudentIdList] = useState<string[]>([]);
  const [dateRecord, setDateRecord] = useState('');
  const [alertError, setAlertError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pn01Data, setPN01Data] = useState<PaperPN01>();
  const [responseId, setResponseId] = useState('');

  const handleSearchChange = (event: any) => {
    const numericValue = event.target.value.replace(/\D/g, '').slice(0, 5);
    setSearchValue(numericValue);
  };

  const handleStudentIdChange = (event: any) => {
    const numericValue = event.target.value.replace(/\D/g, '').slice(0, 10);
    setStudentId(numericValue);
  };

  const handleCheckProjectCode = async () => {
    setLoading(true);

    try {
      const response = await searchProjectProposalCode(
        searchValue,
        userID,
        userRole,
      );

      if (response && response.status === 200) {
        setPN01Data(response.data);
        setLoading(false);
        setAlertError(false);
        handleNext();
      }
    } catch (error) {
      setLoading(false);
      setAlertError(true);
    }
  };

  const handleSaveStudentId = () => {
    if (studentId.trim() !== '') {
      // Check if the studentId already exists in the list
      if (!studentIdList.includes(studentId)) {
        setStudentIdList((prevList) => [...prevList, studentId]);
        setStudentId('');
      } else {
        // Handle the case where the studentId already exists
        // You can show an error message or take other actions
        console.log(`Student ID: ${studentId} already exists in the list.`);
      }
    }
  };

  const handleClearStudentId = (rowIndex: number) => {
    const updatedList = studentIdList.filter((_, i) => i !== rowIndex);
    setStudentIdList(updatedList);
  };

  const handleSummaryRecord = () => {
    if (studentIdList.length >= 1) {
      setDateRecord(new Date().toISOString());
      handleNext();
    } else {
      console.log(`Not have Student ID in the list.`);
    }
  };

  const handleDisableNextButton = () => {
    if (activeStep === 0 && !searchValue) {
      console.log(`Not have value in project coode.`);
      return true;
    } else if (activeStep === 1 && studentIdList.length < 1) {
      console.log(`Not have Student ID in the list.`);
      return true;
    } else {
      return false;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setStudentIdList([]);
      setStudentId('');
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsSuccess(false);
    setIsFailed(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsSuccess(false);
    setIsFailed(false);
    setResponseId('');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    handleNext();
    setLoadingSave(true);

    try {
      const formData = await setFromData();

      const response = await createData('attendance', formData);

      if (response && (response.status === 200 || response.status === 201)) {
        setLoadingSave(false);
        setIsSuccess(true);
        setIsFailed(false);
        setResponseId(response.data.id);
        resetFeild();
      }
    } catch (error) {
      setLoadingSave(false);
      setIsSuccess(false);
      setIsFailed(true);
    }
  };

  const setFromData = async () => {
    const formData = {
      projectCode: pn01Data?.project_code,
      students: studentIdList,
      projectName: pn01Data?.project_name,
      projectYear: pn01Data?.project_year,
      userId: userID,
      pn01Id: pn01Data?.id,
    };

    return formData;
  };

  const resetFeild = () => {
    setSearchValue('');
    setStudentIdList([]);
    setPN01Data({});
  };

  return (
    <main>
      <div className="w-full">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  <p className={`${notoThai.className}`}>{label}</p>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            {loadingSave && (
              <div className="mt-4 flex items-center justify-center bg-gray-50 py-10">
                <div className="flex flex-col items-center justify-center gap-2">
                  <CircularProgress />
                  <div className="text-center">
                    <span className="text-lg font-semibold">
                      กำลังบันทึกข้อมูล
                    </span>
                    <p className="text-base">โปรดอย่าออกจากหน้านี้</p>
                  </div>
                </div>
              </div>
            )}

            {isSuccess && (
              <>
                <div className="mt-4 flex items-center justify-center bg-gray-50 py-10">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CheckCircleOutlinedIcon className="h-14 w-14 text-green-500" />
                    <span className="text-lg font-semibold">
                      บันทึกข้อมูลเรียบร้อยแล้ว
                    </span>
                  </div>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex h-10 items-center rounded-lg border border-blue-500 px-4 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                  >
                    ปิด
                  </button>
                  <Link
                    href={`activity-record/document/${responseId}`}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
                  >
                    ไปยังหน้าแบบฟอร์ม
                  </Link>
                </div>
              </>
            )}

            {isFailed && (
              <>
                <div className="mt-4 flex items-center justify-center bg-gray-50 py-10">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ErrorOutlineOutlinedIcon className="h-14 w-14 text-red-500" />
                    <span className="text-lg font-semibold">ผิดพลาด</span>
                  </div>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex h-10 items-center rounded-lg border border-blue-500 px-4 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                  >
                    ลองอีกครั้ง
                  </button>
                  {/* <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
                  >
                    ไปยังหน้าแบบฟอร์ม
                  </button> */}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-center py-6">
              <div className="h-full w-full rounded-lg bg-gray-50 px-6 py-4 max-md:w-full">
                {activeStep === 0 ? (
                  <section className="block">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      รหัสโครงการ/กิจกรรม (พน.01)
                    </h3>
                    <label
                      htmlFor="search"
                      className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative mb-2 w-full">
                      <input
                        type="number"
                        id="search"
                        className="block w-full rounded-md border border-gray-400 bg-white p-4 ps-10 text-sm text-gray-900"
                        placeholder="รหัสของโครงการที่ได้รับการอนุมัติ เช่น 65001, 66024 , ..."
                        autoComplete="off"
                        value={searchValue}
                        onChange={handleSearchChange}
                        required
                      />
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {loading && (
                      <div className="mt-4 w-full bg-white p-3">
                        <div className="flex items-center justify-center">
                          <CircularProgress />
                          <span className="ml-4 text-base font-medium">
                            Loading...
                          </span>
                        </div>
                      </div>
                    )}
                    {alertError && (
                      <div className="w-full py-2">
                        <Alert severity="error">
                          ไม่พบรหัสโครงการหรือรหัสโครงการนี้ยังไม่ได้รับอนุมัติ
                          — โปรดลองใหม่อีกครั้ง
                        </Alert>
                      </div>
                    )}
                  </section>
                ) : activeStep === 1 ? (
                  <section>
                    <div className="mb-4 block">
                      <h3 className="mb-4 text-center text-xl font-semibold text-gray-900">
                        {pn01Data?.project_name}
                      </h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSaveStudentId();
                        }}
                      >
                        <div className="flex justify-between gap-2">
                          <input
                            type="number"
                            id="studentId"
                            className="block w-full rounded-md border border-gray-400 bg-white p-4 text-sm text-gray-900"
                            placeholder="รหัสนักศึกษา"
                            autoComplete="off"
                            value={studentId}
                            onChange={handleStudentIdChange}
                            onBlur={() => handleSaveStudentId()}
                            required
                          />
                          <button
                            type="submit"
                            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
                          >
                            บันทึก
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="block">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        รายการรหัสนักศึกษา
                      </h3>
                      <div className='text-gray-900" h-[430px] w-full overflow-y-auto rounded-md border border-gray-400 bg-white p-2 text-sm'>
                        {studentIdList.map((stuId, index) => (
                          <div
                            className="flex w-full items-center justify-between border-b border-gray-300"
                            key={index}
                          >
                            <div className="inline-flex p-2">
                              <p className="font-semibold">
                                {index + 1}.&nbsp;
                              </p>
                              <p>{stuId}</p>
                            </div>
                            <div className="p-1">
                              <IconButton
                                className="text-gray-600 transition-colors hover:text-red-500"
                                onClick={() => handleClearStudentId(index)}
                              >
                                <ClearIcon className="h-4 w-4" />
                              </IconButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : activeStep === 2 ? (
                  <section>
                    <div className="mb-2 block">
                      <h3 className="mb-4 text-center text-xl font-semibold text-gray-900">
                        {pn01Data?.project_name}
                      </h3>
                      <div className="mb-2 flex items-center">
                        <label className="font-semibold text-gray-900">
                          วันที่บันทึก :&nbsp;
                        </label>
                        <p>{convertISOStringToDateTimeText(dateRecord)}</p>
                      </div>
                      <div className="mb-2 flex items-center">
                        <label className="font-semibold text-gray-900">
                          จำนวนนักศึกษาที่เข้าร่วมทั้งหมด :&nbsp;
                        </label>
                        <p>{studentIdList.length.toLocaleString()}</p>
                        <label>&nbsp;คน</label>
                      </div>
                    </div>
                    <div className="block">
                      <h3 className="mb-2 font-semibold text-gray-900">
                        รายการรหัสนักศึกษา
                      </h3>
                      <div className='text-gray-900" h-[430px] w-full overflow-y-auto rounded-md border border-gray-400 bg-white p-2 text-sm'>
                        {studentIdList.map((stuId, index) => (
                          <div
                            className="flex w-full items-center justify-between border-b border-gray-300"
                            key={index}
                          >
                            <div className="inline-flex p-2">
                              <p className="font-semibold">
                                {index + 1}.&nbsp;
                              </p>
                              <p>{stuId}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`flex h-10 items-center rounded-lg border px-4 text-sm font-medium transition-colors  ${
                  activeStep === 0
                    ? 'border-gray-400 text-gray-400'
                    : 'border-blue-500 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {activeStep === 2 ? 'กลับ' : 'ยกเลิก'}
              </button>
              <button
                type="button"
                onClick={
                  activeStep === 0
                    ? handleCheckProjectCode
                    : activeStep === 1
                    ? handleSummaryRecord
                    : handleSubmit
                }
                disabled={handleDisableNextButton()}
                className={`${
                  handleDisableNextButton()
                    ? 'bg-blue-300'
                    : 'bg-blue-500 hover:bg-blue-400'
                } flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`}
              >
                {activeStep === 0
                  ? 'ถัดไป'
                  : activeStep === 1
                  ? 'สรุปผล'
                  : 'ยืนยัน'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
