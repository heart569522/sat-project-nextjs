'use client';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Tooltip,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField, DateTimeField, TimeField } from '@mui/x-date-pickers';
import { PN01 } from '@/app/model/pn01';

export default function PN01Form() {
  const [formData, setFormData] = useState<PN01>();

  const [formInput, setFormInput] = useState({
    faculty: '',
    projectName: '',
    projectHead: '',
    projectHeadPhone: '',
    principleReason: '',
    projectLocation: '',
    projectDatetime: null,
    lecturer: '',
    improvement: '',
  });

  const [selectedValues, setSelectedValues] = useState({
    strategicIssue: '',
    objective: '',
    universityStrategic: '',
    strategicPlanKPI: '',
    operationPlanKPI: '',
    projectKPI: '',
    projectStatus: '',
  });

  const [responsibleRows, setResponsibleRows] = useState([
    { id: 1, firstname: '', lastname: '', position: '', work: '' },
  ]);

  const [OIVTRows, setOIVTRows] = useState([
    { id: 1, objective: '', indicator: '', value: '', tool: '' },
  ]);

  const [expectedResultRows, setExpectedResultRows] = useState([
    { id: 1, expected_result: '' },
  ]);

  const [operationDurationRows, setOperationDurationRows] = useState([
    { id: 1, operation_duration: '' },
  ]);

  const [projectScheduleRows, setProjectScheduleRows] = useState([
    { id: 1, date: null, time: null, detail: '' },
  ]);

  const [targetTotal, setTargetTotal] = useState('');
  const [targetRows, setTargetRows] = useState([
    { id: 1, detail: '', count: '' },
  ]);

  const [budgetIncomeTotal, setBudgetIncomeTotal] = useState('');
  const [budgetIncomeRows, setBudgetIncomeRows] = useState([
    { id: 1, detail: '', amount: '', source: '' },
  ]);

  const [budgetExpenseTotal, setBudgetExpenseTotal] = useState('');
  const [budgetExpenseRows, setBudgetExpenseRows] = useState([
    { id: 1, detail: '', amount: '', note: '' },
  ]);

  const [projectTypes, setProjectTypes] = useState({
    maintenance: false,
    academicService: false,
    knowledgeManagement: false,
    researchPromotion: false,
    educationQualityAssurance: false,
    personnelDevelopment: false,
    riskManagement: false,
    studentDevelopment: false,
    moralEthical: false,
    academicPromotion: false,
    knowledge: false,
    environment: false,
    intellectualSkill: false,
    sport: false,
    knowledgeAnalysisCommunicationTechnology: false,
    artCultureDevelopment: false,
    numericalAnalysisCommunicationTechnology: false,
    moralEthicalDevelopment: false,
    leadershipDevelopment: false,
    subOther: false,
    subOtherDetail: '',
    other: false,
    otherDetail: '',
  });

  const [universityIndentity, setUniversityIndentity] = useState({
    moral: false,
    serve: false,
    academic: false,
    develop: false,
  });

  const isSubOtherDisabled =
    !projectTypes.studentDevelopment || !projectTypes.subOther;
  const isOtherDisabled = !projectTypes.other;
  const isStudentDevelopmentDisabled = !projectTypes.studentDevelopment;

  const checkDisableCheckBox = () => {
    // console.log("--check---");

    if (isSubOtherDisabled) {
      setProjectTypes((prevTypes) => ({
        ...prevTypes,
        subOtherDetail: '',
      }));
    }
    if (isOtherDisabled) {
      setProjectTypes((prevTypes) => ({
        ...prevTypes,
        otherDetail: '',
      }));
    }
    if (isStudentDevelopmentDisabled) {
      setProjectTypes((prevTypes) => ({
        ...prevTypes,
        intellectualSkill: false,
        academicPromotion: false,
        artCultureDevelopment: false,
        environment: false,
        knowledge: false,
        knowledgeAnalysisCommunicationTechnology: false,
        leadershipDevelopment: false,
        moralEthical: false,
        moralEthicalDevelopment: false,
        numericalAnalysisCommunicationTechnology: false,
        sport: false,
        subOther: false,
      }));
    }
  };

  const handleProjectTypeChange = (event: {
    target: { name: string; checked: boolean; value: string };
  }) => {
    const { name, checked, value } = event.target;

    setProjectTypes((prevTypes) => ({
      ...prevTypes,
      [name]:
        name == 'otherDetail' || name == 'subOtherDetail' ? value : checked,
    }));
  };

  const handleUniversityIndentityChange = (event: {
    target: { name: string; checked: boolean };
  }) => {
    const { name, checked } = event.target;

    setUniversityIndentity((prevTypes) => ({
      ...prevTypes,
      [name]: checked,
    }));
  };

  useEffect(() => {
    checkDisableCheckBox();
  }, [isSubOtherDisabled, isOtherDisabled, isStudentDevelopmentDisabled]);

  // console.log(universityIndentity);
  const handleInputChange = (event: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = event.target;

    setFormInput((prevTypes) => ({
      ...prevTypes,
      [name]:
        name === 'projectDatetime'
          ? value
            ? new Date(value)
            : ''
          : value || '',
    }));
  };

  const handleSelectChange = (event: any) => {
    const { value, name } = event.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const addResponsibleRow = () => {
    setResponsibleRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        firstname: '',
        lastname: '',
        position: '',
        work: '',
      },
    ]);
  };

  const addOIVTRow = () => {
    setOIVTRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        objective: '',
        indicator: '',
        value: '',
        tool: '',
      },
    ]);
  };

  const addExpectedResultRow = () => {
    setExpectedResultRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, expected_result: '' },
    ]);
  };

  const addOperationDurationRow = () => {
    setOperationDurationRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, operation_duration: '' },
    ]);
  };

  const addProjectScheduleRow = () => {
    setProjectScheduleRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, date: null, time: null, detail: '' },
    ]);
  };

  const addTargetRow = () => {
    setTargetRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, detail: '', count: '' },
    ]);
  };

  const addBudgetIncomeRow = () => {
    setBudgetIncomeRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, detail: '', amount: '', source: '' },
    ]);
  };

  const addBudgetExpenseRow = () => {
    setBudgetExpenseRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, detail: '', amount: '', note: '' },
    ]);
  };

  const deleteResponsibleRow = (id: number) => {
    setResponsibleRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteOIVTRow = (id: number) => {
    setOIVTRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteExpectedResultRow = (id: number) => {
    setExpectedResultRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteOperationDurationRow = (id: number) => {
    setOperationDurationRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteProjectScheduleRow = (id: number) => {
    setProjectScheduleRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteTargetRow = (id: number) => {
    setTargetRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteBudgetIncomeRow = (id: number) => {
    setBudgetIncomeRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const deleteBudgetExpenseRow = (id: number) => {
    setBudgetExpenseRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      return updatedRowsWithSequentialIds;
    });
  };

  const handleResponsibleChange = (
    id: number,
    field: string,
    value: string,
  ) => {
    setResponsibleRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleOIVTChange = (id: number, field: string, value: string) => {
    setOIVTRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleExpectedResultChange = (id: number, value: string) => {
    setExpectedResultRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, expected_result: value } : row,
      ),
    );
  };

  const handleOperationDurationChange = (id: number, value: string) => {
    setOperationDurationRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, operation_duration: value } : row,
      ),
    );
  };

  const handleProjectScheduleChange = (id: number, event: any) => {
    const { name, value } = event.target;

    setProjectScheduleRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [name]: name === 'detail' ? value : new Date(value),
            }
          : row,
      ),
    );
  };

  const handleTargetChange = (id: number, field: string, value: string) => {
    setTargetRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, [field]: field == 'detail' ? value : Number(value) }
          : row,
      ),
    );
  };

  const handleBudgetIncomeChange = (
    id: number,
    field: string,
    value: string,
  ) => {
    setBudgetIncomeRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: field == 'detail' || 'source' ? value : Number(value),
            }
          : row,
      ),
    );
  };

  const handleBudgetExpenseChange = (
    id: number,
    field: string,
    value: string,
  ) => {
    setBudgetExpenseRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: field == 'detail' || 'note' ? value : Number(value),
            }
          : row,
      ),
    );
  };

  const calculateTargetTotal = () => {
    const total = targetRows.reduce((acc, row) => acc + Number(row.count), 0);
    setTargetTotal(total.toLocaleString());
  };

  const calculateBudgetIncomeTotal = () => {
    const total = budgetIncomeRows.reduce(
      (acc, row) => acc + Number(row.amount),
      0,
    );
    setBudgetIncomeTotal(total.toLocaleString());
  };

  const calculateBudgetExpenseTotal = () => {
    const total = budgetExpenseRows.reduce(
      (acc, row) => acc + Number(row.amount),
      0,
    );
    setBudgetExpenseTotal(total.toLocaleString());
  };

  useEffect(() => {
    calculateTargetTotal();
  }, [targetRows]);

  useEffect(() => {
    calculateBudgetIncomeTotal();
  }, [budgetIncomeRows]);

  useEffect(() => {
    calculateBudgetExpenseTotal();
  }, [budgetExpenseRows]);

  const formatDateToISO = (dateTime: Date | null): string | null => {
    if (dateTime instanceof Date) {
      return dateTime.toISOString();
    } else {
      return null; // or handle the case when dateTime is not a Date
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const finalFormData = setFinalFormData();
    // setFormData(finalFormData)

    console.log(finalFormData);
  };

  const setFinalFormData = () => {
    console.log('--set form--');

    const formattedProjectScheduleRows = projectScheduleRows.map((row) => ({
      ...row,
      date: formatDateToISO(row.date),
      time: formatDateToISO(row.time),
    }));

    const finalFormData: PN01 = {
      faculty: formInput.faculty,
      projectName: formInput.projectName,
      projectHead: formInput.projectHead,
      projectHeadPhone: formInput.projectHeadPhone,
      principleReason: formInput.principleReason,
      projectLocation: formInput.projectLocation,
      projectDatetime: formatDateToISO(formInput.projectDatetime),
      lecturer: formInput.lecturer,
      improvement: formInput.improvement,
      strategicIssue: selectedValues.strategicIssue,
      objective: selectedValues.objective,
      universityStrategic: selectedValues.universityStrategic,
      strategicPlanKPI: selectedValues.strategicPlanKPI,
      operationPlanKPI: selectedValues.operationPlanKPI,
      projectKPI: selectedValues.projectKPI,
      projectStatus: selectedValues.projectStatus,
      responsibleRows: responsibleRows,
      OIVTRows: OIVTRows,
      expectedResultRows: expectedResultRows,
      operationDurationRows: operationDurationRows,
      projectScheduleRows: formattedProjectScheduleRows,
      targetTotal: targetTotal,
      targetRows: targetRows,
      budgetIncomeTotal: budgetIncomeTotal,
      budgetIncomeRows: budgetIncomeRows,
      budgetExpenseTotal: budgetExpenseTotal,
      budgetExpenseRows: budgetExpenseRows,
      projectTypes: projectTypes,
      universityIndentity: universityIndentity,
    };

    return finalFormData;
  };

  return (
    <form onSubmit={handleSubmit} className="py-2">
      <div className={`mb-0 grid gap-6 md:grid-cols-2`}>
        <div>
          <label htmlFor="faculty" className="mb-2 block text-base font-medium">
            1.ชื่อคณะ/วิทยาลัย/หน่วยงาน
          </label>
          <TextField
            type="text"
            name="faculty"
            className="flex w-full"
            value={formInput.faculty}
            onChange={handleInputChange}
            placeholder=""
            // required
          />
        </div>
        <div>
          <label
            htmlFor="projectName"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            2.ชื่อโครงการ
          </label>
          <TextField
            type="text"
            name="projectName"
            className="flex w-full"
            value={formInput.projectName}
            onChange={handleInputChange}
            placeholder=""
            // required
          />
        </div>
        <div>
          <label
            htmlFor="projectHead"
            className="mb-2 block text-base font-medium text-gray-900 "
          >
            3.ผู้ดำเนินการ/ผู้รับผิดชอบโครงการ
          </label>
          <TextField
            type="text"
            name="projectHead"
            className="flex w-full"
            value={formInput.projectHead}
            onChange={handleInputChange}
            placeholder=""
            // required
          />
        </div>
        <div>
          <label
            htmlFor="projectHeadPhone"
            className="mb-2 block text-base font-medium text-gray-900 "
          >
            หมายเลขโทรศัพท์
          </label>
          <TextField
            type="text"
            name="projectHeadPhone"
            className="flex w-full"
            value={formInput.projectHeadPhone}
            onChange={handleInputChange}
            placeholder=""
            // required
          />
        </div>
        <div></div>
      </div>
      <div className={`mb-6 grid gap-6 md:grid-cols-1`}>
        <div className="relative overflow-x-auto">
          <table className="w-full rounded border text-left text-sm text-gray-500">
            <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
              <tr>
                <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                  ลำดับที่
                </th>
                <th scope="col" className="px-6 py-3">
                  ชื่อ - สกุล
                </th>
                <th scope="col" className="w-[15%] bg-gray-300 px-6 py-3">
                  ตำแหน่งโครงการ
                </th>
                <th scope="col" className="w-[15%] px-6 py-3">
                  ภาระงาน (ภารกิจ/สัปดาห์)
                </th>
                <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                  เพิ่ม/ลบแถว
                </th>
              </tr>
            </thead>
            <tbody>
              {responsibleRows.map((row) => (
                <tr className="border-b bg-white" key={row.id}>
                  <th
                    scope="row"
                    className="bg-gray-50 px-6 py-4 text-center text-lg font-medium"
                  >
                    {row.id}
                  </th>
                  <td className="px-6 py-4">
                    <div className={`grid grid-cols-2 gap-6`}>
                      <TextField
                        type="text"
                        id="res_firstname"
                        className="flex w-full"
                        placeholder=""
                        value={row.firstname}
                        onChange={(e) =>
                          handleResponsibleChange(
                            row.id,
                            'firstname',
                            e.target.value,
                          )
                        }
                        // required
                      />
                      <TextField
                        type="text"
                        id="res_lastname"
                        className="flex w-full"
                        placeholder=""
                        value={row.lastname}
                        onChange={(e) =>
                          handleResponsibleChange(
                            row.id,
                            'lastname',
                            e.target.value,
                          )
                        }
                        // required
                      />
                    </div>
                  </td>
                  <td className="bg-gray-50 px-6 py-4">
                    <div className={`grid grid-cols-1 gap-6`}>
                      <TextField
                        type="text"
                        id="res_position"
                        className="flex w-full"
                        placeholder=""
                        value={row.position}
                        onChange={(e) =>
                          handleResponsibleChange(
                            row.id,
                            'position',
                            e.target.value,
                          )
                        }
                        // required
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`grid grid-cols-1 gap-6`}>
                      <TextField
                        type="text"
                        id="res_work"
                        className="flex w-full"
                        placeholder=""
                        value={row.work}
                        onChange={(e) =>
                          handleResponsibleChange(
                            row.id,
                            'work',
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </td>
                  <td className="flex items-center justify-center bg-gray-50 px-6 py-4">
                    <Tooltip title="เพิ่มแถว">
                      <IconButton
                        aria-label="add_row"
                        size="small"
                        onClick={addResponsibleRow}
                      >
                        <PlusCircleIcon className="h-9 w-9" />
                      </IconButton>
                    </Tooltip>
                    {responsibleRows.length > 1 && (
                      <Tooltip title="ลบแถว">
                        <IconButton
                          aria-label="delete_row"
                          size="small"
                          onClick={() => deleteResponsibleRow(row.id)}
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
      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        4.ความสอดคล้องกับยุทธศาสตร์ของคณะวิชา/มหาวิทยาลัยพายัพ
      </h3>
      <div className="mb-6 grid gap-x-6 gap-y-3 md:grid-cols-2">
        <div>
          <label
            htmlFor="strategicIssue"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            4.1 ประเด็นยุทธศาสตร์ที่
          </label>
          <select
            name="strategicIssue"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={selectedValues.strategicIssue}
            onChange={handleSelectChange}
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="objectivev"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            4.2 เป้าประสงค์ที่
          </label>
          <select
            name="objective"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={selectedValues.objective}
            onChange={handleSelectChange}
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="universityStrategic"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            4.3 กลยุทธ์ระดับมหาวิทยาลัยที่
          </label>
          <select
            name="universityStrategic"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={selectedValues.universityStrategic}
            onChange={handleSelectChange}
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="strategicPlanKPI"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            4.4 ตัวชี้วัดแผนกลยุทธ์ที่
          </label>
          <select
            name="strategicPlanKPI"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={selectedValues.strategicPlanKPI}
            onChange={handleSelectChange}
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="operationPlanKPI"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            4.5 ตัวชี้วัดแผนปฏิบัติการที่
          </label>
          <select
            name="operationPlanKPI"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={selectedValues.operationPlanKPI}
            onChange={handleSelectChange}
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="projectKPI"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            4.6 ตัวชี้วัดโครงการ
          </label>
          <select
            name="projectKPI"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={selectedValues.projectKPI}
            onChange={handleSelectChange}
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="projectStatus"
            className="mb-2 block text-base font-medium text-gray-900"
          >
            4.7 สถานะโครงการ
          </label>
          <select
            name="projectStatus"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={selectedValues.projectStatus}
            onChange={handleSelectChange}
          >
            <option value="">Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
      </div>
      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        5.ประเภทโครงการ
      </h3>
      <div className="mb-6">
        <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="maintenance"
              type="checkbox"
              checked={projectTypes.maintenance}
              onChange={handleProjectTypeChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="maintenance"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              แผนทำนุบำรุงศิลปวัฒนธรรม
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="academicService"
              type="checkbox"
              checked={projectTypes.academicService}
              onChange={handleProjectTypeChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="academicService"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              แผนบริการวิชาการ
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="knowledgeManagement"
              type="checkbox"
              checked={projectTypes.knowledgeManagement}
              onChange={handleProjectTypeChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="knowledgeManagement"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              แผนการจัดการความรู้
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="researchPromotion"
              type="checkbox"
              checked={projectTypes.researchPromotion}
              onChange={handleProjectTypeChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="researchPromotion"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              แผนการส่งเสริมงานวิจัย
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="educationQualityAssurance"
              type="checkbox"
              checked={projectTypes.educationQualityAssurance}
              onChange={handleProjectTypeChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="educationQualityAssurance"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              แผนการประกันคุณภาพการศึกษา
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="personnelDevelopment"
              type="checkbox"
              checked={projectTypes.personnelDevelopment}
              onChange={handleProjectTypeChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="personnelDevelopment"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              แผนพัฒนาบุคลากร
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="riskManagement"
              type="checkbox"
              checked={projectTypes.riskManagement}
              onChange={handleProjectTypeChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="riskManagement"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              แผนบริหารความเสี่ยง
            </label>
          </div>
        </div>
        <div className="my-3 rounded border border-gray-200">
          <div className="grid gap-x-6 gap-y-3 md:grid-cols-1">
            <div className="flex items-center ps-4">
              <input
                name="studentDevelopment"
                type="checkbox"
                checked={projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="studentDevelopment"
                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
              >
                แผนพัฒนานักศึกษาตามกรอบมาตรฐานคุณวุฒิ และกิจกรรมพัฒนานักศึกษา{' '}
                <b>(เลือกได้มากกว่า 1 ประเภท)</b>
              </label>
            </div>
          </div>
          <div
            className={`${
              !projectTypes.studentDevelopment
                ? 'bg-gray-100 text-gray-400'
                : 'text-gray-900'
            } grid gap-x-6 gap-y-0 px-2 pb-2 pt-0 md:grid-cols-2`}
          >
            <div className="flex items-center ps-4">
              <input
                name="moralEthical"
                type="checkbox"
                checked={
                  projectTypes.moralEthical && projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="moralEthical"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                ด้านคุณธรรม จริยธรรม
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="academicPromotion"
                type="checkbox"
                checked={
                  projectTypes.academicPromotion &&
                  projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="academicPromotion"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                กิจกรรมด้านวิชาการที่ส่งเสริมคุณลักษณะที่พึงประสงค์
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="knowledge"
                type="checkbox"
                checked={
                  projectTypes.knowledge && projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="knowledge"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                ด้านความรู้
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="environment"
                type="checkbox"
                checked={
                  projectTypes.environment && projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="environment"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                กิจกรรมบำเพ็ญประโยชน์หรือรักษาสิ่งแวดล้อม
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="intellectualSkill"
                type="checkbox"
                checked={
                  projectTypes.intellectualSkill &&
                  projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="intellectualSkill"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                ด้านทักษะทางปัญญา
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="sport"
                type="checkbox"
                checked={projectTypes.sport && projectTypes.studentDevelopment}
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="sport"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                กิจกรรมกีฬา และการส่งเสริมสุขภาพ
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="knowledgeAnalysisCommunicationTechnology"
                type="checkbox"
                checked={
                  projectTypes.knowledgeAnalysisCommunicationTechnology &&
                  projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="knowledgeAnalysisCommunicationTechnology"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                ด้านทักษะด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="artCultureDevelopment"
                type="checkbox"
                checked={
                  projectTypes.artCultureDevelopment &&
                  projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="artCultureDevelopment"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                กิจกรรมส่งเสริมศิลปะและวัฒนธรรม
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="numericalAnalysisCommunicationTechnology"
                type="checkbox"
                checked={
                  projectTypes.numericalAnalysisCommunicationTechnology &&
                  projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="numericalAnalysisCommunicationTechnology"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร และการใช้เทคโนโลยี
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="moralEthicalDevelopment"
                type="checkbox"
                checked={
                  projectTypes.moralEthicalDevelopment &&
                  projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="moralEthicalDevelopment"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                กิจกรรมเสริมสร้างคุณธรรม จริยธรรม
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                name="leadershipDevelopment"
                type="checkbox"
                checked={
                  projectTypes.leadershipDevelopment &&
                  projectTypes.studentDevelopment
                }
                disabled={!projectTypes.studentDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="leadershipDevelopment"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                กิจกรรมส่งเสริมพัฒนาทักษะชีวิตความเป็นผู้นำ
              </label>
            </div>
            <div className="ps-4">
              <div className="flex items-center">
                <input
                  name="subOther"
                  type="checkbox"
                  checked={
                    projectTypes.subOther && projectTypes.studentDevelopment
                  }
                  disabled={!projectTypes.studentDevelopment}
                  onChange={handleProjectTypeChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="subOther"
                  className="ms-2 py-4 text-sm font-medium"
                >
                  อื่นๆ
                </label>
                {projectTypes.subOther && projectTypes.studentDevelopment ? (
                  <div className="w-full border-b border-gray-300 px-2">
                    <input
                      type="text"
                      name="subOtherDetail"
                      className="flex w-full border-none "
                      placeholder="โปรดระบุ"
                      value={projectTypes.subOtherDetail || ''}
                      onChange={handleProjectTypeChange}
                      disabled={isSubOtherDisabled}
                      required={isSubOtherDisabled}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
          <div className="rounded border border-gray-200 ps-4">
            <div className="flex items-center">
              <input
                name="other"
                type="checkbox"
                checked={projectTypes.other}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="other"
                className="ms-2 py-4 text-sm font-medium text-gray-900"
              >
                อื่นๆ
              </label>
              {projectTypes.other ? (
                <div className="w-full border-b border-gray-300 pl-2 pr-4">
                  <input
                    type="text"
                    name="otherDetail"
                    className="flex w-full border-none"
                    placeholder="โปรดระบุ"
                    value={projectTypes.otherDetail || ''}
                    onChange={handleProjectTypeChange}
                    disabled={isOtherDisabled}
                    required={isOtherDisabled}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        6.การตอบสนองต่อคุณลักษณะของบัณฑิตที่พึงประสงค์/อัตลักษณ์ของมหาวิทยาลัยพายัพ
      </h3>
      <div className="mb-6">
        <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="moral"
              type="checkbox"
              checked={universityIndentity.moral}
              onChange={handleUniversityIndentityChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="bordered-checkbox-1"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              คุณธรรมนำใจ
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="serve"
              type="checkbox"
              checked={universityIndentity.serve}
              onChange={handleUniversityIndentityChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="bordered-checkbox-1"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              รับใช้สังคม
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="academic"
              type="checkbox"
              checked={universityIndentity.academic}
              onChange={handleUniversityIndentityChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="bordered-checkbox-1"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              วิชาการก้าวหน้า
            </label>
          </div>
          <div className="flex items-center rounded border border-gray-200 ps-4">
            <input
              name="develop"
              type="checkbox"
              checked={universityIndentity.develop}
              onChange={handleUniversityIndentityChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="bordered-checkbox-1"
              className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
            >
              พัฒนาสู่สากล
            </label>
          </div>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        7.หลักการและเหตุผล
      </h3>
      <div className="mb-6">
        <div className="grid gap-6 md:grid-cols-1">
          <textarea
            name="principleReason"
            rows={4}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder=""
            value={formInput.principleReason}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        8.วัตถุประสงค์ ตัวชี้วัด ค่าเป้าหมาย/เกณฑ์ความสำเร็จ และ
        เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
      </h3>
      <div className="mb-6">
        <div className="grid gap-6 md:grid-cols-1">
          <div className="relative overflow-x-auto">
            <table className="w-full rounded border text-left text-sm text-gray-500">
              <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                <tr>
                  <th scope="col" className="bg-gray-300 px-6 py-3">
                    วัตถุประสงค์โครงการ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ตัวชี้วัด
                  </th>
                  <th scope="col" className="bg-gray-300 px-6 py-3">
                    เป้าหมาย (เกณฑ์ความสำเร็จ)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
                  </th>
                  <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                    เพิ่ม/ลบแถว
                  </th>
                </tr>
              </thead>
              <tbody>
                {OIVTRows.map((row) => (
                  <tr className="border-b bg-white" key={row.id}>
                    <td className="bg-gray-50 px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          type="text"
                          id="oivt_objective"
                          className="flex w-full"
                          placeholder=""
                          value={row.objective}
                          onChange={(e) =>
                            handleOIVTChange(
                              row.id,
                              'objective',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          type="text"
                          id="oivt_indicator"
                          className="flex w-full"
                          placeholder=""
                          value={row.indicator}
                          onChange={(e) =>
                            handleOIVTChange(
                              row.id,
                              'indicator',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="bg-gray-50 px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          type="text"
                          id="oivt_value"
                          className="flex w-full"
                          placeholder=""
                          value={row.value}
                          onChange={(e) =>
                            handleOIVTChange(row.id, 'value', e.target.value)
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          type="text"
                          id="oivt_tool"
                          className="flex w-full"
                          placeholder=""
                          value={row.tool}
                          onChange={(e) =>
                            handleOIVTChange(row.id, 'tool', e.target.value)
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="flex items-center justify-center bg-gray-50 px-6 py-4">
                      <Tooltip title="เพิ่มแถว">
                        <IconButton
                          aria-label="add_row"
                          size="small"
                          onClick={addOIVTRow}
                        >
                          <PlusCircleIcon className="h-9 w-9" />
                        </IconButton>
                      </Tooltip>
                      {OIVTRows.length > 1 && (
                        <Tooltip title="ลบแถว">
                          <IconButton
                            aria-label="delete_row"
                            size="small"
                            onClick={() => deleteOIVTRow(row.id)}
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

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        9.ประโยชน์ที่คาดว่าจะได้รับ
      </h3>
      <div className="mb-6">
        <div className="grid gap-6 md:grid-cols-1">
          <table className="w-full rounded border text-left text-sm text-gray-500">
            <tbody>
              {expectedResultRows.map((row) => (
                <tr className="border-b bg-white" key={row.id}>
                  <td className="w-[10%] bg-gray-50 px-6 py-4 text-center text-base">
                    {row.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`grid grid-cols-1 gap-6`}>
                      <TextField
                        type="text"
                        id="expected_result"
                        className="flex w-full"
                        placeholder=""
                        value={row.expected_result}
                        onChange={(e) =>
                          handleExpectedResultChange(row.id, e.target.value)
                        }
                        // required
                      />
                    </div>
                  </td>
                  <td className="w-[10%] bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-center">
                      <Tooltip title="เพิ่มแถว">
                        <IconButton
                          aria-label="add_row"
                          size="small"
                          onClick={addExpectedResultRow}
                        >
                          <PlusCircleIcon className="h-9 w-9" />
                        </IconButton>
                      </Tooltip>
                      {expectedResultRows.length > 1 && (
                        <Tooltip title="ลบแถว">
                          <IconButton
                            aria-label="delete_row"
                            size="small"
                            onClick={() => deleteExpectedResultRow(row.id)}
                          >
                            <XCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        10.วิธีดำเนินงานและระยะเวลาดำเนินโครงการ
      </h3>
      <div className="mb-6">
        <div className="grid gap-6 md:grid-cols-1">
          <table className="w-full rounded border text-left text-sm text-gray-500">
            <tbody>
              {operationDurationRows.map((row) => (
                <tr className="border-b bg-white" key={row.id}>
                  <td className="w-[10%] bg-gray-50 px-6 py-4 text-center text-base">
                    {row.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`grid grid-cols-1 gap-6`}>
                      <TextField
                        type="text"
                        id="operation_duration"
                        className="flex w-full"
                        placeholder=""
                        value={row.operation_duration}
                        onChange={(e) =>
                          handleOperationDurationChange(row.id, e.target.value)
                        }
                        // required
                      />
                    </div>
                  </td>
                  <td className="w-[10%] bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-center">
                      <Tooltip title="เพิ่มแถว">
                        <IconButton
                          aria-label="add_row"
                          size="small"
                          onClick={addOperationDurationRow}
                        >
                          <PlusCircleIcon className="h-9 w-9" />
                        </IconButton>
                      </Tooltip>
                      {operationDurationRows.length > 1 && (
                        <Tooltip title="ลบแถว">
                          <IconButton
                            aria-label="delete_row"
                            size="small"
                            onClick={() => deleteOperationDurationRow(row.id)}
                          >
                            <XCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        11.สถานที่จัดโครงการและกำหนดการ
      </h3>
      <div>
        <div className="mb-3 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="projectLocation"
              className="mb-2 block text-base font-medium text-gray-900"
            >
              11.1 สถานที่จัดโครงการ
            </label>
            <TextField
              type="text"
              name="projectLocation"
              className="flex w-full"
              value={formInput.projectLocation}
              onChange={handleInputChange}
              placeholder=""
              // required
            />
          </div>
          <div>
            <label
              htmlFor="project_datetime"
              className="mb-2 block text-base font-medium text-gray-900"
            >
              <p className="flex items-center gap-1">
                11.2 วัน/เวลา ที่จัดโครงการ
                <Tooltip
                  title="รูปแบบ วัน/เดือน/ปี(ค.ศ.) เวลา 24 ชั่วโมง"
                  placement="top"
                  arrow
                >
                  <HelpIcon className="h-5 w-5 text-gray-500" />
                </Tooltip>
              </p>
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimeField
                ampm={false}
                className="w-full text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={formInput.projectDatetime || null}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: 'projectDatetime', value },
                  })
                }
                format="DD/MM/YYYY HH:mm"
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-1">
          <div>
            <label
              htmlFor="countries"
              className="mb-2 block text-base font-medium text-gray-900"
            >
              11.3 กำหนดการ (โดยละเอียด)
            </label>
            <div className="mb-6">
              <div className="grid gap-6 md:grid-cols-1">
                <div className="relative overflow-x-auto">
                  <table className="w-full rounded border text-left text-sm text-gray-500">
                    <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                      <tr>
                        <th scope="col" className="w-[15%] px-6 py-3">
                          <p className="flex items-center justify-center gap-1">
                            วันที่
                            <Tooltip
                              title="รูปแบบ วัน/เดือน/ปี(ค.ศ.)"
                              placement="top"
                              arrow
                            >
                              <HelpIcon className="h-5 w-5 text-gray-500" />
                            </Tooltip>
                          </p>
                        </th>
                        <th
                          scope="col"
                          className="w-[15%] bg-gray-300 px-6 py-3"
                        >
                          <p className="flex items-center justify-center gap-1">
                            เวลา
                            <Tooltip
                              title="รูปแบบ 24 ชั่วโมง"
                              placement="top"
                              arrow
                            >
                              <HelpIcon className="h-5 w-5 text-gray-500" />
                            </Tooltip>
                          </p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          รายการกิจกรรม
                        </th>
                        <th
                          scope="col"
                          className="w-[10%] bg-gray-300 px-6 py-3"
                        >
                          เพิ่ม/ลบแถว
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectScheduleRows.map((row) => (
                        <tr className="border-b bg-white" key={row.id}>
                          <td className="px-6 py-4">
                            <div className={`grid grid-cols-1 gap-6`}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField
                                  className="w-full text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                  value={row.date}
                                  onChange={(value) =>
                                    handleProjectScheduleChange(row.id, {
                                      target: {
                                        name: 'date',
                                        value,
                                      },
                                    })
                                  }
                                  format="DD/MM/YYYY"
                                />
                              </LocalizationProvider>
                            </div>
                          </td>
                          <td className="bg-gray-50 px-6 py-4">
                            <div className={`grid grid-cols-1 gap-6`}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimeField
                                  className="w-full text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                  value={row.time}
                                  name="time"
                                  onChange={(value) =>
                                    handleProjectScheduleChange(row.id, {
                                      target: {
                                        name: 'time',
                                        value,
                                      },
                                    })
                                  }
                                  format="HH:mm"
                                />
                              </LocalizationProvider>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`grid grid-cols-1 gap-6`}>
                              <TextField
                                type="text"
                                name="detail"
                                className="flex w-full"
                                variant="outlined"
                                placeholder=""
                                value={row.detail}
                                onChange={(value) =>
                                  handleProjectScheduleChange(row.id, value)
                                }
                                // required
                              />
                            </div>
                          </td>
                          <td className="flex items-center justify-center bg-gray-50 px-6 py-4">
                            <Tooltip title="เพิ่มแถว">
                              <IconButton
                                aria-label="add_row"
                                size="small"
                                onClick={addProjectScheduleRow}
                              >
                                <PlusCircleIcon className="h-9 w-9" />
                              </IconButton>
                            </Tooltip>
                            {projectScheduleRows.length > 1 && (
                              <Tooltip title="ลบแถว">
                                <IconButton
                                  aria-label="delete_row"
                                  size="small"
                                  onClick={() =>
                                    deleteProjectScheduleRow(row.id)
                                  }
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
          </div>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        12.วิทยากร (ถ้ามี)
      </h3>
      <div className="mb-6">
        <div className="mb-3 grid grid-cols-1 gap-6">
          <TextField
            type="text"
            name="lecturer"
            className="flex w-full"
            value={formInput.lecturer}
            onChange={handleInputChange}
            placeholder=""
            // required
          />
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        13.ผู้เข้าร่วมโครงการ/กลุ่มเป้าหมาย
      </h3>
      <div className="mb-6">
        <div className="grid gap-6 md:grid-cols-1">
          <table className="w-full rounded border text-left text-sm text-gray-500">
            <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
              <tr>
                <th scope="col" className="w-[75%] bg-gray-300 px-6 py-3">
                  รายละเอียด
                </th>
                <th scope="col" className="w-[15%] px-6 py-3">
                  จำนวน/คน
                </th>
                <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                  เพิ่ม/ลบแถว
                </th>
              </tr>
            </thead>
            <tbody>
              {targetRows.map((row) => (
                <tr className="border-b bg-white" key={row.id}>
                  <td className="w-[10%] bg-gray-50 px-6 py-4 text-center text-base">
                    <div className={`grid grid-cols-1 gap-6`}>
                      <TextField
                        hiddenLabel
                        type="text"
                        id="detail"
                        className="flex w-full"
                        placeholder=""
                        value={row.detail}
                        onChange={(e) =>
                          handleTargetChange(row.id, 'detail', e.target.value)
                        }
                        // required
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`grid grid-cols-1 gap-6`}>
                      <TextField
                        hiddenLabel
                        type="number"
                        id="count"
                        className="flex w-full"
                        placeholder=""
                        value={row.count}
                        onChange={(e) =>
                          handleTargetChange(row.id, 'count', e.target.value)
                        }
                        onBlur={calculateTargetTotal}
                        // required
                      />
                    </div>
                  </td>
                  <td className="w-[10%] bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-center">
                      <Tooltip title="เพิ่มแถว">
                        <IconButton
                          aria-label="add_row"
                          size="small"
                          onClick={addTargetRow}
                        >
                          <PlusCircleIcon className="h-9 w-9" />
                        </IconButton>
                      </Tooltip>
                      {targetRows.length > 1 && (
                        <Tooltip title="ลบแถว">
                          <IconButton
                            aria-label="delete_row"
                            size="small"
                            onClick={() => deleteTargetRow(row.id)}
                          >
                            <XCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 text-right font-bold">รวมจำนวน</td>
                <td className="px-6 py-2 text-right font-bold">
                  {targetTotal}
                </td>
                <td className="py-2 text-left font-bold">คน</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        14.การปรับปรุงจากข้อเสนอแนะของโครงการที่ผ่านมา/โครงการที่มีลักษณะใกล้เคียงกัน
      </h3>
      <div className="mb-6">
        <div>
          <textarea
            name="improvement"
            rows={4}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder=""
            value={formInput.improvement}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      <h3 className="mb-2 block text-base font-medium text-gray-900 ">
        15.งบประมาณ
      </h3>
      <div className="mb-6">
        <div className="mb-3 grid gap-6 md:grid-cols-1">
          <div>
            <label
              htmlFor="project_location"
              className="mb-2 block text-base font-medium text-gray-900"
            >
              15.1 งบประมาณรายรับ
            </label>
            <table className="w-full rounded border text-left text-sm text-gray-500">
              <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                <tr>
                  <th scope="col" className="w-[10%] px-6 py-3">
                    ลำดับที่
                  </th>
                  <th scope="col" className="w-[40%] bg-gray-300 px-6 py-3">
                    รายการ
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3">
                    จำนวนเงิน
                  </th>
                  <th scope="col" className="w-[20%] bg-gray-300 px-6 py-3">
                    แหล่งที่มาของรายรับ
                  </th>
                  <th scope="col" className="w-[10%] px-6 py-3">
                    เพิ่ม/ลบแถว
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgetIncomeRows.map((row) => (
                  <tr className="border-b bg-white" key={row.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 text-center text-lg font-medium"
                    >
                      {row.id}
                    </th>
                    <td className="w-[10%] bg-gray-50 px-6 py-4 text-center text-base">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          hiddenLabel
                          type="text"
                          id="detail"
                          className="flex w-full"
                          placeholder=""
                          value={row.detail}
                          onChange={(e) =>
                            handleBudgetIncomeChange(
                              row.id,
                              'detail',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <OutlinedInput
                          // hiddenLabel
                          type="number"
                          id="amount"
                          endAdornment={
                            <InputAdornment position="end">บาท</InputAdornment>
                          }
                          className="flex w-full"
                          placeholder=""
                          value={row.amount}
                          onChange={(e) =>
                            handleBudgetIncomeChange(
                              row.id,
                              'amount',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="bg-gray-50 px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          hiddenLabel
                          type="text"
                          id="source"
                          className="flex w-full"
                          placeholder="งบประมาณ หมวด"
                          value={row.source}
                          onChange={(e) =>
                            handleBudgetIncomeChange(
                              row.id,
                              'source',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Tooltip title="เพิ่มแถว">
                          <IconButton
                            aria-label="add_row"
                            size="small"
                            onClick={addBudgetIncomeRow}
                          >
                            <PlusCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                        {budgetIncomeRows.length > 1 && (
                          <Tooltip title="ลบแถว">
                            <IconButton
                              aria-label="delete_row"
                              size="small"
                              onClick={() => deleteBudgetIncomeRow(row.id)}
                            >
                              <XCircleIcon className="h-9 w-9" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="py-2 text-right font-bold">
                    รวมงบประมาณรายรับ
                  </td>
                  <td className="px-6 py-2 text-right font-bold">
                    {budgetIncomeTotal}
                  </td>
                  <td colSpan={2} className="py-2 text-left font-bold">
                    บาท
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <label
              htmlFor="project_location"
              className="mb-2 block text-base font-medium text-gray-900"
            >
              15.2 งบประมาณรายจ่าย
            </label>
            <table className="w-full rounded border text-left text-sm text-gray-500">
              <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                <tr>
                  <th scope="col" className="w-[10%] px-6 py-3">
                    ลำดับที่
                  </th>
                  <th scope="col" className="w-[40%] bg-gray-300 px-6 py-3">
                    รายการ
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3">
                    จำนวนเงิน
                  </th>
                  <th scope="col" className="w-[20%] bg-gray-300 px-6 py-3">
                    หมายเหตุ
                  </th>
                  <th scope="col" className="w-[10%] px-6 py-3">
                    เพิ่ม/ลบแถว
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgetExpenseRows.map((row) => (
                  <tr className="border-b bg-white" key={row.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 text-center text-lg font-medium"
                    >
                      {row.id}
                    </th>
                    <td className="w-[10%] bg-gray-50 px-6 py-4 text-center text-base">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          hiddenLabel
                          type="text"
                          id="detail"
                          className="flex w-full"
                          placeholder=""
                          value={row.detail}
                          onChange={(e) =>
                            handleBudgetExpenseChange(
                              row.id,
                              'detail',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <OutlinedInput
                          // hiddenLabel
                          type="number"
                          id="amount"
                          endAdornment={
                            <InputAdornment position="end">บาท</InputAdornment>
                          }
                          className="flex w-full"
                          placeholder=""
                          value={row.amount}
                          onChange={(e) =>
                            handleBudgetExpenseChange(
                              row.id,
                              'amount',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td className="bg-gray-50 px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          hiddenLabel
                          type="text"
                          id="note"
                          className="flex w-full"
                          placeholder=""
                          value={row.note}
                          onChange={(e) =>
                            handleBudgetExpenseChange(
                              row.id,
                              'note',
                              e.target.value,
                            )
                          }
                          // required
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <Tooltip title="เพิ่มแถว">
                          <IconButton
                            aria-label="add_row"
                            size="small"
                            onClick={addBudgetExpenseRow}
                          >
                            <PlusCircleIcon className="h-9 w-9" />
                          </IconButton>
                        </Tooltip>
                        {budgetExpenseRows.length > 1 && (
                          <Tooltip title="ลบแถว">
                            <IconButton
                              aria-label="delete_row"
                              size="small"
                              onClick={() => deleteBudgetExpenseRow(row.id)}
                            >
                              <XCircleIcon className="h-9 w-9" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="py-2 text-right font-bold">
                    รวมงบประมาณรายจ่าย
                  </td>
                  <td className="px-6 py-2 text-right font-bold">
                    {budgetExpenseTotal}
                  </td>
                  <td colSpan={2} className="py-2 text-left font-bold">
                    บาท
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
}
