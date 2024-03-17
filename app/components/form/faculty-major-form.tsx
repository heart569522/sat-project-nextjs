'use client';

import { Button } from '@/app/components/buttons/button';
import { OverlayLoading } from '@/app/components/loading-screen';
import ModalQuestion from '@/app/components/modal/modal-question';
import ModalResponse from '@/app/components/modal/modal-response';
import { createData, getAllData, updateAllData, updateData } from '@/app/lib/api-service';
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
  data?: Faculties;
  isEditing?: boolean;
}

export default function FacultyMajorForm({
  pageTitle,
  data,
  isEditing,
}: FacultyMajorFormProps) {
  // console.log('🚀 ~ data:', data);
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

  const initialMajorState = [
    {
      id: 1,
      name: '',
      created_at: '',
      updated_at: '',
      faculty_id: 0,
    },
  ];

  const [formInput, setFormInput] = useState({
    facultyName: isEditing ? data?.name : '',
  });
  const [majorRows, setMajorRows] = useState<Majors[]>(
    isEditing ? [] : initialMajorState,
  );
  console.log('🚀 ~ majorRows:', majorRows);

  useEffect(() => {
    if (isEditing) {
      getMajorData(data?.id as number);
    }
  }, []);

  const getMajorData = async (facultyId: number) => {
    try {
      const major = await getAllData('majors');
      const filteredMajors = major.filter(
        (row: { faculty_id: number }) => row.faculty_id === facultyId,
      );

      setMajorRows(filteredMajors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (isCancel?: boolean, isSubmit?: boolean) => {
    console.log('handleOpenModal');

    if (isCancel) {
      setTitleModal(isEditing ? 'ยกเลิกการแก้ไข' : 'ยกเลิก');
      setDetailModal(`คุณยืนยันที่จะยกเลิกการ${pageTitle}`);
      setHandleAction('cancel');
      setOpenQuestionModal(true);
    }

    if (isSubmit) {
      const isFormValid = validateForm();

      if (isFormValid) {
        setTitleModal(isEditing ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล');
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

  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormInput((prevTypes) => ({
      ...prevTypes,
      [name]: value,
    }));

    setValidationError((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const addMajorRow = () => {
    setMajorRows((prevRows) => [
      ...(prevRows || []),
      {
        id: prevRows ? prevRows.length + 1 : 1,
        name: '',
        created_at: '',
        updated_at: '',
        faculty_id: data?.id as number,
      },
    ]);
  };

  const deleteMajorRow = (id: number) => {
    setMajorRows((prevRows) => {
      const updatedRows = prevRows?.filter(
        (row: { id: number }) => row.id !== id,
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

      return updatedRows;
    });
  };

  const handleMajorChange = (id: number, field: string, value: string) => {
    setMajorRows((prevRows) =>
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

    // Validate Table arrays
    const dataFields = ['name'];
    const isMajorValid = validateArray(
      majorRows as Majors[],
      dataFields,
      'major',
    );

    isValid = isMajorValid && /* Add other validations here */ isValid;

    return isValid;
  };

  const handleSubmissionError = () => {
    setLoading(false);
    setModalError(true);
    setTitleModal('ผิดพลาด');
    setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
    setOpenResponseModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    resetResponseModal();

    const formData = setFinalFormData();
    console.log('🚀 ~ handleSubmit ~ formData:', formData);

    try {
      let response : any;
      
      if (isEditing) {
        response = await updateData(
          'faculties/faculty-major',
          formData,
          data?.id as number,
          true,
        );
      } else {
        response = await createData(
          'faculties/faculty-major',
          formData,
        );
      }

      if (response && (response.status === 201 || response.status === 200)) {
        setLoading(false);
        setModalSuccess(true);
        setTitleModal('สำเร็จ');
        setDetailModal(`${pageTitle}สำเร็จ`);
        setButtonLink(`/setting#faculty-major`);
        setButtonText('ตกลง');
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
      facultyName: formInput.facultyName,
      majorData: majorRows,
    };

    return finalFormData;
  };

  return (
    <>
      <form className="py-2">
        <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
          <div className={`mb-6 grid grid-cols-1 gap-6`}>
            <div>
              <label
                htmlFor="projectYear"
                className={`mb-2 block text-lg font-medium ${
                  validationError.facultyName ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                คณะ/วิทยาลัย
              </label>
              <TextField
                type="text"
                name="facultyName"
                className="flex w-full"
                value={formInput.facultyName}
                onChange={handleInputChange}
                placeholder=""
                error={Boolean(validationError.facultyName)}
                helperText={validationError.facultyName}
                size="small"
              />
            </div>
          </div>
          <div className={`mb-6 grid gap-3 md:grid-cols-1`}>
            <label
              className={`block text-lg font-medium ${
                validationError.data ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              รายการสาขา
            </label>
            <div className="relative overflow-x-auto">
              <table className="w-full rounded border text-left text-sm text-gray-500">
                <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      สาขา
                    </th>
                    <th scope="col" className="w-[15%] bg-gray-300 px-6 py-3">
                      เพิ่ม/ลบแถว
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {majorRows?.map((row, i) => (
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
                              handleMajorChange(row.id, 'name', e.target.value)
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
                            onClick={addMajorRow}
                          >
                            <PlusCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                        {majorRows.length > 1 && (
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
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={() => handleOpenModal(true, false)}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          ยกเลิก
        </button>
        <Button onClick={() => handleOpenModal(false, true)}>{'ตกลง'}</Button>

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
              router.push('/setting#faculty-major', { scroll: false });
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
      </div>
    </>
  );
}
