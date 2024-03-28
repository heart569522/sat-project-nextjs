'use client';

import { Button } from '@/app/components/buttons/button';
import { OverlayLoading } from '@/app/components/loading-screen';
import ModalQuestion from '@/app/components/modal/modal-question';
import ModalResponse from '@/app/components/modal/modal-response';
import { updateAllData, updateData } from '@/app/lib/api-service';
import { pn01SelectList } from '@/app/model/pn01-select-list';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { TextField, Tooltip, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ValidationError {
  id: number;
  error: string;
}

interface ValidationErrors {
  [key: string]: ValidationError[];
}

interface PN01SelectFormProps {
  data: pn01SelectList[];
  pageTitle: string;
}

export default function PN01SelectForm({
  data,
  pageTitle,
}: PN01SelectFormProps) {
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

  const [dataRows, setDataRows] = useState(data);

  const handleOpenModal = (isCancel?: boolean, isSubmit?: boolean) => {

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

  const addRow = () => {
    setDataRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        name: '',
        created_at: '',
        updated_at: '',
        is_delete: false
      },
    ]);
  };

  const deleteRow = (id: number) => {
    setDataRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`data_`) &&
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

  const handleDataChange = (id: number, field: string, value: string) => {
    setDataRows((prevRows) =>
      prevRows?.map((row) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    );

    setValidationArrayError((prevErrors) => {
      const key = `data_${field}`;
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

    // Validate Table arrays
    const dataFields = ['name'];
    const isDataValid = validateArray(dataRows, dataFields, 'data');

    isValid = isDataValid && /* Add other validations here */ isValid;

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

    try {
      const response = await updateAllData(
        'pn01-select-list/strategic_issue_list',
        dataRows,
      );

      if (response && (response.status === 201 || response.status === 200)) {
        setLoading(false);
        setModalSuccess(true);
        setTitleModal('สำเร็จ');
        setDetailModal(`${pageTitle}สำเร็จ`);
        setButtonLink(`/setting#pn01-select`);
        setButtonText('ตกลง');
        setOpenResponseModal(true);
      } else {
        handleSubmissionError();
      }
    } catch (error) {
      handleSubmissionError();
    }
  };

  return (
    <>
      <form className="py-2">
        <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
          <div className={`mb-6 grid gap-3 md:grid-cols-1`}>
            <label
              htmlFor="projectName"
              className={`block text-lg font-medium ${
                validationError.data ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              รายการทั้งหมด
            </label>
            <div className="relative overflow-x-auto">
              <table className="w-full rounded border text-left text-sm text-gray-500">
                <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      รายการ
                    </th>
                    <th scope="col" className="w-[15%] bg-gray-300 px-6 py-3">
                      เพิ่ม/ลบแถว
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataRows?.map((row, i) => (
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
                            size="small"
                            type="text"
                            name="name"
                            className="flex w-full"
                            placeholder=""
                            value={row.name}
                            onChange={(e) =>
                              handleDataChange(row.id, 'name', e.target.value)
                            }
                            error={Boolean(
                              validationArrayError['data_name']?.some(
                                (item) => item.id === row.id,
                              ),
                            )}
                            helperText={
                              validationArrayError['data_name']?.find(
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
                            onClick={addRow}
                          >
                            <PlusCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                        {dataRows.length > 1 && (
                          <Tooltip title="ลบแถว">
                            <IconButton
                              aria-label="delete_row"
                              size="small"
                              onClick={() => deleteRow(row.id)}
                              className='text-red-500'
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
          haveNextPage={modalNextPage}
        />

        <OverlayLoading showLoading={loading} />
      </div>
    </>
  );
}
