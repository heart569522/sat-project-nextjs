'use client';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button } from '@/app/components/buttons/button';
import { createData, updateData } from '@/app/lib/api-service';
import ModalQuestion from '@/app/components/modal/modal-question';
import ModalResponse from '@/app/components/modal/modal-response';
import { notFound, useRouter } from 'next/navigation';
import { OverlayLoading } from '@/app/components/loading-screen';
import { PN10, StudentList } from '@/app/model/pn10';

interface ValidationError {
  id: number;
  error: string;
}

interface ValidationErrors {
  [key: string]: ValidationError[];
}

export default function PN10EditForm({
  userId,
  editData,
  isAdminManage,
}: {
  userId?: string;
  editData?: PN10;
  isAdminManage?: boolean;
}) {
  console.log('🚀 ~ editData:', editData);
  // console.log("🚀 ~ editData:", editData)
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

  const handleOpenModal = (isCancel?: boolean, isSubmit?: boolean) => {
    console.log('handleOpenModal');

    if (isCancel) {
      setTitleModal('ยกเลิกการแก้ไข');
      setDetailModal(
        'คุณยืนยันที่จะยกเลิกการแก้ไขบันทึกการเข้าร่วมโครงการ/กิจกรรม',
      );
      setHandleAction('cancel');
      setOpenQuestionModal(true);
    }

    if (isSubmit) {
      const isFormValid = validateForm();

      if (isFormValid) {
        setTitleModal('แก้ไขข้อมูล');
        setDetailModal('คุณยืนยันที่แก้ไขบันทึกการเข้าร่วมโครงการ/กิจกรรม');
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

  const [formInput, setFormInput] = useState({
    projectCode: editData?.project_code,
    projectName: editData?.project_name,
    projectYear: editData?.project_year,
    projectHour: editData?.project_hour,
  });

  const [studentRows, setStudentRows] = useState<StudentList[]>(
    editData?.students ?? [],
  );

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

  const addStudentRow = () => {
    setStudentRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        Std: '',
        Name: '',
        remark: '',
      },
    ]);
  };

  const deleteStudentRow = (id: number) => {
    setStudentRows((prevRows: StudentList[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`student_`) &&
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

  const handleStudentChange = (id: number, field: string, value: string) => {
    setStudentRows(
      (prevRows) =>
        prevRows?.map((row) =>
          row.id === id ? { ...row, [field]: value } : row,
        ),
    );

    setValidationArrayError((prevErrors) => {
      const key = `student_${field}`;
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
    const excludedFields = ['projectHour'];

    console.log('--validateForm--');

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
            [key]: `โปรดกรอกข้อมูล`,
          }));

          console.error(`${key} is required.`);
        }
      }
    }

    // Validate Table arrays
    const studentFields = ['Std', 'Name'];
    const isStudentValid = validateArray(
      studentRows as StudentList[],
      studentFields,
      'student',
    );

    isValid = isStudentValid && /* Add other validations here */ isValid;

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

    console.log('handleSubmit');

    const formData = setFinalFormData();
    console.log('formData: ', formData);

    try {
      const response = await updateData(
        'attendance',
        formData,
        editData?.id as string,
      );

      if (response && (response.status === 201 || response.status === 200)) {
        setLoading(false);
        setModalSuccess(true);
        setTitleModal('สำเร็จ');
        setDetailModal('แก้ไขบันทึกการเข้าร่วมโครงการ/กิจกรรมสำเร็จ');
        setButtonLink(
          isAdminManage
            ? `/management/pn10/document/${editData?.id}`
            : `/activity-record/document/${editData?.id}`,
        );
        setButtonText('ไปยังเอกสารเอกสาร พน.10');
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
      projectCode: formInput.projectCode,
      projectName: formInput.projectName,
      projectYear: formInput.projectYear,
      projectHour: formInput.projectHour,
      studentRows: studentRows,
    };

    return finalFormData;
  };

  return (
    <>
      <form className="py-2">
        <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
          <div className={`mb-6 grid gap-6 md:grid-cols-2`}>
            <div>
              <label
                htmlFor="projectCode"
                className={`mb-2 block text-lg font-medium ${
                  validationError.projectCode ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                รหัสโครงการ
              </label>
              <TextField
                size="small"
                type="text"
                name="projectCode"
                className="flex w-full"
                value={formInput.projectCode}
                onChange={handleInputChange}
                placeholder=""
                error={Boolean(validationError.projectCode)}
                helperText={validationError.projectCode}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="projectName"
                className={`mb-2 block text-lg font-medium ${
                  validationError.projectName ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                โครงการ/กิจกรรม
              </label>
              <TextField
                size="small"
                type="text"
                name="projectName"
                className="flex w-full"
                value={formInput.projectName}
                onChange={handleInputChange}
                placeholder=""
                error={Boolean(validationError.projectName)}
                helperText={validationError.projectName}
                disabled
              />
            </div>
          </div>
          <div className={`mb-6 grid gap-6 md:grid-cols-2`}>
            <div>
              <label
                htmlFor="projectYear"
                className={`mb-2 block text-lg font-medium ${
                  validationError.projectYear ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                ปีการศึกษา
              </label>
              <TextField
                size="small"
                type="number"
                name="projectYear"
                className="flex w-full"
                value={formInput.projectYear}
                onChange={handleInputChange}
                placeholder=""
                error={Boolean(validationError.projectYear)}
                helperText={validationError.projectYear}
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="projectHour"
                className={`mb-2 block text-lg font-medium ${
                  validationError.projectHour ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                จำนวนชั่วโมง
              </label>
              <div className="flex items-center gap-3">
                <TextField
                  size="small"
                  type="text"
                  name="projectHour"
                  className="flex w-full"
                  value={formInput.projectHour}
                  onChange={handleInputChange}
                  placeholder=""
                  error={Boolean(validationError.projectHour)}
                  helperText={validationError.projectHour}
                  disabled={!isAdminManage}
                />
                <p className="text-lg">ชั่วโมง</p>
              </div>
            </div>
          </div>
          <div className={`mb-6 grid gap-3 md:grid-cols-1`}>
            <label
              htmlFor="projectName"
              className={`block text-lg font-medium ${
                validationError.students ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              รายการนักศึกษา
            </label>
            <div className="relative overflow-x-auto">
              <table className="w-full rounded border text-left text-sm text-gray-500">
                <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="w-[25%] px-6 py-3">
                      รหัสนักศึกษา
                    </th>
                    <th scope="col" className="bg-gray-300 px-6 py-3">
                      ชื่อ - สกุล
                    </th>
                    <th scope="col" className="w-[20%] px-6 py-3">
                      หมายเหตุ
                    </th>
                    <th scope="col" className="w-[15%] bg-gray-300 px-6 py-3">
                      เพิ่ม/ลบแถว
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentRows?.map((row, i) => (
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
                            name="Std"
                            className="flex w-full"
                            placeholder=""
                            value={row.Std}
                            onChange={(e) =>
                              handleStudentChange(row.id, 'Std', e.target.value)
                            }
                            error={Boolean(
                              validationArrayError['student_Std']?.some(
                                (item) => item.id === row.id,
                              ),
                            )}
                            helperText={
                              validationArrayError['student_Std']?.find(
                                (item) => item.id === row.id,
                              )?.error || ''
                            }
                          />
                        </div>
                      </td>
                      <td className="bg-gray-50 px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            size="small"
                            type="text"
                            name="Name"
                            className="flex w-full"
                            placeholder=""
                            value={row.Name}
                            onChange={(e) =>
                              handleStudentChange(
                                row.id,
                                'Name',
                                e.target.value,
                              )
                            }
                            error={Boolean(
                              validationArrayError['student_Name']?.some(
                                (item) => item.id === row.id,
                              ),
                            )}
                            helperText={
                              validationArrayError['student_Name']?.find(
                                (item) => item.id === row.id,
                              )?.error || ''
                            }
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            size="small"
                            type="text"
                            name="remark"
                            className="flex w-full"
                            placeholder=""
                            value={row.remark}
                            onChange={(e) =>
                              handleStudentChange(
                                row.id,
                                'remark',
                                e.target.value,
                              )
                            }
                            error={Boolean(
                              validationArrayError['student_remark']?.some(
                                (item) => item.id === row.id,
                              ),
                            )}
                            helperText={
                              validationArrayError['student_remark']?.find(
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
                            onClick={addStudentRow}
                          >
                            <PlusCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                        {studentRows.length > 1 && (
                          <Tooltip title="ลบแถว">
                            <IconButton
                              aria-label="delete_row"
                              size="small"
                              onClick={() => deleteStudentRow(row.id)}
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
              router.push(
                isAdminManage ? '/management/pn10' : '/activity-record',
                { scroll: false },
              );
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
