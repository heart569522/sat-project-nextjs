'use client';

import { Button } from '@/app/components/buttons/button';
import { OverlayLoading } from '@/app/components/loading-screen';
import ModalQuestion from '@/app/components/modal/modal-question';
import ModalResponse from '@/app/components/modal/modal-response';
import { getAllData, updateAllData, updateData } from '@/app/lib/api-service';
import { Faculties, Majors } from '@/app/model/faculties-majors';
import { pn01SelectList } from '@/app/model/pn01-select-list';
import {
  PlusCircleIcon,
  XCircleIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { TextField, Tooltip, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ValidationError {
  id: number;
  error: string;
}

interface ValidationErrors {
  [key: string]: ValidationError[];
}

interface FacultyMajorFormProps {
  pageTitle?: string;
}

export default function FacultyMajorFormOld({ pageTitle }: FacultyMajorFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [handleAction, setHandleAction] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalNextTab, setModalNextTab] = useState(false);
  const [buttonLink, setButtonLink] = useState('');
  const [buttonText, setButtonText] = useState('');

  const [facultyData, setFacultyData] = useState<Faculties[]>();
  const [majorData, setMajorData] = useState<Majors[]>();
  const [filterMajorData, setFilterMajorData] = useState<Majors[]>([]);
  console.log('🚀 ~ FacultyMajorForm ~ filterMajorData:', filterMajorData);

  const [activeFacultyId, setActiveFacultyId] = useState<number | null>(null);
  const [isFacultyChange, setIsFacultyChange] = useState(false);
  console.log('🚀 ~ FacultyMajorForm ~ isFacultyChange:', isFacultyChange);
  const [isMajorChange, setIsMajorChange] = useState(false);
  console.log('🚀 ~ FacultyMajorForm ~ isMajorChange:', isMajorChange);

  useEffect(() => {
    getFacultyMajorData();
  }, []);

  const getFacultyMajorData = async () => {
    try {
      const faculty = await getAllData('faculties');
      const major = await getAllData('majors');

      setFacultyData(faculty);
      setMajorData(major);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (isCancel?: boolean, isSubmit?: boolean) => {
    console.log('handleOpenModal');

    if (isCancel) {
      setTitleModal('ยกเลิกการแก้ไข');
      setDetailModal(`คุณยืนยันที่จะยกเลิกการ${pageTitle}`);
      setHandleAction('cancel');
      setOpenQuestionModal(true);
    }

    if (isSubmit) {
      const isFormValid = validateForm();

      if (isFormValid) {
        setTitleModal('แก้ไขข้อมูล');
        setDetailModal(`คุณยืนยันที่จะ${pageTitle}`);
        setHandleAction('submit');
        setOpenQuestionModal(true);
      }
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
    setOpenQuestionModal(false);
    setOpenResponseModal(false);
  };

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const [validationArrayError, setValidationArrayError] =
    useState<ValidationErrors>({});

  const addFacultyRow = () => {
    const newFacultyId = facultyData ? facultyData.length + 1 : 1;

    setFacultyData((prevRows: Faculties[] | undefined) => [
      ...(prevRows || []),
      {
        id: newFacultyId,
        name: '',
        created_at: '',
        updated_at: '',
      },
    ]);

    setIsFacultyChange(true);
    showMajorRow(newFacultyId);
    setActiveFacultyId(newFacultyId);
    addMajorRow(newFacultyId);
  };

  const addMajorRow = (facultyId: number) => {
    setFilterMajorData((prevRows: Majors[]) => [
      ...prevRows,
      {
        id: prevRows ? prevRows.length + 1 : 1,
        name: '',
        created_at: '',
        updated_at: '',
        faculty_id: facultyId,
      },
    ]);

    setIsMajorChange(true);
  };

  const deleteFacultyRow = (id: number) => {
    setFacultyData((prevFacultyRows) => {
      const updatedFacultyRows = prevFacultyRows?.filter(
        (row: { id: number }) => row.id !== id,
      );

      const updatedMajorData = majorData?.filter(
        (major: { faculty_id: number }) => major.faculty_id !== id,
      );

      setMajorData(updatedMajorData);

      const updatedRowsWithSequentialIds = updatedFacultyRows?.map(
        (row: any, index: number) => ({
          ...row,
          id: index + 1,
        }),
      );

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`faculty_`) &&
            updatedErrors[key].some((error) => error.id === id)
          ) {
            updatedErrors[key] = updatedErrors[key].filter(
              (error) => error.id !== id,
            );

            if (updatedErrors[key].length === 0) {
              delete updatedErrors[key];
            }
          }
        });

        return updatedErrors;
      });

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteMajorRow = (id: number) => {
    setFilterMajorData((prevRows) => {
      const updatedRows = prevRows?.filter(
        (row: { id: number }) => row.id !== id,
      );

      const updatedRowsWithSequentialIds = updatedRows?.map(
        (row: any, index: number) => ({
          ...row,
          id: index + 1,
        }),
      );

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`major_`) &&
            updatedErrors[key].some((error) => error.id === id)
          ) {
            updatedErrors[key] = updatedErrors[key].filter(
              (error) => error.id !== id,
            );

            if (updatedErrors[key].length === 0) {
              delete updatedErrors[key];
            }
          }
        });

        return updatedErrors;
      });

      return updatedRowsWithSequentialIds;
    });
  };

  const showMajorRow = (facultyId?: number) => {
    console.log('show major row');

    let selectedFacultyId = facultyId;

    if (!selectedFacultyId && majorData && majorData.length > 0) {
      selectedFacultyId = majorData[0].faculty_id;
    }

    const filteredMajorData = majorData?.filter(
      (major) => major.faculty_id === selectedFacultyId,
    );

    setFilterMajorData(filteredMajorData as Majors[]);

    return selectedFacultyId;
  };

  useEffect(() => {
    const selectedFacultyId = showMajorRow();
    setActiveFacultyId(selectedFacultyId as number);
  }, [majorData]);

  const handleFacultyChange = (id: number, field: string, value: string) => {
    setFacultyData(
      (prevRows) =>
        prevRows?.map((row: Faculties) =>
          row.id === id ? { ...row, [field]: value } : row,
        ),
    );

    setValidationArrayError((prevErrors) => {
      const key = `faculty_${field}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });

    setIsFacultyChange(true);
  };

  const handleMajorChange = (id: number, field: string, value: string) => {
    setFilterMajorData(
      (prevRows) =>
        prevRows?.map((row: Majors) =>
          row.id === id ? { ...row, [field]: value } : row,
        ),
    );

    setValidationArrayError((prevErrors) => {
      const key = `major_${field}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });

    setIsMajorChange(true);
  };

  const validateArray = (
    array: Array<any>,
    fields: Array<string>,
    prefix: string,
  ): boolean => {
    let isValid = true;

    const errors: ValidationErrors = {};

    array.forEach((item) => {
      fields.forEach((field) => {
        const key = `${prefix}_${field}` as keyof ValidationErrors;

        if (
          !item[field] ||
          (typeof item[field] === 'string' && item[field].trim() === '')
        ) {
          isValid = false;

          errors[key] = errors[key] || [];
          errors[key].push({ id: item.id, error: 'โปรดกรอกข้อมูล' });

          console.log(`${field} is required for item ${item.id}.`);
          console.log('Validation errors:', errors);

          setValidationArrayError((prevErrors) => ({
            ...prevErrors,
            ...errors,
          }));
        }
      });
    });

    return isValid;
  };

  const validateForm = () => {
    let isValid = true;

    // Validate Table arrays
    const dataFields = ['name'];
    const isFacultyValid = validateArray(
      facultyData as Faculties[],
      dataFields,
      'faculty',
    );

    const isMajorValid = validateArray(
      filterMajorData as Majors[],
      dataFields,
      'major',
    );

    isValid =
      isFacultyValid &&
      isMajorValid &&
      /* Add other validations here */ isValid;

    return isValid;
  };

  const handleSubmissionError = () => {
    setLoading(false);
    setModalError(true);
    setTitleModal('ผิดพลาด');
    setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
    setModalNextTab(false);
    setOpenResponseModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    resetResponseModal();

    const formData = setFinalFormData();
    console.log('🚀 ~ handleSubmit ~ formData:', formData);

    try {
      const response = await updateAllData('faculties/faculty-major', formData);

      if (response && (response.status === 201 || response.status === 200)) {
        setLoading(false);
        setModalSuccess(true);
        setTitleModal('สำเร็จ');
        setDetailModal(`${pageTitle}สำเร็จ`);
        setButtonLink(`/setting`);
        setButtonText('ตกลง');
        setModalNextTab(true);
        setOpenResponseModal(true);
      } else {
        handleSubmissionError();
      }
    } catch (error) {
      handleSubmissionError();
    }
  };

  const setFinalFormData = () => {
    console.log('--set form--');

    const finalFormData = {
      facultyData: facultyData,
      majorData: filterMajorData,
    };

    return finalFormData;
  };

  return (
    <>
      <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
        <form className="py-2">
          <div className="grid grid-cols-2 items-start gap-4 max-md:grid-cols-1">
            <div className={`mb-6 grid gap-3 md:grid-cols-1`}>
              <label
                htmlFor="projectName"
                className={`block text-center text-lg font-medium ${
                  validationError.data ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                รายการคณะ/วิทยาลัย
              </label>
              <div className="relative overflow-x-auto">
                <table className="w-full rounded border text-left text-sm text-gray-500">
                  <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="w-[5%] bg-gray-300 px-6 py-3">
                        ลำดับ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        รายการ
                      </th>
                      <th scope="col" className="w-[25%] bg-gray-300 px-6 py-3">
                        เพิ่ม/ลบแถว
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyData?.map((row, i) => (
                      <tr className="border-b bg-white" key={i}>
                        <th
                          scope="row"
                          className="bg-gray-50 px-6 py-4 text-center text-lg font-medium"
                        >
                          {i + 1}
                        </th>
                        <td className="px-6 py-4">
                          <div className={`grid grid-cols-1 gap-6`}>
                            <TextField
                              type="text"
                              name="name"
                              className="flex w-full"
                              placeholder=""
                              value={row.name}
                              size="small"
                              onChange={(e) =>
                                handleFacultyChange(
                                  row.id,
                                  'name',
                                  e.target.value,
                                )
                              }
                              error={Boolean(
                                validationArrayError['faculty_name']?.some(
                                  (item) => item.id === row.id,
                                ),
                              )}
                              helperText={
                                validationArrayError['faculty_name']?.find(
                                  (item) => item.id === row.id,
                                )?.error || ''
                              }
                            />
                          </div>
                        </td>
                        <td className="flex items-center justify-center bg-gray-50 px-6 py-4">
                          <Tooltip title="เพิ่มแถว">
                            <IconButton
                              aria-label="add_row"
                              size="small"
                              onClick={addFacultyRow}
                            >
                              <PlusCircleIcon className="h-9 w-9" />
                            </IconButton>
                          </Tooltip>
                          {facultyData.length > 1 && (
                            <Tooltip title="ลบแถว">
                              <IconButton
                                aria-label="delete_row"
                                size="small"
                                onClick={() => deleteFacultyRow(row.id)}
                              >
                                <XCircleIcon className="h-9 w-9" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="ดูสาขา">
                            <IconButton
                              aria-label="see_major"
                              size="small"
                              onClick={() => {
                                const selectedFacultyId = showMajorRow(row.id);
                                setActiveFacultyId(selectedFacultyId as number);
                              }}
                              className={`${
                                activeFacultyId === row.id
                                  ? 'bg-blue-300 text-white hover:bg-blue-400'
                                  : ''
                              }`}
                            >
                              <ChevronDoubleRightIcon className="h-9 w-9" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`mb-6 grid gap-3 md:grid-cols-1`}>
              <label
                htmlFor="projectName"
                className={`block text-center text-lg font-medium ${
                  validationError.data ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                รายการสาขา
              </label>
              <div className="relative overflow-x-auto">
                <table className="w-full rounded border text-left text-sm text-gray-500">
                  <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="w-[5%] bg-gray-300 px-6 py-3">
                        ลำดับ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        รายการ
                      </th>
                      <th scope="col" className="w-[20%] bg-gray-300 px-6 py-3">
                        เพิ่ม/ลบแถว
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterMajorData?.map((row, i) => (
                      <tr className="border-b bg-white" key={i}>
                        <th
                          scope="row"
                          className="bg-gray-50 px-6 py-4 text-center text-lg font-medium"
                        >
                          {i + 1}
                        </th>
                        <td className="px-6 py-4">
                          <div className={`grid grid-cols-1 gap-6`}>
                            <TextField
                              type="text"
                              name="name"
                              className="flex w-full"
                              placeholder=""
                              value={row.name}
                              size="small"
                              onChange={(e) =>
                                handleMajorChange(
                                  row.id,
                                  'name',
                                  e.target.value,
                                )
                              }
                              error={Boolean(
                                validationArrayError['major_name']?.some(
                                  (item) => item.id === row.id,
                                ),
                              )}
                              helperText={
                                validationArrayError['major_name']?.find(
                                  (item) => item.id === row.id,
                                )?.error || ''
                              }
                            />
                          </div>
                        </td>
                        <td className="flex items-center justify-center bg-gray-50 px-6 py-4">
                          <Tooltip title="เพิ่มแถว">
                            <IconButton
                              aria-label="add_row"
                              size="small"
                              onClick={() => addMajorRow(row.faculty_id)}
                            >
                              <PlusCircleIcon className="h-9 w-9" />
                            </IconButton>
                          </Tooltip>
                          {filterMajorData.length > 1 && (
                            <Tooltip title="ลบแถว">
                              <IconButton
                                aria-label="delete_row"
                                size="small"
                                onClick={() => deleteMajorRow(row.id)}
                              >
                                <XCircleIcon className="h-9 w-9" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1">
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => handleOpenModal(true, false)}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              ยกเลิก
            </button>
            <Button onClick={() => handleOpenModal(false, true)}>
              {'ตกลง'}
            </Button>
          </div>
        </div>
      </div>
      <ModalQuestion
        openModal={openQuestionModal}
        onCloseModal={handleCloseModal}
        title={titleModal}
        detail={detailModal}
        okAction={handleAction}
        onOk={(action) => {
          if (action === 'submit') {
            handleSubmit();
          } else if (action === 'cancel') {
            router.push('/setting#pn01-select', { scroll: false });
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
        isNextTab={modalNextTab}
        // isReloadPage={modalReloadPage}
      />

      <OverlayLoading showLoading={loading} />
    </>
  );
}
