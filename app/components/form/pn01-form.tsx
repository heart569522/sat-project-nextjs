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
import { useEffect, useState } from 'react';
import {
  BudgetExpenseRow,
  BudgetIncomeRow,
  ExpectedResultRow,
  OIVTRow,
  OperationDurationRow,
  PN01,
  ProjectScheduleRow,
  ResponsibleRow,
  TargetRow,
} from '@/app/model/pn01';
import { Button } from '../buttons/button';
import Link from 'next/link';
import {
  getStrategicIssue,
  getObjective,
  getUniversityStrategic,
  getOperationPlanKPI,
  getProjectKPI,
  getProjectStatus,
  getStrategicPlanKPI,
  createData,
  updateData,
  createDraft,
} from '@/app/lib/api-service';
import {
  objective_list,
  operational_plan_kpi_list,
  project_kpi_list,
  project_status_list,
  strategic_issue_list,
  strategic_plan_kpi_list,
  university_strategic_list,
} from '@/app/model/pn01-select-list';
import { ModalQuestion, ModalResponse } from '../modal';
import { usePathname, useRouter } from 'next/navigation';
import { OverlayLoading } from '../loading-screen';

interface ValidationError {
  id: number;
  error: string;
}

interface ValidationErrors {
  [key: string]: ValidationError[];
}

export default function PN01Form({
  editData,
  isEditing,
}: {
  editData?: any;
  isEditing?: boolean;
}) {
  // console.log("🚀 ~ editData:", editData)
  const router = useRouter();

  if (isEditing && !editData.is_edit) {
    router.replace('/dashboard/project-proposal');
  }

  const [loading, setLoading] = useState(false);

  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [detailModal, setDetailModal] = useState('');
  const [handleAction, setHandleAction] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [buttonLink, setButtonLink] = useState('');
  const [buttonText, setButtonText] = useState('');

  const handleOpenModal = (
    isCancel?: boolean,
    isDraft?: boolean,
    isSubmit?: boolean,
  ) => {
    console.log('handleOpenModal');

    if (isCancel) {
      setTitleModal(
        isEditing
          ? 'ยกเลิกการแก้ไขโครงการ/กิจกรรม'
          : 'ยกเลิกการเสนอโครงการ/กิจกรรม',
      );
      setDetailModal(
        isEditing
          ? 'คุณยืนยันที่จะยกเลิกการแก้ไขโครงการ/กิจกรรม'
          : 'คุณยืนยันที่จะยกเลิกการเสนอโครงการ/กิจกรรม',
      );
      setHandleAction('cancel');
      setOpenQuestionModal(true);
    }

    if (isDraft) {
      setTitleModal('แบบร่างโครงการ/กิจกรรม');
      setDetailModal('คุณยืนยันที่จะบันทึกแบบร่างการเสนอโครงการ/กิจกรรม');
      setHandleAction('draft');
      setOpenQuestionModal(true);
    }

    if (isSubmit) {
      const isFormValid = validateForm();

      if (isFormValid) {
        setTitleModal(
          isEditing ? 'แก้ไขโครงการ/กิจกรรม' : 'เสนอโครงการ/กิจกรรม',
        );
        setDetailModal(
          isEditing
            ? 'คุณยืนยันที่จะบันทึกข้อมูลการเสนอโครงการ/กิจกรรม, หลังจากยืนยันจะไม่สามารถแก้ไขข้อมูลได้'
            : 'คุณยืนยันที่จะส่งข้อมูลการเสนอโครงการ/กิจกรรม, หลังจากยืนยันจะไม่สามารถแก้ไขข้อมูลได้',
        );
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

  let userId = '8d2de365-1dea-4b3e-97ec-9f46b5b68ff1'; // test id super admin

  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const [validationArrayError, setValidationArrayError] =
    useState<ValidationErrors>({});

  const [validationSelectError, setValidationSelectError] = useState<{
    [key: string]: string;
  }>({});

  const [formInput, setFormInput] = useState({
    faculty: isEditing ? editData?.faculty || '' : '',
    projectName: isEditing ? editData?.project_name || '' : '',
    projectYear: isEditing ? editData?.project_year || '' : '',
    projectHead: isEditing ? editData?.project_head || '' : '',
    projectHeadPhone: isEditing ? editData?.project_head_phone || '' : '',
    principleReason: isEditing ? editData?.principle_reason || '' : '',
    projectLocation: isEditing ? editData?.project_location || '' : '',
    projectDatetime: isEditing ? editData?.project_datetime || '' : '',
    lecturer: isEditing ? editData?.lecturer || '' : '',
    improvement: isEditing ? editData?.improvement || '' : '',
  });

  const [strategicIssueList, setStrategicIssueList] = useState<
    strategic_issue_list[]
  >([]);
  const [objectiveList, setObjectiveList] = useState<objective_list[]>([]);
  const [universityStrategicList, setUniversityStrategicList] = useState<
    university_strategic_list[]
  >([]);
  const [strategicPlanKPIList, setStrategicPlanKPI] = useState<
    strategic_plan_kpi_list[]
  >([]);
  const [operationPlanKPIList, setOperationPlanKPI] = useState<
    operational_plan_kpi_list[]
  >([]);
  const [projectKPIList, setProjectKPI] = useState<project_kpi_list[]>([]);
  const [projectStatusList, setProjectStatus] = useState<project_status_list[]>(
    [],
  );

  const getStrategicIssueList = async () => {
    if (isEditing) {
      setLoading(true);
    }
    try {
      const data = await getStrategicIssue();
      setLoading(false);
      setStrategicIssueList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getObjectiveList = async () => {
    if (isEditing) {
      setLoading(true);
    }
    try {
      const data = await getObjective();
      setLoading(false);
      setObjectiveList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUniversityStrategicList = async () => {
    if (isEditing) {
      setLoading(true);
    }
    try {
      const data = await getUniversityStrategic();
      setLoading(false);
      setUniversityStrategicList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStrategicPlanKPIList = async () => {
    if (isEditing) {
      setLoading(true);
    }
    try {
      const data = await getStrategicPlanKPI();
      setLoading(false);
      setStrategicPlanKPI(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getOperationPlanKPIList = async () => {
    if (isEditing) {
      setLoading(true);
    }
    try {
      const data = await getOperationPlanKPI();
      setLoading(false);
      setOperationPlanKPI(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectKPIList = async () => {
    if (isEditing) {
      setLoading(true);
    }
    try {
      const data = await getProjectKPI();
      setLoading(false);
      setProjectKPI(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectStatusList = async () => {
    if (isEditing) {
      setLoading(true);
    }
    try {
      const data = await getProjectStatus();
      setLoading(false);
      setProjectStatus(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('fetch list pn01');
    console.log('🚀 ~ editData:', editData);

    const fetchListData = async () => {
      await getStrategicIssueList();
      await getObjectiveList();
      await getUniversityStrategicList();
      await getStrategicPlanKPIList();
      await getOperationPlanKPIList();
      await getProjectKPIList();
      await getProjectStatusList();
    };

    fetchListData();
  }, []);

  const [selectedValues, setSelectedValues] = useState({
    strategicIssue: isEditing ? editData?.strategic_issue_id || '' : '',
    objective: isEditing ? editData?.objective_id || '' : '',
    universityStrategic: isEditing
      ? editData?.university_strategic_id || ''
      : '',
    strategicPlanKPI: isEditing ? editData?.strategic_plan_kpi_id || '' : '',
    operationPlanKPI: isEditing ? editData?.operational_plan_kpi_id || '' : '',
    projectKPI: isEditing ? editData?.project_kpi_id || '' : '',
    projectStatus: isEditing ? editData?.project_status_id || '' : '',
  });

  const [responsibleRows, setResponsibleRows] = useState(
    isEditing
      ? editData?.project_responsible || [
          { id: 1, firstname: '', lastname: '', position: '', work: '' },
        ]
      : [{ id: 1, firstname: '', lastname: '', position: '', work: '' }],
  );

  const [OIVTRows, setOIVTRows] = useState(
    isEditing
      ? editData?.objective_indicator_value_tool || [
          { id: 1, objective: '', indicator: '', value: '', tool: '' },
        ]
      : [{ id: 1, objective: '', indicator: '', value: '', tool: '' }],
  );

  const [expectedResultRows, setExpectedResultRows] = useState(
    isEditing
      ? editData?.expected_result || [{ id: 1, expected_result: '' }]
      : [{ id: 1, expected_result: '' }],
  );

  const [operationDurationRows, setOperationDurationRows] = useState(
    isEditing
      ? editData?.operation_duration || [{ id: 1, operation_duration: '' }]
      : [{ id: 1, operation_duration: '' }],
  );

  const [projectScheduleRows, setProjectScheduleRows] = useState(
    isEditing
      ? editData?.project_schedule || [
          { id: 1, date: '', time: '', detail: '' },
        ]
      : [{ id: 1, date: '', time: '', detail: '' }],
  );

  const [targetTotal, setTargetTotal] = useState(
    isEditing ? editData?.target_total || '' : '',
  );

  const [targetRows, setTargetRows] = useState(
    isEditing
      ? editData?.target || [{ id: 1, detail: '', count: '' }]
      : [{ id: 1, detail: '', count: '' }],
  );

  const [budgetIncomeTotal, setBudgetIncomeTotal] = useState(
    isEditing ? editData?.budget_income_total || '' : '',
  );

  const [budgetIncomeRows, setBudgetIncomeRows] = useState(
    isEditing
      ? editData?.budget_income || [
          { id: 1, detail: '', amount: '', source: '' },
        ]
      : [{ id: 1, detail: '', amount: '', source: '' }],
  );

  const [budgetExpenseTotal, setBudgetExpenseTotal] = useState(
    isEditing ? editData?.budget_expense_total || '' : '',
  );

  const [budgetExpenseRows, setBudgetExpenseRows] = useState(
    isEditing
      ? editData?.budget_expense || [
          { id: 1, detail: '', amount: '', note: '' },
        ]
      : [{ id: 1, detail: '', amount: '', note: '' }],
  );

  const [projectTypes, setProjectTypes] = useState(() => {
    if (isEditing) {
      const {
        maintenance,
        academic_service,
        knowledge_management,
        research_promotion,
        education_quality_assurance,
        personnel_development,
        risk_management,
        student_development,
        moral_ethical,
        academic_promotion,
        knowledge,
        environment,
        intellectual_skill,
        sport,
        knowledge_analysis_communication_technology,
        art_culture_development,
        numerical_analysis_communication_technology,
        moral_ethical_development,
        leadership_development,
        sub_other,
        sub_other_detail,
        other,
        other_detail,
      } = editData?.project_type || {};

      return {
        maintenance: maintenance || false,
        academic_service: academic_service || false,
        knowledge_management: knowledge_management || false,
        research_promotion: research_promotion || false,
        education_quality_assurance: education_quality_assurance || false,
        personnel_development: personnel_development || false,
        risk_management: risk_management || false,
        student_development: student_development || false,
        moral_ethical: moral_ethical || false,
        academic_promotion: academic_promotion || false,
        knowledge: knowledge || false,
        environment: environment || false,
        intellectual_skill: intellectual_skill || false,
        sport: sport || false,
        knowledge_analysis_communication_technology:
          knowledge_analysis_communication_technology || false,
        art_culture_development: art_culture_development || false,
        numerical_analysis_communication_technology:
          numerical_analysis_communication_technology || false,
        moral_ethical_development: moral_ethical_development || false,
        leadership_development: leadership_development || false,
        sub_other: sub_other || false,
        sub_other_detail: sub_other_detail || '',
        other: other || false,
        other_detail: other_detail || '',
      };
    } else {
      return {
        maintenance: false,
        academic_service: false,
        knowledge_management: false,
        research_promotion: false,
        education_quality_assurance: false,
        personnel_development: false,
        risk_management: false,
        student_development: false,
        moral_ethical: false,
        academic_promotion: false,
        knowledge: false,
        environment: false,
        intellectual_skill: false,
        sport: false,
        knowledge_analysis_communication_technology: false,
        art_culture_development: false,
        numerical_analysis_communication_technology: false,
        moral_ethical_development: false,
        leadership_development: false,
        sub_other: false,
        sub_other_detail: '',
        other: false,
        other_detail: '',
      };
    }
  });

  const [universityIndentity, setUniversityIndentity] = useState(() => {
    if (isEditing) {
      const { moral, serve, academic, develop } =
        editData?.university_identity || {};

      return {
        moral: moral || false,
        serve: serve || false,
        academic: academic || false,
        develop: develop || false,
      };
    } else {
      return {
        moral: false,
        serve: false,
        academic: false,
        develop: false,
      };
    }
  });

  const isSubOtherDisabled =
    !projectTypes.student_development || !projectTypes.sub_other;
  const isOtherDisabled = !projectTypes.other;
  const isStudentDevelopmentDisabled = !projectTypes.student_development;

  const checkDisableCheckBox = () => {
    if (isSubOtherDisabled) {
      setProjectTypes((prevTypes) => ({
        ...prevTypes,
        sub_other_detail: '',
      }));
    }
    if (isOtherDisabled) {
      setProjectTypes((prevTypes) => ({
        ...prevTypes,
        other_detail: '',
      }));
    }
    if (isStudentDevelopmentDisabled) {
      setProjectTypes((prevTypes) => ({
        ...prevTypes,
        intellectual_skill: false,
        academic_promotion: false,
        art_culture_development: false,
        environment: false,
        knowledge: false,
        knowledge_analysis_communication_technology: false,
        leadership_development: false,
        moral_ethical: false,
        moral_ethical_development: false,
        numerical_analysis_communication_technology: false,
        sport: false,
        sub_other: false,
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
        name == 'other_detail' || name == 'sub_other_detail' ? value : checked,
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
      [name]: value,
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
    setResponsibleRows((prevRows: ResponsibleRow[]) => [
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
    setOIVTRows((prevRows: OIVTRow[]) => [
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
    setExpectedResultRows((prevRows: ExpectedResultRow[]) => [
      ...prevRows,
      { id: prevRows.length + 1, expected_result: '' },
    ]);
  };

  const addOperationDurationRow = () => {
    setOperationDurationRows((prevRows: OperationDurationRow[]) => [
      ...prevRows,
      { id: prevRows.length + 1, operation_duration: '' },
    ]);
  };

  const addProjectScheduleRow = () => {
    setProjectScheduleRows((prevRows: ProjectScheduleRow[]) => [
      ...prevRows,
      { id: prevRows.length + 1, date: '', time: '', detail: '' },
    ]);
  };

  const addTargetRow = () => {
    setTargetRows((prevRows: TargetRow[]) => [
      ...prevRows,
      { id: prevRows.length + 1, detail: '', count: '' },
    ]);
  };

  const addBudgetIncomeRow = () => {
    setBudgetIncomeRows((prevRows: BudgetIncomeRow[]) => [
      ...prevRows,
      { id: prevRows.length + 1, detail: '', amount: '', source: '' },
    ]);
  };

  const addBudgetExpenseRow = () => {
    setBudgetExpenseRows((prevRows: BudgetExpenseRow[]) => [
      ...prevRows,
      { id: prevRows.length + 1, detail: '', amount: '', note: '' },
    ]);
  };

  const deleteResponsibleRow = (id: number) => {
    setResponsibleRows((prevRows: ResponsibleRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`responsible_`) &&
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

  const deleteOIVTRow = (id: number) => {
    setOIVTRows((prevRows: OIVTRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`OIVT_`) &&
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

  const deleteExpectedResultRow = (id: number) => {
    setExpectedResultRows((prevRows: ExpectedResultRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`expectedResult_`) &&
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

  const deleteOperationDurationRow = (id: number) => {
    setOperationDurationRows((prevRows: OperationDurationRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`operationDuration_`) &&
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

  const deleteProjectScheduleRow = (id: number) => {
    setProjectScheduleRows((prevRows: ProjectScheduleRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`projectSchedule_`) &&
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

  const deleteTargetRow = (id: number) => {
    setTargetRows((prevRows: TargetRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`target_`) &&
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

  const deleteBudgetIncomeRow = (id: number) => {
    setBudgetIncomeRows((prevRows: BudgetIncomeRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`budgetIncome_`) &&
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

  const deleteBudgetExpenseRow = (id: number) => {
    setBudgetExpenseRows((prevRows: BudgetExpenseRow[]) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);

      const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));

      setValidationArrayError((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        Object.keys(updatedErrors).forEach((key) => {
          if (
            key.startsWith(`budgetExpense_`) &&
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

  const handleResponsibleChange = (
    id: number,
    field: string,
    value: string,
  ) => {
    setResponsibleRows((prevRows: ResponsibleRow[]) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
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
    setOIVTRows((prevRows: OIVTRow[]) =>
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
    setExpectedResultRows((prevRows: ExpectedResultRow[]) =>
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
    setOperationDurationRows((prevRows: OperationDurationRow[]) =>
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

    setProjectScheduleRows((prevRows: ProjectScheduleRow[]) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [name]: value,
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
    setTargetRows((prevRows: TargetRow[]) =>
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
    setBudgetIncomeRows((prevRows: BudgetIncomeRow[]) =>
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
    setBudgetExpenseRows((prevRows: BudgetExpenseRow[]) =>
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
    const total = targetRows.reduce(
      (acc: number, row: { count: any }) => acc + Number(row.count),
      0,
    );
    setTargetTotal(total.toLocaleString());
  };

  const calculateBudgetIncomeTotal = () => {
    const total = budgetIncomeRows.reduce(
      (acc: number, row: { amount: any }) => acc + Number(row.amount),
      0,
    );
    setBudgetIncomeTotal(total.toLocaleString());
  };

  const calculateBudgetExpenseTotal = () => {
    const total = budgetExpenseRows.reduce(
      (acc: number, row: { amount: any }) => acc + Number(row.amount),
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
    const responsibleFields = ['firstname', 'lastname'];
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

    const budgetExpenseFields = ['detail', 'amount'];
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

  const handleSubmissionError = () => {
    setLoading(false);
    setModalError(true);
    setTitleModal(isEditing ? 'แก้ไขข้อมูลผิดพลาด' : 'ผิดพลาด');
    setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
    setOpenResponseModal(true);
  };

  const handleDraft = async () => {
    setLoading(true);
    resetResponseModal();

    console.log('handleDraft');

    const formData = setFinalFormData(true);
    console.log('formData: ', formData);

    try {
      let response: any;

      response = await createDraft('project-proposal/draft', formData);

      if (response && (response.status === 201 || response.status === 200)) {
        setLoading(false);
        setModalSuccess(true);
        setTitleModal(isEditing ? 'แก้ไขแบบร่างสำเร็จ' : 'สำเร็จ');
        setDetailModal(
          isEditing
            ? 'กรุณาพิมพ์ และนำส่งเอกสาร พน.01 ที่สำนักพัฒนานักศึกษา'
            : 'สร้างคำร้องการเสนอโครงการ/กิจกรรม (ฉบับร่าง) สำเร็จ',
        );
        setButtonLink(
          isEditing
            ? `/dashboard/project-proposal/document/${editData.id}`
            : `/dashboard/project-proposal`,
        );
        setButtonText('กลับไปหน้าแรก');
        setOpenResponseModal(true);
      } else {
        handleSubmissionError();
      }
    } catch (error) {
      handleSubmissionError();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    resetResponseModal();

    console.log('handleSubmit');

    const formData = setFinalFormData(false);
    console.log('formData: ', formData);

    try {
      let response: any;

      if (isEditing) {
        response = await updateData('project-proposal', formData, editData.id);
      } else {
        response = await createData('project-proposal', formData);
      }

      if (response && (response.status === 201 || response.status === 200)) {
        setLoading(false);
        setModalSuccess(true);
        setTitleModal(isEditing ? 'แก้ไขข้อมูลสำเร็จ' : 'สำเร็จ');
        setDetailModal(
          isEditing
            ? 'กรุณาพิมพ์ และนำส่งเอกสาร พน.01 ที่สำนักพัฒนานักศึกษา'
            : 'กรุณาพิมพ์ และนำส่งเอกสาร พน.01 ที่สำนักพัฒนานักศึกษา',
        );
        setButtonLink(
          isEditing
            ? `/dashboard/project-proposal/document/${editData.id}`
            : `/dashboard/project-proposal/document/${response.data.id}`,
        );
        setButtonText('ไปยังเอกสารเอกสาร พน.01');
        setOpenResponseModal(true);
      } else {
        handleSubmissionError();
      }
    } catch (error) {
      handleSubmissionError();
    }
  };

  const setFinalFormData = (isDraft: boolean) => {
    console.log('--set form--');

    const finalFormData: PN01 = {
      userId: userId,
      isDraft: isDraft,
      faculty: formInput.faculty,
      projectName: formInput.projectName,
      projectYear: formInput.projectYear,
      projectHead: formInput.projectHead,
      projectHeadPhone: formInput.projectHeadPhone,
      principleReason: formInput.principleReason,
      projectLocation: formInput.projectLocation,
      projectDatetime: formInput.projectDatetime,
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
      projectScheduleRows: projectScheduleRows,
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
    <>
      <form className="py-2">
        <div className="rounded-md border-2 border-gray-100 p-4 md:p-6">
          <div className={`mb-6 grid gap-6 md:grid-cols-3`}>
            <div>
              <label
                htmlFor="faculty"
                className={`mb-2 block text-base font-medium ${
                  validationError.faculty ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                1.ชื่อคณะ/วิทยาลัย/หน่วยงาน *
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
                2.ชื่อโครงการ *
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
                htmlFor="projectName"
                className={`mb-2 block text-base font-medium ${
                  validationError.projectName ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                ปีการศึกษา (พ.ศ.) *
              </label>
              <TextField
                type="number"
                name="projectYear"
                className="flex w-full"
                value={formInput.projectYear}
                onChange={handleInputChange}
                placeholder="ปีพุทธศักราช (พ.ศ)"
                error={Boolean(validationError.projectYear)}
                helperText={validationError.projectYear}
              />
            </div>
          </div>
          <div className={`grid gap-6 md:grid-cols-2`}>
            <div>
              <label
                htmlFor="projectHead"
                className={`mb-2 block text-base font-medium ${
                  validationError.projectHead ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                3.ผู้ดำเนินการ/ผู้รับผิดชอบโครงการ *
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
                หมายเลขโทรศัพท์ *
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
                      ชื่อ - สกุล *
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
                  {responsibleRows.map((row: ResponsibleRow) => (
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
                            onChange={(e) =>
                              handleResponsibleChange(
                                row.id,
                                'firstname',
                                e.target.value,
                              )
                            }
                            error={Boolean(
                              validationArrayError[
                                'responsible_firstname'
                              ]?.some((item) => item.id === row.id),
                            )}
                            helperText={
                              validationArrayError[
                                'responsible_firstname'
                              ]?.find((item) => item.id === row.id)?.error || ''
                            }
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
                            error={Boolean(
                              validationArrayError[
                                'responsible_lastname'
                              ]?.some((item) => item.id === row.id),
                            )}
                            helperText={
                              validationArrayError[
                                'responsible_lastname'
                              ]?.find((item) => item.id === row.id)?.error || ''
                            }
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
                            error={Boolean(
                              validationArrayError[
                                'responsible_position'
                              ]?.some((item) => item.id === row.id),
                            )}
                            helperText={
                              validationArrayError[
                                'responsible_position'
                              ]?.find((item) => item.id === row.id)?.error || ''
                            }
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`grid grid-cols-1 gap-6`}>
                          <TextField
                            type="text"
                            name="work"
                            className="flex w-full "
                            placeholder=""
                            value={row.work}
                            onChange={(e) =>
                              handleResponsibleChange(
                                row.id,
                                'work',
                                e.target.value,
                              )
                            }
                            error={Boolean(
                              validationArrayError['responsible_work']?.some(
                                (item) => item.id === row.id,
                              ),
                            )}
                            helperText={
                              validationArrayError['responsible_work']?.find(
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
            4.ความสอดคล้องกับยุทธศาสตร์ของคณะวิชา/มหาวิทยาลัยพายัพ *
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
                  {strategicIssueList.map((list) => (
                    <MenuItem key={list.id} divider={true} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
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
                  {objectiveList.map((list) => (
                    <MenuItem divider={true} key={list.id} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {validationSelectError.objective}
                </FormHelperText>
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
                  {universityStrategicList.map((list) => (
                    <MenuItem divider={true} key={list.id} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
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
                  {strategicPlanKPIList.map((list) => (
                    <MenuItem divider={true} key={list.id} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
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
                  {operationPlanKPIList.map((list) => (
                    <MenuItem divider={true} key={list.id} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
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
                  {projectKPIList.map((list) => (
                    <MenuItem divider={true} key={list.id} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
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
                  {projectStatusList.map((list) => (
                    <MenuItem divider={true} key={list.id} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
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
            5.ประเภทโครงการ *
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
                  name="academic_service"
                  type="checkbox"
                  checked={projectTypes.academic_service}
                  onChange={handleProjectTypeChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="academic_service"
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
                  name="knowledge_management"
                  type="checkbox"
                  checked={projectTypes.knowledge_management}
                  onChange={handleProjectTypeChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="knowledge_management"
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
                  name="research_promotion"
                  type="checkbox"
                  checked={projectTypes.research_promotion}
                  onChange={handleProjectTypeChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="research_promotion"
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
                  name="education_quality_assurance"
                  type="checkbox"
                  checked={projectTypes.education_quality_assurance}
                  onChange={handleProjectTypeChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="education_quality_assurance"
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
                  name="personnel_development"
                  type="checkbox"
                  checked={projectTypes.personnel_development}
                  onChange={handleProjectTypeChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="personnel_development"
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
                  name="risk_management"
                  type="checkbox"
                  checked={projectTypes.risk_management}
                  onChange={handleProjectTypeChange}
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="risk_management"
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
                    name="student_development"
                    type="checkbox"
                    checked={projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="student_development"
                    className="ms-2 w-full py-4 text-sm font-medium"
                  >
                    แผนพัฒนานักศึกษาตามกรอบมาตรฐานคุณวุฒิ
                    และกิจกรรมพัฒนานักศึกษา <b>(เลือกได้มากกว่า 1 ประเภท)</b>
                  </label>
                </div>
              </div>
              <div
                className={`${
                  !projectTypes.student_development
                    ? 'bg-gray-100 text-gray-400'
                    : 'text-gray-900'
                } grid gap-x-6 gap-y-0 px-2 pb-2 pt-0 md:grid-cols-2`}
              >
                <div className="flex items-center ps-4">
                  <input
                    name="moral_ethical"
                    type="checkbox"
                    checked={
                      projectTypes.moral_ethical &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="moral_ethical"
                    className="ms-2 w-full py-4 text-sm font-medium"
                  >
                    ด้านคุณธรรม จริยธรรม
                  </label>
                </div>
                <div className="flex items-center ps-4">
                  <input
                    name="academic_promotion"
                    type="checkbox"
                    checked={
                      projectTypes.academic_promotion &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="academic_promotion"
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
                      projectTypes.knowledge && projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
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
                      projectTypes.environment &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
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
                    name="intellectual_skill"
                    type="checkbox"
                    checked={
                      projectTypes.intellectual_skill &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="intellectual_skill"
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
                      projectTypes.sport && projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
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
                    name="knowledge_analysis_communication_technology"
                    type="checkbox"
                    checked={
                      projectTypes.knowledge_analysis_communication_technology &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="knowledge_analysis_communication_technology"
                    className="ms-2 w-full py-4 text-sm font-medium"
                  >
                    ด้านทักษะด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                  </label>
                </div>
                <div className="flex items-center ps-4">
                  <input
                    name="art_culture_development"
                    type="checkbox"
                    checked={
                      projectTypes.art_culture_development &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="art_culture_development"
                    className="ms-2 w-full py-4 text-sm font-medium"
                  >
                    กิจกรรมส่งเสริมศิลปะและวัฒนธรรม
                  </label>
                </div>
                <div className="flex items-center ps-4">
                  <input
                    name="numerical_analysis_communication_technology"
                    type="checkbox"
                    checked={
                      projectTypes.numerical_analysis_communication_technology &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="numerical_analysis_communication_technology"
                    className="ms-2 w-full py-4 text-sm font-medium"
                  >
                    ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร
                    และการใช้เทคโนโลยี
                  </label>
                </div>
                <div className="flex items-center ps-4">
                  <input
                    name="moral_ethical_development"
                    type="checkbox"
                    checked={
                      projectTypes.moral_ethical_development &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="moral_ethical_development"
                    className="ms-2 w-full py-4 text-sm font-medium"
                  >
                    กิจกรรมเสริมสร้างคุณธรรม จริยธรรม
                  </label>
                </div>
                <div className="flex items-center ps-4">
                  <input
                    name="leadership_development"
                    type="checkbox"
                    checked={
                      projectTypes.leadership_development &&
                      projectTypes.student_development
                    }
                    disabled={!projectTypes.student_development}
                    onChange={handleProjectTypeChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="leadership_development"
                    className="ms-2 w-full py-4 text-sm font-medium"
                  >
                    กิจกรรมส่งเสริมพัฒนาทักษะชีวิตความเป็นผู้นำ
                  </label>
                </div>
                <div className="ps-4">
                  <div className="flex items-center">
                    <input
                      name="sub_other"
                      type="checkbox"
                      checked={
                        projectTypes.sub_other &&
                        projectTypes.student_development
                      }
                      disabled={!projectTypes.student_development}
                      onChange={handleProjectTypeChange}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="sub_other"
                      className="ms-2 py-4 text-sm font-medium"
                    >
                      อื่นๆ
                    </label>
                    {projectTypes.sub_other &&
                      projectTypes.student_development && (
                        <div className="w-full border-b border-gray-300 px-2">
                          <input
                            type="text"
                            name="sub_other_detail"
                            className="flex w-full border-none "
                            placeholder="โปรดระบุ"
                            value={projectTypes.sub_other_detail || ''}
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
                        name="other_detail"
                        className="flex w-full border-none"
                        placeholder="โปรดระบุ"
                        value={projectTypes.other_detail || ''}
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
            *
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
            7.หลักการและเหตุผล *
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
            เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด *
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
                    {OIVTRows.map((row: OIVTRow) => (
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
                              error={Boolean(
                                validationArrayError['OIVT_objective']?.some(
                                  (item) => item.id === row.id,
                                ),
                              )}
                              helperText={
                                validationArrayError['OIVT_objective']?.find(
                                  (item) => item.id === row.id,
                                )?.error || ''
                              }
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
                              error={Boolean(
                                validationArrayError['OIVT_indicator']?.some(
                                  (item) => item.id === row.id,
                                ),
                              )}
                              helperText={
                                validationArrayError['OIVT_indicator']?.find(
                                  (item) => item.id === row.id,
                                )?.error || ''
                              }
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
                                handleOIVTChange(
                                  row.id,
                                  'value',
                                  e.target.value,
                                )
                              }
                              error={Boolean(
                                validationArrayError['OIVT_value']?.some(
                                  (item) => item.id === row.id,
                                ),
                              )}
                              helperText={
                                validationArrayError['OIVT_value']?.find(
                                  (item) => item.id === row.id,
                                )?.error || ''
                              }
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
                              error={Boolean(
                                validationArrayError['OIVT_tool']?.some(
                                  (item) => item.id === row.id,
                                ),
                              )}
                              helperText={
                                validationArrayError['OIVT_tool']?.find(
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
            9.ประโยชน์ที่คาดว่าจะได้รับ *
          </h3>
          <div className="mb-6">
            <div className="grid gap-6 md:grid-cols-1">
              <table className="w-full rounded border text-left text-sm text-gray-500">
                <tbody>
                  {expectedResultRows.map((row: ExpectedResultRow) => (
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
                            error={Boolean(
                              validationArrayError[
                                'expectedResult_expected_result'
                              ]?.some((item) => item.id === row.id),
                            )}
                            helperText={
                              validationArrayError[
                                'expectedResult_expected_result'
                              ]?.find((item) => item.id === row.id)?.error || ''
                            }
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
            10.วิธีดำเนินงานและระยะเวลาดำเนินโครงการ *
          </h3>
          <div className="mb-6">
            <div className="grid gap-6 md:grid-cols-1">
              <table className="w-full rounded border text-left text-sm text-gray-500">
                <tbody>
                  {operationDurationRows.map((row: OperationDurationRow) => (
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
                            error={Boolean(
                              validationArrayError[
                                'operationDuration_operation_duration'
                              ]?.some((item) => item.id === row.id),
                            )}
                            helperText={
                              validationArrayError[
                                'operationDuration_operation_duration'
                              ]?.find((item) => item.id === row.id)?.error || ''
                            }
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
                                onClick={() =>
                                  deleteOperationDurationRow(row.id)
                                }
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
                  11.1 สถานที่จัดโครงการ *
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
                    11.2 วัน/เวลา ที่จัดโครงการ *
                  </p>
                </label>
                <TextField
                  type="text"
                  name="projectDatetime"
                  className="flex w-full"
                  value={formInput.projectDatetime}
                  onChange={handleInputChange}
                  placeholder="วัน/เดือน/ปี"
                  error={Boolean(validationError.projectDatetime)}
                  helperText={validationError.projectDatetime}
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="countries"
                  className="mb-2 block text-base font-medium text-gray-900"
                >
                  11.3 กำหนดการ (โดยละเอียด) *
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
                              </p>
                            </th>
                            <th
                              scope="col"
                              className="w-[15%] bg-gray-300 px-6 py-3"
                            >
                              <p className="flex items-center justify-center gap-1">
                                เวลา
                              </p>
                            </th>
                            <th scope="col" className="px-6 py-3">
                              รายการกิจกรรม *
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
                          {projectScheduleRows.map(
                            (row: ProjectScheduleRow) => (
                              <tr className="border-b bg-white" key={row.id}>
                                <td className="px-6 py-4">
                                  <div className={`grid grid-cols-1 gap-6`}>
                                    <TextField
                                      type="text"
                                      name="date"
                                      className="flex w-full"
                                      variant="outlined"
                                      placeholder="วัน/เดือน/ปี"
                                      value={row.date}
                                      onChange={(value) =>
                                        handleProjectScheduleChange(
                                          row.id,
                                          value,
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                                <td className="bg-gray-50 px-6 py-4">
                                  <div className={`grid grid-cols-1 gap-6`}>
                                    <TextField
                                      type="text"
                                      name="time"
                                      className="flex w-full"
                                      variant="outlined"
                                      placeholder="รูปแบบ 24 ชั่วโมง"
                                      value={row.time}
                                      onChange={(value) =>
                                        handleProjectScheduleChange(
                                          row.id,
                                          value,
                                        )
                                      }
                                    />
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
                                        handleProjectScheduleChange(
                                          row.id,
                                          value,
                                        )
                                      }
                                      error={Boolean(
                                        validationArrayError[
                                          'projectSchedule_detail'
                                        ]?.some((item) => item.id === row.id),
                                      )}
                                      helperText={
                                        validationArrayError[
                                          'projectSchedule_detail'
                                        ]?.find((item) => item.id === row.id)
                                          ?.error || ''
                                      }
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
                            ),
                          )}
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
            13.ผู้เข้าร่วมโครงการ/กลุ่มเป้าหมาย *
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
                  {targetRows.map((row: TargetRow) => (
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
                              handleTargetChange(
                                row.id,
                                'detail',
                                e.target.value,
                              )
                            }
                            error={Boolean(
                              validationArrayError['target_detail']?.some(
                                (item) => item.id === row.id,
                              ),
                            )}
                            helperText={
                              validationArrayError['target_detail']?.find(
                                (item) => item.id === row.id,
                              )?.error || ''
                            }
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
                              handleTargetChange(
                                row.id,
                                'count',
                                e.target.value,
                              )
                            }
                            onBlur={calculateTargetTotal}
                            error={Boolean(
                              validationArrayError['target_count']?.some(
                                (item) => item.id === row.id,
                              ),
                            )}
                            helperText={
                              validationArrayError['target_count']?.find(
                                (item) => item.id === row.id,
                              )?.error || ''
                            }
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
            *
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
                  15.1 งบประมาณรายรับ *
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
                    {budgetIncomeRows.map((row: BudgetIncomeRow) => (
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
                              error={Boolean(
                                validationArrayError[
                                  'budgetIncome_detail'
                                ]?.some((item) => item.id === row.id),
                              )}
                              helperText={
                                validationArrayError[
                                  'budgetIncome_detail'
                                ]?.find((item) => item.id === row.id)?.error ||
                                ''
                              }
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
                              error={Boolean(
                                validationArrayError[
                                  'budgetIncome_amount'
                                ]?.some((item) => item.id === row.id),
                              )}
                            />
                            <FormHelperText className="ml-3 text-red-700">
                              {validationArrayError[
                                'budgetIncome_amount'
                              ]?.find((item) => item.id === row.id)?.error ||
                                ''}
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
                              error={Boolean(
                                validationArrayError[
                                  'budgetIncome_source'
                                ]?.some((item) => item.id === row.id),
                              )}
                              helperText={
                                validationArrayError[
                                  'budgetIncome_source'
                                ]?.find((item) => item.id === row.id)?.error ||
                                ''
                              }
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
                  15.2 งบประมาณรายจ่าย *
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
                    {budgetExpenseRows.map((row: BudgetExpenseRow) => (
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
                              error={Boolean(
                                validationArrayError[
                                  'budgetExpense_detail'
                                ]?.some((item) => item.id === row.id),
                              )}
                              helperText={
                                validationArrayError[
                                  'budgetExpense_detail'
                                ]?.find((item) => item.id === row.id)?.error ||
                                ''
                              }
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
                              error={Boolean(
                                validationArrayError[
                                  'budgetExpense_amount'
                                ]?.some((item) => item.id === row.id),
                              )}
                            />
                            <FormHelperText className="ml-3 text-red-700">
                              {validationArrayError[
                                'budgetExpense_amount'
                              ]?.find((item) => item.id === row.id)?.error ||
                                ''}
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
                              error={Boolean(
                                validationArrayError[
                                  'budgetExpense_note'
                                ]?.some((item) => item.id === row.id),
                              )}
                              helperText={
                                validationArrayError[
                                  'budgetExpense_note'
                                ]?.find((item) => item.id === row.id)?.error ||
                                ''
                              }
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
      </form>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={() => handleOpenModal(true, false, false)}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          ยกเลิก
        </button>
        {!isEditing && (
          <button
            onClick={() => handleOpenModal(false, true, false)}
            className="flex h-10 items-center rounded-lg border border-blue-500 px-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            แบบร่าง
          </button>
        )}
        <Button onClick={() => handleOpenModal(false, false, true)}>
          ตกลง
        </Button>

        <ModalQuestion
          openModal={openQuestionModal}
          onCloseModal={handleCloseModal}
          title={titleModal}
          detail={detailModal}
          okAction={handleAction}
          onOk={(action) => {
            if (action === 'draft') {
              handleDraft();
            } else if (action === 'submit') {
              handleSubmit();
            } else if (action === 'cancel') {
              router.push('/dashboard/project-proposal', { scroll: false });
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
        />

        <OverlayLoading showLoading={loading} />
      </div>
    </>
  );
}
