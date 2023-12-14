'use client';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField, DateTimeField, TimeField } from '@mui/x-date-pickers';
import { PN01 } from '@/app/model/pn01';
import { Button } from '../button';
import Link from 'next/link';

interface ValidationError {
  id: number;
  error: string;
}

interface ValidationErrors {
  [key: string]: ValidationError[];
}

export default function PN01Form() {
  const [formData, setFormData] = useState<PN01>();

  const [isButton, setIsButton] = useState({
    submit: false,
    draft: false,
  });

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const [validationArrayError, setValidationArrayError] =
    useState<ValidationErrors>({});

  const [validationSelectError, setValidationSelectError] = useState<{
    [key: string]: string;
  }>({});

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

    setValidationError((prevErrors) => ({
      ...prevErrors,
      projectTypes: '',
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

    setValidationError((prevErrors) => ({
      ...prevErrors,
      universityIndentity: '',
    }));
  };

  useEffect(() => {
    checkDisableCheckBox();
  }, [isSubOtherDisabled, isOtherDisabled, isStudentDevelopmentDisabled]);

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

    setValidationError((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSelectChange = (event: any) => {
    const { value, name } = event.target;

    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setValidationSelectError((prevErrors) => ({
      ...prevErrors,
      [name]: '',
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

    setValidationArrayError((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      Object.keys(updatedErrors).forEach((key) => {
        if (key.startsWith(`responsible_`) && updatedErrors[key].some((error) => error.id === id)) {
          updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);

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
  

  const deleteOIVTRow = (id: number) => {
    setOIVTRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(`OIVT_`) && updatedErrors[key].some((error) => error.id === id)) {
            updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);
  
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

  const deleteExpectedResultRow = (id: number) => {
    setExpectedResultRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(`expectedResult_`) && updatedErrors[key].some((error) => error.id === id)) {
            updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);
  
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

  const deleteOperationDurationRow = (id: number) => {
    setOperationDurationRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(`operationDuration_`) && updatedErrors[key].some((error) => error.id === id)) {
            updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);
  
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

  const deleteProjectScheduleRow = (id: number) => {
    setProjectScheduleRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(`projectSchedule_`) && updatedErrors[key].some((error) => error.id === id)) {
            updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);
  
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

  const deleteTargetRow = (id: number) => {
    setTargetRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(`target_`) && updatedErrors[key].some((error) => error.id === id)) {
            updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);
  
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

  const deleteBudgetIncomeRow = (id: number) => {
    setBudgetIncomeRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(`budgetIncome_`) && updatedErrors[key].some((error) => error.id === id)) {
            updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);
  
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

  const deleteBudgetExpenseRow = (id: number) => {
    setBudgetExpenseRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        Object.keys(updatedErrors).forEach((key) => {
          if (key.startsWith(`budgetExpense_`) && updatedErrors[key].some((error) => error.id === id)) {
            updatedErrors[key] = updatedErrors[key].filter((error) => error.id !== id);
  
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

  const handleResponsibleChange = (id: number, field: string, value: string) => {
    setResponsibleRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  
    setValidationArrayError((prevErrors) => {
      const key = `responsible_${field}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
  };
  

  const handleOIVTChange = (id: number, field: string, value: string) => {
    setOIVTRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );

    setValidationArrayError((prevErrors) => {
      const key = `OIVT_${field}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
  };

  const handleExpectedResultChange = (id: number, value: string) => {
    setExpectedResultRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, expected_result: value } : row,
      ),
    );

    setValidationArrayError((prevErrors) => {
      const key = `expectedResult_expected_result`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
  };

  const handleOperationDurationChange = (id: number, value: string) => {
    setOperationDurationRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, operation_duration: value } : row,
      ),
    );

    setValidationArrayError((prevErrors) => {
      const key = `operationDuration_operation_duration`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
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

    setValidationArrayError((prevErrors) => {
      const key = `projectSchedule_${name}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
  };

  const handleTargetChange = (id: number, field: string, value: string) => {
    setTargetRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, [field]: field == 'detail' ? value : Number(value) }
          : row,
      ),
    );

    setValidationArrayError((prevErrors) => {
      const key = `target_${field}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
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

    setValidationArrayError((prevErrors) => {
      const key = `budgetIncome_${field}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
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

    setValidationArrayError((prevErrors) => {
      const key = `budgetExpense_${field}`;
      const specificErrors = prevErrors[key] || [];
      const updatedErrors = specificErrors.filter((error) => error.id !== id);
      const restErrors = { ...prevErrors, [key]: updatedErrors };
      return restErrors;
    });
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

  const validateArray = (
    array: Array<any>,
    fields: Array<string>,
    prefix: string
  ): boolean => {
    let isValid = true;
  
    const errors: ValidationErrors = {};
  
    array.forEach((item) => {
      fields.forEach((field) => {
        const key = `${prefix}_${field}` as keyof ValidationErrors;
  
        if (!item[field] || (typeof item[field] === 'string' && item[field].trim() === '')) {
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
    const excludedFields = ['lecturer'];

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

    // Validate Select
    for (const key in selectedValues) {
      if (Object.prototype.hasOwnProperty.call(selectedValues, key)) {
        if (excludedFields.includes(key)) {
          continue;
        }
        const value = selectedValues[key as keyof typeof selectedValues];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          isValid = false;

          setValidationSelectError((prevErrors) => ({
            ...prevErrors,
            [key]: `โปรดเลือกข้อมูล`,
          }));

          console.error(`${key} is required.`);
        }
      }
    }

    // Validate Checkbox (University Indentity)
    const isUniversityIndentityValid = Object.values(universityIndentity).some(
      (isChecked) => isChecked,
    );

    if (!isUniversityIndentityValid) {
      isValid = false;

      setValidationError((prevErrors) => ({
        ...prevErrors,
        universityIndentity: 'โปรดเลือกอย่างน้อยหนึ่งรายการ',
      }));

      console.error('University Indentity checkboxes is required.');
    } else {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        universityIndentity: '',
      }));
    }

    // Validate Checkbox (Project Types)
    const isProjectTypesValid = Object.values(projectTypes).some(
      (isChecked) => isChecked,
    );

    if (!isProjectTypesValid) {
      isValid = false;

      setValidationError((prevErrors) => ({
        ...prevErrors,
        projectTypes: 'โปรดเลือกอย่างน้อยหนึ่งรายการ',
      }));

      console.error('Project Types checkboxes is required.');
    } else {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        projectTypes: '',
      }));
    }

    // Validate Table arrays
    const responsibleFields = ['firstname', 'lastname', 'position', 'work'];
    const isResponsibleValid = validateArray(
      responsibleRows,
      responsibleFields,
      'responsible',
    );
    console.log('isResponsibleValid : ', isResponsibleValid);

    const OIVTFields = ['objective', 'indicator', 'value', 'tool'];
    const isOIVTValid = validateArray(OIVTRows, OIVTFields, 'OIVT');
    console.log('isOIVTValid : ', isOIVTValid);

    const expectedResultFields = ['expected_result'];
    const isExpectedResultValid = validateArray(
      expectedResultRows,
      expectedResultFields,
      'expectedResult',
    );

    const operationDurationFields = ['operation_duration'];
    const isOperationDurationValid = validateArray(
      operationDurationRows,
      operationDurationFields,
      'operationDuration',
    );

    const projectScheduleFields = ['detail'];
    const isProjectScheduleValid = validateArray(
      projectScheduleRows,
      projectScheduleFields,
      'projectSchedule',
    );

    const targetFields = ['detail', 'count'];
    const isTargetValid = validateArray(targetRows, targetFields, 'target');

    const budgetIncomeFields = ['detail', 'amount', 'source'];
    const isBudgetIncomeValid = validateArray(
      budgetIncomeRows,
      budgetIncomeFields,
      'budgetIncome',
    );

    const budgetExpenseFields = ['detail', 'amount', 'note'];
    const isBudgetExpenseValid = validateArray(
      budgetExpenseRows,
      budgetExpenseFields,
      'budgetExpense',
    );

    isValid =
      isResponsibleValid &&
      isOIVTValid &&
      isExpectedResultValid &&
      isOperationDurationValid &&
      isProjectScheduleValid &&
      isTargetValid &&
      isBudgetIncomeValid &&
      isBudgetExpenseValid &&
      /* Add other validations here */ isValid;

    return isValid;
  };

  const handleDraft = (event: any) => {
    event.preventDefault();
    isButton.draft = true;

    if (isButton.draft) {
      const formData = setFinalFormData();
      console.log('formData: ',formData);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    isButton.submit = true;

    // setValidationArrayError({});

    const isFormValid = validateForm();

    if (isButton.submit && isFormValid) {
      const formData = setFinalFormData();
      console.log('formData: ',formData);
    } else {
      console.error('Form validation failed. Please check the form fields.');
    }
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
      <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
        <div className={`mb-0 grid gap-6 md:grid-cols-2`}>
          <div>
            <label
              htmlFor="faculty"
              className={`mb-2 block text-base font-medium ${
                validationError.faculty ? 'text-red-600' : 'text-gray-900'
              }`}
            >
              1.ชื่อคณะ/วิทยาลัย/หน่วยงาน
            </label>
            <TextField
              type="text"
              name="faculty"
              className="flex w-full"
              value={formInput.faculty}
              onChange={handleInputChange}
              placeholder=""
              error={Boolean(validationError.faculty)}
              helperText={validationError.faculty}
            />
          </div>
          <div>
            <label
              htmlFor="projectName"
              className={`mb-2 block text-base font-medium ${
                validationError.projectName ? 'text-red-600' : 'text-gray-900'
              }`}
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
              error={Boolean(validationError.projectName)}
              helperText={validationError.projectName}
            />
          </div>
          <div>
            <label
              htmlFor="projectHead"
              className={`mb-2 block text-base font-medium ${
                validationError.projectHead ? 'text-red-600' : 'text-gray-900'
              }`}
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
              error={Boolean(validationError.projectHead)}
              helperText={validationError.projectHead}
            />
          </div>
          <div>
            <label
              htmlFor="projectHeadPhone"
              className={`mb-2 block text-base font-medium ${
                validationError.projectHeadPhone
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
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
              error={Boolean(validationError.projectHeadPhone)}
              helperText={validationError.projectHeadPhone}
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
                          name="firstname"
                          className="flex w-full"
                          placeholder=""
                          value={row.firstname}
                          onChange={(e) => handleResponsibleChange(row.id, 'firstname', e.target.value)}
                          error={Boolean(validationArrayError['responsible_firstname']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['responsible_firstname']?.find((item) => item.id === row.id)?.error || ''}
                        />
                        <TextField
                          type="text"
                          name="lastname"
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
                          error={Boolean(validationArrayError['responsible_lastname']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['responsible_lastname']?.find((item) => item.id === row.id)?.error || ''}
                        />
                      </div>
                    </td>
                    <td className="bg-gray-50 px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          type="text"
                          name="position"
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
                          error={Boolean(validationArrayError['responsible_position']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['responsible_position']?.find((item) => item.id === row.id)?.error || ''}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          type="text"
                          name="work"
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
                          error={Boolean(validationArrayError['responsible_work']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['responsible_work']?.find((item) => item.id === row.id)?.error || ''}
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
        <div className="mb-6">
          <div>
            <label
              className={`mb-2 block text-base font-medium ${
                validationSelectError.strategicIssue
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              4.1 ประเด็นยุทธศาสตร์ที่
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationSelectError.strategicIssue)}
            >
              <Select
                name="strategicIssue"
                value={selectedValues.strategicIssue}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>
                {validationSelectError.strategicIssue}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <label
              className={`mb-2 block text-base font-medium ${
                validationSelectError.objective
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              4.2 เป้าประสงค์ที่
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationSelectError.objective)}
            >
              <Select
                name="objective"
                value={selectedValues.objective}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>{validationSelectError.objective}</FormHelperText>
            </FormControl>
          </div>
          <div>
            <label
              className={`mb-2 block text-base font-medium ${
                validationSelectError.universityStrategic
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              4.3 กลยุทธ์ระดับมหาวิทยาลัยที่
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationSelectError.universityStrategic)}
            >
              <Select
                name="universityStrategic"
                value={selectedValues.universityStrategic}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>
                {validationSelectError.universityStrategic}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <label
              className={`mb-2 block text-base font-medium ${
                validationSelectError.strategicPlanKPI
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              4.4 ตัวชี้วัดแผนกลยุทธ์ที่
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationSelectError.strategicPlanKPI)}
            >
              <Select
                name="strategicPlanKPI"
                value={selectedValues.strategicPlanKPI}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>
                {validationSelectError.strategicPlanKPI}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <label
              className={`mb-2 block text-base font-medium ${
                validationSelectError.operationPlanKPI
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              4.5 ตัวชี้วัดแผนปฏิบัติการที่
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationSelectError.operationPlanKPI)}
            >
              <Select
                name="operationPlanKPI"
                value={selectedValues.operationPlanKPI}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>
                {validationSelectError.operationPlanKPI}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <label
              className={`mb-2 block text-base font-medium ${
                validationSelectError.projectKPI
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              4.6 ตัวชี้วัดโครงการ
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationSelectError.projectKPI)}
            >
              <Select
                name="projectKPI"
                value={selectedValues.projectKPI}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>
                {validationSelectError.projectKPI}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <label
              className={`mb-2 block text-base font-medium ${
                validationSelectError.projectStatus
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}
            >
              4.7 สถานะโครงการ
            </label>
            <FormControl
              className="flex w-full"
              error={Boolean(validationSelectError.projectStatus)}
            >
              <Select
                name="projectStatus"
                value={selectedValues.projectStatus}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>
                {validationSelectError.projectStatus}
              </FormHelperText>
            </FormControl>
          </div>
        </div>

        <h3
          className={`mb-2 block text-base font-medium ${
            validationError.projectTypes ? 'text-red-600' : 'text-gray-900'
          }`}
        >
          5.ประเภทโครงการ
        </h3>
        <div
          className={`mb-6 ${
            validationError.projectTypes ? ' text-red-600' : 'text-gray-900'
          }`}
        >
          <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
            <div
              className={`flex items-center rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="maintenance"
                type="checkbox"
                checked={projectTypes.maintenance}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="maintenance"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                แผนทำนุบำรุงศิลปวัฒนธรรม
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="academicService"
                type="checkbox"
                checked={projectTypes.academicService}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="academicService"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                แผนบริการวิชาการ
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="knowledgeManagement"
                type="checkbox"
                checked={projectTypes.knowledgeManagement}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="knowledgeManagement"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                แผนการจัดการความรู้
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="researchPromotion"
                type="checkbox"
                checked={projectTypes.researchPromotion}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="researchPromotion"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                แผนการส่งเสริมงานวิจัย
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="educationQualityAssurance"
                type="checkbox"
                checked={projectTypes.educationQualityAssurance}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="educationQualityAssurance"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                แผนการประกันคุณภาพการศึกษา
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="personnelDevelopment"
                type="checkbox"
                checked={projectTypes.personnelDevelopment}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="personnelDevelopment"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                แผนพัฒนาบุคลากร
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="riskManagement"
                type="checkbox"
                checked={projectTypes.riskManagement}
                onChange={handleProjectTypeChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="riskManagement"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                แผนบริหารความเสี่ยง
              </label>
            </div>
          </div>
          <div
            className={`my-3 rounded border ${
              validationError.projectTypes
                ? 'border-red-600'
                : 'border-gray-200'
            }`}
          >
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
                  className="ms-2 w-full py-4 text-sm font-medium"
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
                  checked={
                    projectTypes.sport && projectTypes.studentDevelopment
                  }
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
                  {projectTypes.subOther && projectTypes.studentDevelopment && (
                    <div className="w-full border-b border-gray-300 px-2">
                      <input
                        type="text"
                        name="subOtherDetail"
                        className="flex w-full border-none "
                        placeholder="โปรดระบุ"
                        value={projectTypes.subOtherDetail || ''}
                        onChange={handleProjectTypeChange}
                        disabled={isSubOtherDisabled}
                        required={!isSubOtherDisabled}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
            <div
              className={`rounded border ${
                validationError.projectTypes
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
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
                  className="ms-2 py-4 text-sm font-medium"
                >
                  อื่นๆ
                </label>
                {projectTypes.other && (
                  <div className="w-full border-b border-gray-300 pl-2 pr-4">
                    <input
                      type="text"
                      name="otherDetail"
                      className="flex w-full border-none"
                      placeholder="โปรดระบุ"
                      value={projectTypes.otherDetail || ''}
                      onChange={handleProjectTypeChange}
                      disabled={isOtherDisabled}
                      required={!isOtherDisabled}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {validationError.projectTypes && (
            <p className="ml-3 pt-[4px] text-xs tracking-wider text-red-600">
              {validationError.projectTypes}
            </p>
          )}
        </div>

        <h3
          className={`mb-2 block text-base font-medium ${
            validationError.universityIndentity
              ? 'text-red-600'
              : 'text-gray-900'
          }`}
        >
          6.การตอบสนองต่อคุณลักษณะของบัณฑิตที่พึงประสงค์/อัตลักษณ์ของมหาวิทยาลัยพายัพ
        </h3>
        <div
          className={`mb-6 ${
            validationError.universityIndentity
              ? ' text-red-600'
              : 'text-gray-900'
          }`}
        >
          <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
            <div
              className={`flex items-center rounded border ${
                validationError.universityIndentity
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="moral"
                type="checkbox"
                checked={universityIndentity.moral}
                onChange={handleUniversityIndentityChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="bordered-checkbox-1"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                คุณธรรมนำใจ
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.universityIndentity
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="serve"
                type="checkbox"
                checked={universityIndentity.serve}
                onChange={handleUniversityIndentityChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="bordered-checkbox-1"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                รับใช้สังคม
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.universityIndentity
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="academic"
                type="checkbox"
                checked={universityIndentity.academic}
                onChange={handleUniversityIndentityChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="bordered-checkbox-1"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                วิชาการก้าวหน้า
              </label>
            </div>
            <div
              className={`flex items-center rounded border ${
                validationError.universityIndentity
                  ? 'border-red-600'
                  : 'border-gray-200'
              } ps-4`}
            >
              <input
                name="develop"
                type="checkbox"
                checked={universityIndentity.develop}
                onChange={handleUniversityIndentityChange}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="bordered-checkbox-1"
                className="ms-2 w-full py-4 text-sm font-medium"
              >
                พัฒนาสู่สากล
              </label>
            </div>
          </div>
          {validationError.universityIndentity && (
            <p className="ml-3 pt-[4px] text-xs tracking-wider text-red-600">
              {validationError.universityIndentity}
            </p>
          )}
        </div>

        <h3
          className={`mb-2 block text-base font-medium ${
            validationError.principleReason ? 'text-red-600' : 'text-gray-900'
          }`}
        >
          7.หลักการและเหตุผล
        </h3>
        <div className="mb-6">
          <div className="grid gap-6 md:grid-cols-1">
            <TextField
              name="principleReason"
              multiline
              rows={5}
              sx={{
                '.MuiOutlinedInput-root': {
                  padding: 1,
                },
              }}
              className="flex w-full"
              helperText={validationError.principleReason}
              error={Boolean(validationError.principleReason)}
              placeholder=""
              value={formInput.principleReason}
              onChange={handleInputChange}
            />
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
                            name="objective"
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
                            error={Boolean(validationArrayError['OIVT_objective']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['OIVT_objective']?.find((item) => item.id === row.id)?.error || ''}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            type="text"
                            name="indicator"
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
                            error={Boolean(validationArrayError['OIVT_indicator']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['OIVT_indicator']?.find((item) => item.id === row.id)?.error || ''}
                          />
                        </div>
                      </td>
                      <td className="bg-gray-50 px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            type="text"
                            name="value"
                            className="flex w-full"
                            placeholder=""
                            value={row.value}
                            onChange={(e) =>
                              handleOIVTChange(row.id, 'value', e.target.value)
                            }
                            error={Boolean(validationArrayError['OIVT_value']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['OIVT_value']?.find((item) => item.id === row.id)?.error || ''}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            type="text"
                            name="tool"
                            className="flex w-full"
                            placeholder=""
                            value={row.tool}
                            onChange={(e) =>
                              handleOIVTChange(row.id, 'tool', e.target.value)
                            }
                            error={Boolean(validationArrayError['OIVT_tool']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['OIVT_tool']?.find((item) => item.id === row.id)?.error || ''}
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
                          error={Boolean(validationArrayError['expectedResult_expected_result']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['expectedResult_expected_result']?.find((item) => item.id === row.id)?.error || ''}
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
                            handleOperationDurationChange(
                              row.id,
                              e.target.value,
                            )
                          }
                          error={Boolean(validationArrayError['operationDuration_operation_duration']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['operationDuration_operation_duration']?.find((item) => item.id === row.id)?.error || ''}
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
                className={`mb-2 block text-base font-medium ${
                  validationError.projectLocation
                    ? 'text-red-600'
                    : 'text-gray-900'
                }`}
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
                error={Boolean(validationError.projectLocation)}
                helperText={validationError.projectLocation}
              />
            </div>
            <div>
              <label
                htmlFor="project_datetime"
                className={`mb-2 block text-base font-medium ${
                  validationError.projectDatetime
                    ? 'text-red-600'
                    : 'text-gray-900'
                }`}
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
                  helperText={validationError.projectDatetime}
                  sx={{
                    color: validationError.projectDatetime
                      ? '#D32F2F'
                      : 'inherit',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: validationError.projectDatetime
                        ? '#D32F2F'
                        : 'inherit',
                    },
                    '& .MuiFormHelperText-root': {
                      color: validationError.projectDatetime
                        ? '#D32F2F'
                        : 'inherit',
                    },
                  }}
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
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
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
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
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
                                  error={Boolean(validationArrayError['projectSchedule_detail']?.some((item) => item.id === row.id))}
                                  helperText={validationArrayError['projectSchedule_detail']?.find((item) => item.id === row.id)?.error || ''}
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
                          error={Boolean(validationArrayError['target_detail']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['target_detail']?.find((item) => item.id === row.id)?.error || ''}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`grid grid-cols-1 gap-6`}>
                        <TextField
                          hiddenLabel
                          type="number"
                          name="count"
                          className="flex w-full"
                          placeholder=""
                          value={row.count}
                          onChange={(e) =>
                            handleTargetChange(row.id, 'count', e.target.value)
                          }
                          onBlur={calculateTargetTotal}
                          error={Boolean(validationArrayError['target_count']?.some((item) => item.id === row.id))}
                          helperText={validationArrayError['target_count']?.find((item) => item.id === row.id)?.error || ''}
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

        <h3
          className={`mb-2 block text-base font-medium ${
            validationError.improvement ? 'text-red-600' : 'text-gray-900'
          }`}
        >
          14.การปรับปรุงจากข้อเสนอแนะของโครงการที่ผ่านมา/โครงการที่มีลักษณะใกล้เคียงกัน
        </h3>
        <div className="mb-6">
          <div>
            <TextField
              name="improvement"
              rows={5}
              multiline
              className={`flex w-full`}
              sx={{
                '.MuiOutlinedInput-root': {
                  padding: 1,
                },
              }}
              placeholder=""
              helperText={validationError.improvement}
              error={Boolean(validationError.improvement)}
              value={formInput.improvement}
              onChange={handleInputChange}
            />
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
                            name="detail"
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
                            error={Boolean(validationArrayError['budgetIncome_detail']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['budgetIncome_detail']?.find((item) => item.id === row.id)?.error || ''}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`grid grid-cols-1 gap-0`}>
                          <OutlinedInput
                            // hiddenLabel
                            type="number"
                            name="amount"
                            endAdornment={
                              <InputAdornment position="end">
                                บาท
                              </InputAdornment>
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
                            error={Boolean(validationArrayError['budgetIncome_amount']?.some((item) => item.id === row.id))}
                          />
                          <FormHelperText className='text-red-700 ml-3'>
                            {validationArrayError['budgetIncome_amount']?.find(
                              (item) => item.id === row.id
                            )?.error || ''}
                          </FormHelperText>
                        </div>
                      </td>
                      <td className="bg-gray-50 px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            hiddenLabel
                            type="text"
                            name="source"
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
                            error={Boolean(validationArrayError['budgetIncome_source']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['budgetIncome_source']?.find((item) => item.id === row.id)?.error || ''}
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
                            name="detail"
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
                            error={Boolean(validationArrayError['budgetExpense_detail']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['budgetExpense_detail']?.find((item) => item.id === row.id)?.error || ''}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`grid grid-cols-1 gap-0`}>
                          <OutlinedInput
                            // hiddenLabel
                            type="number"
                            name="amount"
                            endAdornment={
                              <InputAdornment position="end">
                                บาท
                              </InputAdornment>
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
                            error={Boolean(validationArrayError['budgetExpense_amount']?.some((item) => item.id === row.id))}
                          />
                          <FormHelperText className='text-red-700 ml-3'>
                            {validationArrayError['budgetExpense_amount']?.find(
                              (item) => item.id === row.id
                            )?.error || ''}
                          </FormHelperText>
                        </div>
                      </td>
                      <td className="bg-gray-50 px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            hiddenLabel
                            type="text"
                            name="note"
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
                            error={Boolean(validationArrayError['budgetExpense_note']?.some((item) => item.id === row.id))}
                            helperText={validationArrayError['budgetExpense_note']?.find((item) => item.id === row.id)?.error || ''}
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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          ยกเลิก
        </Link>
        <button
          onClick={handleDraft}
          className="flex h-10 items-center rounded-lg border border-blue-500 px-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
        >
          แบบร่าง
        </button>
        <Button type="submit">ตกลง</Button>
      </div>
    </form>
  );
}
