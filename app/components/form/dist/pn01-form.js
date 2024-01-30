'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var outline_1 = require("@heroicons/react/24/outline");
var material_1 = require("@mui/material");
var react_1 = require("react");
var button_1 = require("../button");
var link_1 = require("next/link");
var api_service_1 = require("@/app/lib/api-service");
var modal_1 = require("../modal");
var navigation_1 = require("next/navigation");
var loading_screen_1 = require("../loading-screen");
function PN01Form(_a) {
    var _this = this;
    var editData = _a.editData, isEditing = _a.isEditing;
    var router = navigation_1.useRouter();
    if (!editData.is_edit) {
        router.replace('/dashboard/project-proposal');
    }
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(false), openQuestionModal = _c[0], setOpenQuestionModal = _c[1];
    var _d = react_1.useState(false), openResponseModal = _d[0], setOpenResponseModal = _d[1];
    var _e = react_1.useState(''), titleModal = _e[0], setTitleModal = _e[1];
    var _f = react_1.useState(''), detailModal = _f[0], setDetailModal = _f[1];
    var _g = react_1.useState(''), handleAction = _g[0], setHandleAction = _g[1];
    var _h = react_1.useState(false), modalSuccess = _h[0], setModalSuccess = _h[1];
    var _j = react_1.useState(false), modalError = _j[0], setModalError = _j[1];
    var _k = react_1.useState(''), buttonLink = _k[0], setButtonLink = _k[1];
    var _l = react_1.useState(''), buttonText = _l[0], setButtonText = _l[1];
    var handleOpenModal = function (isCancel, isDraft, isSubmit) {
        console.log('handleOpenModal');
        if (isCancel) {
            setTitleModal(isEditing
                ? 'ยกเลิกการแก้ไขโครงการ/กิจกรรม'
                : 'ยกเลิกการเสนอโครงการ/กิจกรรม');
            setDetailModal(isEditing
                ? 'คุณยืนยันที่จะยกเลิกการแก้ไขโครงการ/กิจกรรม'
                : 'คุณยืนยันที่จะยกเลิกการเสนอโครงการ/กิจกรรม');
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
            var isFormValid = validateForm();
            if (isFormValid) {
                setTitleModal(isEditing ? 'แก้ไขโครงการ/กิจกรรม' : 'เสนอโครงการ/กิจกรรม');
                setDetailModal(isEditing
                    ? 'คุณยืนยันที่จะบันทึกข้อมูลการเสนอโครงการ/กิจกรรม, หลังจากยืนยันจะไม่สามารถแก้ไขข้อมูลได้'
                    : 'คุณยืนยันที่จะส่งข้อมูลการเสนอโครงการ/กิจกรรม, หลังจากยืนยันจะไม่สามารถแก้ไขข้อมูลได้');
                setHandleAction('submit');
                setOpenQuestionModal(true);
            }
        }
    };
    var resetResponseModal = function () {
        setModalSuccess(false);
        setModalError(false);
        setTitleModal('');
        setDetailModal('');
        setButtonLink('');
        setButtonText('');
    };
    var handleCloseModal = function () {
        setOpenQuestionModal(false);
        setOpenResponseModal(false);
    };
    var userId = '8d2de365-1dea-4b3e-97ec-9f46b5b68ff1'; // test id super admin
    var _m = react_1.useState({}), validationError = _m[0], setValidationError = _m[1];
    var _o = react_1.useState({}), validationArrayError = _o[0], setValidationArrayError = _o[1];
    var _p = react_1.useState({}), validationSelectError = _p[0], setValidationSelectError = _p[1];
    var _q = react_1.useState({
        faculty: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.faculty) || '' : '',
        projectName: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_name) || '' : '',
        projectYear: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_year) || '' : '',
        projectHead: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_head) || '' : '',
        projectHeadPhone: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_head_phone) || '' : '',
        principleReason: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.principle_reason) || '' : '',
        projectLocation: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_location) || '' : '',
        projectDatetime: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_datetime) || '' : '',
        lecturer: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.lecturer) || '' : '',
        improvement: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.improvement) || '' : ''
    }), formInput = _q[0], setFormInput = _q[1];
    var _r = react_1.useState([]), strategicIssueList = _r[0], setStrategicIssueList = _r[1];
    var _s = react_1.useState([]), objectiveList = _s[0], setObjectiveList = _s[1];
    var _t = react_1.useState([]), universityStrategicList = _t[0], setUniversityStrategicList = _t[1];
    var _u = react_1.useState([]), strategicPlanKPIList = _u[0], setStrategicPlanKPI = _u[1];
    var _v = react_1.useState([]), operationPlanKPIList = _v[0], setOperationPlanKPI = _v[1];
    var _w = react_1.useState([]), projectKPIList = _w[0], setProjectKPI = _w[1];
    var _x = react_1.useState([]), projectStatusList = _x[0], setProjectStatus = _x[1];
    var getStrategicIssueList = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isEditing) {
                        setLoading(true);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.getStrategicIssue()];
                case 2:
                    data = _a.sent();
                    setLoading(false);
                    setStrategicIssueList(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getObjectiveList = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isEditing) {
                        setLoading(true);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.getObjective()];
                case 2:
                    data = _a.sent();
                    setLoading(false);
                    setObjectiveList(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getUniversityStrategicList = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isEditing) {
                        setLoading(true);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.getUniversityStrategic()];
                case 2:
                    data = _a.sent();
                    setLoading(false);
                    setUniversityStrategicList(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getStrategicPlanKPIList = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isEditing) {
                        setLoading(true);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.getStrategicPlanKPI()];
                case 2:
                    data = _a.sent();
                    setLoading(false);
                    setStrategicPlanKPI(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getOperationPlanKPIList = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isEditing) {
                        setLoading(true);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.getOperationPlanKPI()];
                case 2:
                    data = _a.sent();
                    setLoading(false);
                    setOperationPlanKPI(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getProjectKPIList = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isEditing) {
                        setLoading(true);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.getProjectKPI()];
                case 2:
                    data = _a.sent();
                    setLoading(false);
                    setProjectKPI(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var getProjectStatusList = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isEditing) {
                        setLoading(true);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.getProjectStatus()];
                case 2:
                    data = _a.sent();
                    setLoading(false);
                    setProjectStatus(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    console.error(error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        console.log('fetch list pn01');
        console.log('🚀 ~ editData:', editData);
        var fetchListData = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getStrategicIssueList()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getObjectiveList()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, getUniversityStrategicList()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, getStrategicPlanKPIList()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, getOperationPlanKPIList()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, getProjectKPIList()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, getProjectStatusList()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        fetchListData();
    }, []);
    var _y = react_1.useState({
        strategicIssue: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.strategic_issue_id) || '' : '',
        objective: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.objective_id) || '' : '',
        universityStrategic: isEditing
            ? (editData === null || editData === void 0 ? void 0 : editData.university_strategic_id) || ''
            : '',
        strategicPlanKPI: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.strategic_plan_kpi_id) || '' : '',
        operationPlanKPI: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.operational_plan_kpi_id) || '' : '',
        projectKPI: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_kpi_id) || '' : '',
        projectStatus: isEditing ? (editData === null || editData === void 0 ? void 0 : editData.project_status_id) || '' : ''
    }), selectedValues = _y[0], setSelectedValues = _y[1];
    var _z = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.project_responsible) || [
            { id: 1, firstname: '', lastname: '', position: '', work: '' },
        ]
        : [{ id: 1, firstname: '', lastname: '', position: '', work: '' }]), responsibleRows = _z[0], setResponsibleRows = _z[1];
    var _0 = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.objective_indicator_value_tool) || [
            { id: 1, objective: '', indicator: '', value: '', tool: '' },
        ]
        : [{ id: 1, objective: '', indicator: '', value: '', tool: '' }]), OIVTRows = _0[0], setOIVTRows = _0[1];
    var _1 = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.expected_result) || [{ id: 1, expected_result: '' }]
        : [{ id: 1, expected_result: '' }]), expectedResultRows = _1[0], setExpectedResultRows = _1[1];
    var _2 = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.operation_duration) || [{ id: 1, operation_duration: '' }]
        : [{ id: 1, operation_duration: '' }]), operationDurationRows = _2[0], setOperationDurationRows = _2[1];
    var _3 = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.project_schedule) || [
            { id: 1, date: '', time: '', detail: '' },
        ]
        : [{ id: 1, date: '', time: '', detail: '' }]), projectScheduleRows = _3[0], setProjectScheduleRows = _3[1];
    var _4 = react_1.useState(isEditing ? (editData === null || editData === void 0 ? void 0 : editData.target_total) || '' : ''), targetTotal = _4[0], setTargetTotal = _4[1];
    var _5 = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.target) || [{ id: 1, detail: '', count: '' }]
        : [{ id: 1, detail: '', count: '' }]), targetRows = _5[0], setTargetRows = _5[1];
    var _6 = react_1.useState(isEditing ? (editData === null || editData === void 0 ? void 0 : editData.budget_income_total) || '' : ''), budgetIncomeTotal = _6[0], setBudgetIncomeTotal = _6[1];
    var _7 = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.budget_income) || [
            { id: 1, detail: '', amount: '', source: '' },
        ]
        : [{ id: 1, detail: '', amount: '', source: '' }]), budgetIncomeRows = _7[0], setBudgetIncomeRows = _7[1];
    var _8 = react_1.useState(isEditing ? (editData === null || editData === void 0 ? void 0 : editData.budget_expense_total) || '' : ''), budgetExpenseTotal = _8[0], setBudgetExpenseTotal = _8[1];
    var _9 = react_1.useState(isEditing
        ? (editData === null || editData === void 0 ? void 0 : editData.budget_expense) || [
            { id: 1, detail: '', amount: '', note: '' },
        ]
        : [{ id: 1, detail: '', amount: '', note: '' }]), budgetExpenseRows = _9[0], setBudgetExpenseRows = _9[1];
    var _10 = react_1.useState(function () {
        if (isEditing) {
            var _a = (editData === null || editData === void 0 ? void 0 : editData.project_type) || {}, maintenance = _a.maintenance, academic_service = _a.academic_service, knowledge_management = _a.knowledge_management, research_promotion = _a.research_promotion, education_quality_assurance = _a.education_quality_assurance, personnel_development = _a.personnel_development, risk_management = _a.risk_management, student_development = _a.student_development, moral_ethical = _a.moral_ethical, academic_promotion = _a.academic_promotion, knowledge = _a.knowledge, environment = _a.environment, intellectual_skill = _a.intellectual_skill, sport = _a.sport, knowledge_analysis_communication_technology = _a.knowledge_analysis_communication_technology, art_culture_development = _a.art_culture_development, numerical_analysis_communication_technology = _a.numerical_analysis_communication_technology, moral_ethical_development = _a.moral_ethical_development, leadership_development = _a.leadership_development, sub_other = _a.sub_other, sub_other_detail = _a.sub_other_detail, other = _a.other, other_detail = _a.other_detail;
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
                knowledge_analysis_communication_technology: knowledge_analysis_communication_technology || false,
                art_culture_development: art_culture_development || false,
                numerical_analysis_communication_technology: numerical_analysis_communication_technology || false,
                moral_ethical_development: moral_ethical_development || false,
                leadership_development: leadership_development || false,
                sub_other: sub_other || false,
                sub_other_detail: sub_other_detail || '',
                other: other || false,
                other_detail: other_detail || ''
            };
        }
        else {
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
                other_detail: ''
            };
        }
    }), projectTypes = _10[0], setProjectTypes = _10[1];
    var _11 = react_1.useState(function () {
        if (isEditing) {
            var _a = (editData === null || editData === void 0 ? void 0 : editData.university_identity) || {}, moral = _a.moral, serve = _a.serve, academic = _a.academic, develop = _a.develop;
            return {
                moral: moral || false,
                serve: serve || false,
                academic: academic || false,
                develop: develop || false
            };
        }
        else {
            return {
                moral: false,
                serve: false,
                academic: false,
                develop: false
            };
        }
    }), universityIndentity = _11[0], setUniversityIndentity = _11[1];
    var isSubOtherDisabled = !projectTypes.student_development || !projectTypes.sub_other;
    var isOtherDisabled = !projectTypes.other;
    var isStudentDevelopmentDisabled = !projectTypes.student_development;
    var checkDisableCheckBox = function () {
        if (isSubOtherDisabled) {
            setProjectTypes(function (prevTypes) { return (__assign(__assign({}, prevTypes), { sub_other_detail: '' })); });
        }
        if (isOtherDisabled) {
            setProjectTypes(function (prevTypes) { return (__assign(__assign({}, prevTypes), { other_detail: '' })); });
        }
        if (isStudentDevelopmentDisabled) {
            setProjectTypes(function (prevTypes) { return (__assign(__assign({}, prevTypes), { intellectual_skill: false, academic_promotion: false, art_culture_development: false, environment: false, knowledge: false, knowledge_analysis_communication_technology: false, leadership_development: false, moral_ethical: false, moral_ethical_development: false, numerical_analysis_communication_technology: false, sport: false, sub_other: false })); });
        }
    };
    var handleProjectTypeChange = function (event) {
        var _a = event.target, name = _a.name, checked = _a.checked, value = _a.value;
        setProjectTypes(function (prevTypes) {
            var _a;
            return (__assign(__assign({}, prevTypes), (_a = {}, _a[name] = name == 'other_detail' || name == 'sub_other_detail' ? value : checked, _a)));
        });
        setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { projectTypes: '' })); });
    };
    var handleUniversityIndentityChange = function (event) {
        var _a = event.target, name = _a.name, checked = _a.checked;
        setUniversityIndentity(function (prevTypes) {
            var _a;
            return (__assign(__assign({}, prevTypes), (_a = {}, _a[name] = checked, _a)));
        });
        setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { universityIndentity: '' })); });
    };
    react_1.useEffect(function () {
        checkDisableCheckBox();
    }, [isSubOtherDisabled, isOtherDisabled, isStudentDevelopmentDisabled]);
    var handleInputChange = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        setFormInput(function (prevTypes) {
            var _a;
            return (__assign(__assign({}, prevTypes), (_a = {}, _a[name] = value, _a)));
        });
        setValidationError(function (prevErrors) {
            var _a;
            return (__assign(__assign({}, prevErrors), (_a = {}, _a[name] = '', _a)));
        });
    };
    var handleSelectChange = function (event) {
        var _a = event.target, value = _a.value, name = _a.name;
        setSelectedValues(function (prevValues) {
            var _a;
            return (__assign(__assign({}, prevValues), (_a = {}, _a[name] = value, _a)));
        });
        setValidationSelectError(function (prevErrors) {
            var _a;
            return (__assign(__assign({}, prevErrors), (_a = {}, _a[name] = '', _a)));
        });
    };
    var addResponsibleRow = function () {
        setResponsibleRows(function (prevRows) { return __spreadArrays(prevRows, [
            {
                id: prevRows.length + 1,
                firstname: '',
                lastname: '',
                position: '',
                work: ''
            },
        ]); });
    };
    var addOIVTRow = function () {
        setOIVTRows(function (prevRows) { return __spreadArrays(prevRows, [
            {
                id: prevRows.length + 1,
                objective: '',
                indicator: '',
                value: '',
                tool: ''
            },
        ]); });
    };
    var addExpectedResultRow = function () {
        setExpectedResultRows(function (prevRows) { return __spreadArrays(prevRows, [
            { id: prevRows.length + 1, expected_result: '' },
        ]); });
    };
    var addOperationDurationRow = function () {
        setOperationDurationRows(function (prevRows) { return __spreadArrays(prevRows, [
            { id: prevRows.length + 1, operation_duration: '' },
        ]); });
    };
    var addProjectScheduleRow = function () {
        setProjectScheduleRows(function (prevRows) { return __spreadArrays(prevRows, [
            { id: prevRows.length + 1, date: '', time: '', detail: '' },
        ]); });
    };
    var addTargetRow = function () {
        setTargetRows(function (prevRows) { return __spreadArrays(prevRows, [
            { id: prevRows.length + 1, detail: '', count: '' },
        ]); });
    };
    var addBudgetIncomeRow = function () {
        setBudgetIncomeRows(function (prevRows) { return __spreadArrays(prevRows, [
            { id: prevRows.length + 1, detail: '', amount: '', source: '' },
        ]); });
    };
    var addBudgetExpenseRow = function () {
        setBudgetExpenseRows(function (prevRows) { return __spreadArrays(prevRows, [
            { id: prevRows.length + 1, detail: '', amount: '', note: '' },
        ]); });
    };
    var deleteResponsibleRow = function (id) {
        setResponsibleRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("responsible_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var deleteOIVTRow = function (id) {
        setOIVTRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("OIVT_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var deleteExpectedResultRow = function (id) {
        setExpectedResultRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("expectedResult_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var deleteOperationDurationRow = function (id) {
        setOperationDurationRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("operationDuration_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var deleteProjectScheduleRow = function (id) {
        setProjectScheduleRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("projectSchedule_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var deleteTargetRow = function (id) {
        setTargetRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("target_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var deleteBudgetIncomeRow = function (id) {
        setBudgetIncomeRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("budgetIncome_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var deleteBudgetExpenseRow = function (id) {
        setBudgetExpenseRows(function (prevRows) {
            var updatedRows = prevRows.filter(function (row) { return row.id !== id; });
            var updatedRowsWithSequentialIds = updatedRows.map(function (row, index) { return (__assign(__assign({}, row), { id: index + 1 })); });
            setValidationArrayError(function (prevErrors) {
                var updatedErrors = __assign({}, prevErrors);
                Object.keys(updatedErrors).forEach(function (key) {
                    if (key.startsWith("budgetExpense_") &&
                        updatedErrors[key].some(function (error) { return error.id === id; })) {
                        updatedErrors[key] = updatedErrors[key].filter(function (error) { return error.id !== id; });
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
    var handleResponsibleChange = function (id, field, value) {
        setResponsibleRows(function (prevRows) {
            return prevRows.map(function (row) {
                var _a;
                return (row.id === id ? __assign(__assign({}, row), (_a = {}, _a[field] = value, _a)) : row);
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "responsible_" + field;
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var handleOIVTChange = function (id, field, value) {
        setOIVTRows(function (prevRows) {
            return prevRows.map(function (row) {
                var _a;
                return (row.id === id ? __assign(__assign({}, row), (_a = {}, _a[field] = value, _a)) : row);
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "OIVT_" + field;
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var handleExpectedResultChange = function (id, value) {
        setExpectedResultRows(function (prevRows) {
            return prevRows.map(function (row) {
                return row.id === id ? __assign(__assign({}, row), { expected_result: value }) : row;
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "expectedResult_expected_result";
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var handleOperationDurationChange = function (id, value) {
        setOperationDurationRows(function (prevRows) {
            return prevRows.map(function (row) {
                return row.id === id ? __assign(__assign({}, row), { operation_duration: value }) : row;
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "operationDuration_operation_duration";
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var handleProjectScheduleChange = function (id, event) {
        var _a = event.target, name = _a.name, value = _a.value;
        setProjectScheduleRows(function (prevRows) {
            return prevRows.map(function (row) {
                var _a;
                return row.id === id
                    ? __assign(__assign({}, row), (_a = {}, _a[name] = value, _a)) : row;
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "projectSchedule_" + name;
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var handleTargetChange = function (id, field, value) {
        setTargetRows(function (prevRows) {
            return prevRows.map(function (row) {
                var _a;
                return row.id === id
                    ? __assign(__assign({}, row), (_a = {}, _a[field] = field == 'detail' ? value : Number(value), _a)) : row;
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "target_" + field;
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var handleBudgetIncomeChange = function (id, field, value) {
        setBudgetIncomeRows(function (prevRows) {
            return prevRows.map(function (row) {
                var _a;
                return row.id === id
                    ? __assign(__assign({}, row), (_a = {}, _a[field] = field == 'detail' || 'source' ? value : Number(value), _a)) : row;
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "budgetIncome_" + field;
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var handleBudgetExpenseChange = function (id, field, value) {
        setBudgetExpenseRows(function (prevRows) {
            return prevRows.map(function (row) {
                var _a;
                return row.id === id
                    ? __assign(__assign({}, row), (_a = {}, _a[field] = field == 'detail' || 'note' ? value : Number(value), _a)) : row;
            });
        });
        setValidationArrayError(function (prevErrors) {
            var _a;
            var key = "budgetExpense_" + field;
            var specificErrors = prevErrors[key] || [];
            var updatedErrors = specificErrors.filter(function (error) { return error.id !== id; });
            var restErrors = __assign(__assign({}, prevErrors), (_a = {}, _a[key] = updatedErrors, _a));
            return restErrors;
        });
    };
    var calculateTargetTotal = function () {
        var total = targetRows.reduce(function (acc, row) { return acc + Number(row.count); }, 0);
        setTargetTotal(total.toLocaleString());
    };
    var calculateBudgetIncomeTotal = function () {
        var total = budgetIncomeRows.reduce(function (acc, row) { return acc + Number(row.amount); }, 0);
        setBudgetIncomeTotal(total.toLocaleString());
    };
    var calculateBudgetExpenseTotal = function () {
        var total = budgetExpenseRows.reduce(function (acc, row) { return acc + Number(row.amount); }, 0);
        setBudgetExpenseTotal(total.toLocaleString());
    };
    react_1.useEffect(function () {
        calculateTargetTotal();
    }, [targetRows]);
    react_1.useEffect(function () {
        calculateBudgetIncomeTotal();
    }, [budgetIncomeRows]);
    react_1.useEffect(function () {
        calculateBudgetExpenseTotal();
    }, [budgetExpenseRows]);
    var formatDateToISO = function (dateTime) {
        if (dateTime instanceof Date) {
            return dateTime.toISOString();
        }
        else {
            return null; // or handle the case when dateTime is not a Date
        }
    };
    var validateArray = function (array, fields, prefix) {
        var isValid = true;
        var errors = {};
        array.forEach(function (item) {
            fields.forEach(function (field) {
                var key = prefix + "_" + field;
                if (!item[field] ||
                    (typeof item[field] === 'string' && item[field].trim() === '')) {
                    isValid = false;
                    errors[key] = errors[key] || [];
                    errors[key].push({ id: item.id, error: 'โปรดกรอกข้อมูล' });
                    console.log(field + " is required for item " + item.id + ".");
                    console.log('Validation errors:', errors);
                    setValidationArrayError(function (prevErrors) { return (__assign(__assign({}, prevErrors), errors)); });
                }
            });
        });
        return isValid;
    };
    var validateForm = function () {
        var isValid = true;
        var excludedFields = ['lecturer'];
        console.log('--validateForm--');
        var _loop_1 = function (key) {
            if (Object.prototype.hasOwnProperty.call(formInput, key)) {
                if (excludedFields.includes(key)) {
                    return "continue";
                }
                var value = formInput[key];
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    isValid = false;
                    setValidationError(function (prevErrors) {
                        var _a;
                        return (__assign(__assign({}, prevErrors), (_a = {}, _a[key] = "\u0E42\u0E1B\u0E23\u0E14\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", _a)));
                    });
                    console.error(key + " is required.");
                }
            }
        };
        // Validate formInput
        for (var key in formInput) {
            _loop_1(key);
        }
        var _loop_2 = function (key) {
            if (Object.prototype.hasOwnProperty.call(selectedValues, key)) {
                if (excludedFields.includes(key)) {
                    return "continue";
                }
                var value = selectedValues[key];
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    isValid = false;
                    setValidationSelectError(function (prevErrors) {
                        var _a;
                        return (__assign(__assign({}, prevErrors), (_a = {}, _a[key] = "\u0E42\u0E1B\u0E23\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", _a)));
                    });
                    console.error(key + " is required.");
                }
            }
        };
        // Validate Select
        for (var key in selectedValues) {
            _loop_2(key);
        }
        // Validate Checkbox (University Indentity)
        var isUniversityIndentityValid = Object.values(universityIndentity).some(function (isChecked) { return isChecked; });
        if (!isUniversityIndentityValid) {
            isValid = false;
            setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { universityIndentity: 'โปรดเลือกอย่างน้อยหนึ่งรายการ' })); });
            console.error('University Indentity checkboxes is required.');
        }
        else {
            setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { universityIndentity: '' })); });
        }
        // Validate Checkbox (Project Types)
        var isProjectTypesValid = Object.values(projectTypes).some(function (isChecked) { return isChecked; });
        if (!isProjectTypesValid) {
            isValid = false;
            setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { projectTypes: 'โปรดเลือกอย่างน้อยหนึ่งรายการ' })); });
            console.error('Project Types checkboxes is required.');
        }
        else {
            setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { projectTypes: '' })); });
        }
        // Validate Table arrays
        var responsibleFields = ['firstname', 'lastname'];
        var isResponsibleValid = validateArray(responsibleRows, responsibleFields, 'responsible');
        console.log('isResponsibleValid : ', isResponsibleValid);
        var OIVTFields = ['objective', 'indicator', 'value', 'tool'];
        var isOIVTValid = validateArray(OIVTRows, OIVTFields, 'OIVT');
        console.log('isOIVTValid : ', isOIVTValid);
        var expectedResultFields = ['expected_result'];
        var isExpectedResultValid = validateArray(expectedResultRows, expectedResultFields, 'expectedResult');
        var operationDurationFields = ['operation_duration'];
        var isOperationDurationValid = validateArray(operationDurationRows, operationDurationFields, 'operationDuration');
        var projectScheduleFields = ['detail'];
        var isProjectScheduleValid = validateArray(projectScheduleRows, projectScheduleFields, 'projectSchedule');
        var targetFields = ['detail', 'count'];
        var isTargetValid = validateArray(targetRows, targetFields, 'target');
        var budgetIncomeFields = ['detail', 'amount', 'source'];
        var isBudgetIncomeValid = validateArray(budgetIncomeRows, budgetIncomeFields, 'budgetIncome');
        var budgetExpenseFields = ['detail', 'amount'];
        var isBudgetExpenseValid = validateArray(budgetExpenseRows, budgetExpenseFields, 'budgetExpense');
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
    var handleDraft = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData;
        return __generator(this, function (_a) {
            console.log('handleDraft');
            formData = setFinalFormData(true);
            console.log('formData: ', formData);
            return [2 /*return*/];
        });
    }); };
    var handleSubmissionError = function () {
        setLoading(false);
        setModalError(true);
        setTitleModal(isEditing ? 'แก้ไขข้อมูลผิดพลาด' : 'ผิดพลาด');
        setDetailModal('โปรดตรวจสอบข้อมูลแล้วลองอีกครั้ง');
        setOpenResponseModal(true);
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData, response, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    resetResponseModal();
                    console.log('handleSubmit');
                    formData = setFinalFormData(false);
                    console.log('formData: ', formData);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    response = void 0;
                    if (!isEditing) return [3 /*break*/, 3];
                    return [4 /*yield*/, api_service_1.updateData('project-proposal', formData, editData.id)];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, api_service_1.createData('project-proposal', formData)];
                case 4:
                    response = _a.sent();
                    _a.label = 5;
                case 5:
                    if (response && (response.status === 201 || response.status === 200)) {
                        setLoading(false);
                        setModalSuccess(true);
                        setTitleModal(isEditing ? 'แก้ไขข้อมูลสำเร็จ' : 'สำเร็จ');
                        setDetailModal(isEditing
                            ? 'กรุณาพิมพ์ และนำส่งเอกสาร พน.01 ที่สำนักพัฒนานักศึกษา'
                            : 'กรุณาพิมพ์ และนำส่งเอกสาร พน.01 ที่สำนักพัฒนานักศึกษา');
                        setButtonLink(isEditing
                            ? "/dashboard/project-proposal/document/" + editData.id
                            : "/dashboard/project-proposal/document/" + response.data.id);
                        setButtonText('ไปยังเอกสารเอกสาร พน.01');
                        setOpenResponseModal(true);
                    }
                    else {
                        handleSubmissionError();
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_8 = _a.sent();
                    handleSubmissionError();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var setFinalFormData = function (isDraft) {
        console.log('--set form--');
        var finalFormData = {
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
            universityIndentity: universityIndentity
        };
        return finalFormData;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { className: "py-2" },
            React.createElement("div", { className: "rounded-md border-2 border-gray-100 p-4 md:p-6" },
                React.createElement("div", { className: "mb-6 grid gap-6 md:grid-cols-3" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "faculty", className: "mb-2 block text-base font-medium " + (validationError.faculty ? 'text-red-600' : 'text-gray-900') }, "1.\u0E0A\u0E37\u0E48\u0E2D\u0E04\u0E13\u0E30/\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22/\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19 *"),
                        React.createElement(material_1.TextField, { type: "text", name: "faculty", className: "flex w-full", value: formInput.faculty, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.faculty), helperText: validationError.faculty })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "projectName", className: "mb-2 block text-base font-medium " + (validationError.projectName ? 'text-red-600' : 'text-gray-900') }, "2.\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 *"),
                        React.createElement(material_1.TextField, { type: "text", name: "projectName", className: "flex w-full", value: formInput.projectName, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.projectName), helperText: validationError.projectName })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "projectName", className: "mb-2 block text-base font-medium " + (validationError.projectName ? 'text-red-600' : 'text-gray-900') }, "\u0E1B\u0E35\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32 (\u0E1E.\u0E28.) *"),
                        React.createElement(material_1.TextField, { type: "number", name: "projectYear", className: "flex w-full", value: formInput.projectYear, onChange: handleInputChange, placeholder: "\u0E1B\u0E35\u0E1E\u0E38\u0E17\u0E18\u0E28\u0E31\u0E01\u0E23\u0E32\u0E0A (\u0E1E.\u0E28)", error: Boolean(validationError.projectYear), helperText: validationError.projectYear }))),
                React.createElement("div", { className: "grid gap-6 md:grid-cols-2" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "projectHead", className: "mb-2 block text-base font-medium " + (validationError.projectHead ? 'text-red-600' : 'text-gray-900') }, "3.\u0E1C\u0E39\u0E49\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23/\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 *"),
                        React.createElement(material_1.TextField, { type: "text", name: "projectHead", className: "flex w-full", value: formInput.projectHead, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.projectHead), helperText: validationError.projectHead })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "projectHeadPhone", className: "mb-2 block text-base font-medium " + (validationError.projectHeadPhone
                                ? 'text-red-600'
                                : 'text-gray-900') }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C *"),
                        React.createElement(material_1.TextField, { type: "text", name: "projectHeadPhone", className: "flex w-full", value: formInput.projectHeadPhone, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.projectHeadPhone), helperText: validationError.projectHeadPhone })),
                    React.createElement("div", null)),
                React.createElement("div", { className: "mb-6 grid gap-6 md:grid-cols-1" },
                    React.createElement("div", { className: "relative overflow-x-auto" },
                        React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                            React.createElement("thead", { className: "bg-gray-200 text-center text-base uppercase text-gray-700" },
                                React.createElement("tr", null,
                                    React.createElement("th", { scope: "col", className: "w-[10%] bg-gray-300 px-6 py-3" }, "\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E17\u0E35\u0E48"),
                                    React.createElement("th", { scope: "col", className: "px-6 py-3" }, "\u0E0A\u0E37\u0E48\u0E2D - \u0E2A\u0E01\u0E38\u0E25 *"),
                                    React.createElement("th", { scope: "col", className: "w-[15%] bg-gray-300 px-6 py-3" }, "\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                    React.createElement("th", { scope: "col", className: "w-[15%] px-6 py-3" }, "\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19 (\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C)"),
                                    React.createElement("th", { scope: "col", className: "w-[10%] bg-gray-300 px-6 py-3" }, "\u0E40\u0E1E\u0E34\u0E48\u0E21/\u0E25\u0E1A\u0E41\u0E16\u0E27"))),
                            React.createElement("tbody", null, responsibleRows.map(function (row) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                                return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                    React.createElement("th", { scope: "row", className: "bg-gray-50 px-6 py-4 text-center text-lg font-medium" }, row.id),
                                    React.createElement("td", { className: "px-6 py-4" },
                                        React.createElement("div", { className: "grid grid-cols-2 gap-6" },
                                            React.createElement(material_1.TextField, { type: "text", name: "firstname", className: "flex w-full", placeholder: "", value: row.firstname, onChange: function (e) {
                                                    return handleResponsibleChange(row.id, 'firstname', e.target.value);
                                                }, error: Boolean((_a = validationArrayError['responsible_firstname']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['responsible_firstname']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) || '' }),
                                            React.createElement(material_1.TextField, { type: "text", name: "lastname", className: "flex w-full", placeholder: "", value: row.lastname, onChange: function (e) {
                                                    return handleResponsibleChange(row.id, 'lastname', e.target.value);
                                                }, error: Boolean((_d = validationArrayError['responsible_lastname']) === null || _d === void 0 ? void 0 : _d.some(function (item) { return item.id === row.id; })), helperText: ((_f = (_e = validationArrayError['responsible_lastname']) === null || _e === void 0 ? void 0 : _e.find(function (item) { return item.id === row.id; })) === null || _f === void 0 ? void 0 : _f.error) || '' }))),
                                    React.createElement("td", { className: "bg-gray-50 px-6 py-4" },
                                        React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                            React.createElement(material_1.TextField, { type: "text", name: "position", className: "flex w-full", placeholder: "", value: row.position, onChange: function (e) {
                                                    return handleResponsibleChange(row.id, 'position', e.target.value);
                                                }, error: Boolean((_g = validationArrayError['responsible_position']) === null || _g === void 0 ? void 0 : _g.some(function (item) { return item.id === row.id; })), helperText: ((_j = (_h = validationArrayError['responsible_position']) === null || _h === void 0 ? void 0 : _h.find(function (item) { return item.id === row.id; })) === null || _j === void 0 ? void 0 : _j.error) || '' }))),
                                    React.createElement("td", { className: "px-6 py-4" },
                                        React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                            React.createElement(material_1.TextField, { type: "text", name: "work", className: "flex w-full ", placeholder: "", value: row.work, onChange: function (e) {
                                                    return handleResponsibleChange(row.id, 'work', e.target.value);
                                                }, error: Boolean((_k = validationArrayError['responsible_work']) === null || _k === void 0 ? void 0 : _k.some(function (item) { return item.id === row.id; })), helperText: ((_m = (_l = validationArrayError['responsible_work']) === null || _l === void 0 ? void 0 : _l.find(function (item) { return item.id === row.id; })) === null || _m === void 0 ? void 0 : _m.error) || '' }))),
                                    React.createElement("td", { className: "flex items-center justify-center bg-gray-50 px-6 py-4" },
                                        React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                            React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addResponsibleRow },
                                                React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                        responsibleRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                            React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () { return deleteResponsibleRow(row.id); } },
                                                React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" })))))));
                            }))))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "4.\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E22\u0E38\u0E17\u0E18\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E02\u0E2D\u0E07\u0E04\u0E13\u0E30\u0E27\u0E34\u0E0A\u0E32/\u0E21\u0E2B\u0E32\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E1E\u0E32\u0E22\u0E31\u0E1E *"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-2 block text-base font-medium " + (validationSelectError.strategicIssue
                                ? 'text-red-600'
                                : 'text-gray-900') }, "4.1 \u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19\u0E22\u0E38\u0E17\u0E18\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E17\u0E35\u0E48"),
                        React.createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationSelectError.strategicIssue) },
                            React.createElement(material_1.Select, { name: "strategicIssue", value: selectedValues.strategicIssue, onChange: handleSelectChange }, strategicIssueList.map(function (list) { return (React.createElement(material_1.MenuItem, { key: list.id, divider: true, value: list.id }, list.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationSelectError.strategicIssue))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-2 block text-base font-medium " + (validationSelectError.objective
                                ? 'text-red-600'
                                : 'text-gray-900') }, "4.2 \u0E40\u0E1B\u0E49\u0E32\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C\u0E17\u0E35\u0E48"),
                        React.createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationSelectError.objective) },
                            React.createElement(material_1.Select, { name: "objective", value: selectedValues.objective, onChange: handleSelectChange }, objectiveList.map(function (list) { return (React.createElement(material_1.MenuItem, { divider: true, key: list.id, value: list.id }, list.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationSelectError.objective))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-2 block text-base font-medium " + (validationSelectError.universityStrategic
                                ? 'text-red-600'
                                : 'text-gray-900') }, "4.3 \u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E21\u0E2B\u0E32\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E17\u0E35\u0E48"),
                        React.createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationSelectError.universityStrategic) },
                            React.createElement(material_1.Select, { name: "universityStrategic", value: selectedValues.universityStrategic, onChange: handleSelectChange }, universityStrategicList.map(function (list) { return (React.createElement(material_1.MenuItem, { divider: true, key: list.id, value: list.id }, list.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationSelectError.universityStrategic))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-2 block text-base font-medium " + (validationSelectError.strategicPlanKPI
                                ? 'text-red-600'
                                : 'text-gray-900') }, "4.4 \u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E41\u0E1C\u0E19\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C\u0E17\u0E35\u0E48"),
                        React.createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationSelectError.strategicPlanKPI) },
                            React.createElement(material_1.Select, { name: "strategicPlanKPI", value: selectedValues.strategicPlanKPI, onChange: handleSelectChange }, strategicPlanKPIList.map(function (list) { return (React.createElement(material_1.MenuItem, { divider: true, key: list.id, value: list.id }, list.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationSelectError.strategicPlanKPI))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-2 block text-base font-medium " + (validationSelectError.operationPlanKPI
                                ? 'text-red-600'
                                : 'text-gray-900') }, "4.5 \u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E41\u0E1C\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48"),
                        React.createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationSelectError.operationPlanKPI) },
                            React.createElement(material_1.Select, { name: "operationPlanKPI", value: selectedValues.operationPlanKPI, onChange: handleSelectChange }, operationPlanKPIList.map(function (list) { return (React.createElement(material_1.MenuItem, { divider: true, key: list.id, value: list.id }, list.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationSelectError.operationPlanKPI))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-2 block text-base font-medium " + (validationSelectError.projectKPI
                                ? 'text-red-600'
                                : 'text-gray-900') }, "4.6 \u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                        React.createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationSelectError.projectKPI) },
                            React.createElement(material_1.Select, { name: "projectKPI", value: selectedValues.projectKPI, onChange: handleSelectChange }, projectKPIList.map(function (list) { return (React.createElement(material_1.MenuItem, { divider: true, key: list.id, value: list.id }, list.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationSelectError.projectKPI))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "mb-2 block text-base font-medium " + (validationSelectError.projectStatus
                                ? 'text-red-600'
                                : 'text-gray-900') }, "4.7 \u0E2A\u0E16\u0E32\u0E19\u0E30\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                        React.createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationSelectError.projectStatus) },
                            React.createElement(material_1.Select, { name: "projectStatus", value: selectedValues.projectStatus, onChange: handleSelectChange }, projectStatusList.map(function (list) { return (React.createElement(material_1.MenuItem, { divider: true, key: list.id, value: list.id }, list.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationSelectError.projectStatus)))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium " + (validationError.projectTypes ? 'text-red-600' : 'text-gray-900') }, "5.\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 *"),
                React.createElement("div", { className: "mb-6 " + (validationError.projectTypes ? ' text-red-600' : 'text-gray-900') },
                    React.createElement("div", { className: "grid gap-x-6 gap-y-3 md:grid-cols-2" },
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "maintenance", type: "checkbox", checked: projectTypes.maintenance, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "maintenance", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E41\u0E1C\u0E19\u0E17\u0E33\u0E19\u0E38\u0E1A\u0E33\u0E23\u0E38\u0E07\u0E28\u0E34\u0E25\u0E1B\u0E27\u0E31\u0E12\u0E19\u0E18\u0E23\u0E23\u0E21")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "academic_service", type: "checkbox", checked: projectTypes.academic_service, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "academic_service", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E41\u0E1C\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "knowledge_management", type: "checkbox", checked: projectTypes.knowledge_management, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "knowledge_management", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E41\u0E1C\u0E19\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "research_promotion", type: "checkbox", checked: projectTypes.research_promotion, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "research_promotion", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E41\u0E1C\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E07\u0E32\u0E19\u0E27\u0E34\u0E08\u0E31\u0E22")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "education_quality_assurance", type: "checkbox", checked: projectTypes.education_quality_assurance, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "education_quality_assurance", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E41\u0E1C\u0E19\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "personnel_development", type: "checkbox", checked: projectTypes.personnel_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "personnel_development", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E41\u0E1C\u0E19\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "risk_management", type: "checkbox", checked: projectTypes.risk_management, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "risk_management", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E41\u0E1C\u0E19\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07"))),
                    React.createElement("div", { className: "my-3 rounded border " + (validationError.projectTypes
                            ? 'border-red-600'
                            : 'border-gray-200') },
                        React.createElement("div", { className: "grid gap-x-6 gap-y-3 md:grid-cols-1" },
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "student_development", type: "checkbox", checked: projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "student_development", className: "ms-2 w-full py-4 text-sm font-medium" },
                                    "\u0E41\u0E1C\u0E19\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32\u0E15\u0E32\u0E21\u0E01\u0E23\u0E2D\u0E1A\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E04\u0E38\u0E13\u0E27\u0E38\u0E12\u0E34 \u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32 ",
                                    React.createElement("b", null, "(\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E14\u0E49\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 1 \u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17)")))),
                        React.createElement("div", { className: (!projectTypes.student_development
                                ? 'bg-gray-100 text-gray-400'
                                : 'text-gray-900') + " grid gap-x-6 gap-y-0 px-2 pb-2 pt-0 md:grid-cols-2" },
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "moral_ethical", type: "checkbox", checked: projectTypes.moral_ethical &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "moral_ethical", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E14\u0E49\u0E32\u0E19\u0E04\u0E38\u0E13\u0E18\u0E23\u0E23\u0E21 \u0E08\u0E23\u0E34\u0E22\u0E18\u0E23\u0E23\u0E21")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "academic_promotion", type: "checkbox", checked: projectTypes.academic_promotion &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "academic_promotion", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E14\u0E49\u0E32\u0E19\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E04\u0E38\u0E13\u0E25\u0E31\u0E01\u0E29\u0E13\u0E30\u0E17\u0E35\u0E48\u0E1E\u0E36\u0E07\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "knowledge", type: "checkbox", checked: projectTypes.knowledge && projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "knowledge", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E14\u0E49\u0E32\u0E19\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "environment", type: "checkbox", checked: projectTypes.environment &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "environment", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E1A\u0E33\u0E40\u0E1E\u0E47\u0E0D\u0E1B\u0E23\u0E30\u0E42\u0E22\u0E0A\u0E19\u0E4C\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2A\u0E34\u0E48\u0E07\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "intellectual_skill", type: "checkbox", checked: projectTypes.intellectual_skill &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "intellectual_skill", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E14\u0E49\u0E32\u0E19\u0E17\u0E31\u0E01\u0E29\u0E30\u0E17\u0E32\u0E07\u0E1B\u0E31\u0E0D\u0E0D\u0E32")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "sport", type: "checkbox", checked: projectTypes.sport && projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "sport", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E01\u0E35\u0E2C\u0E32 \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "knowledge_analysis_communication_technology", type: "checkbox", checked: projectTypes.knowledge_analysis_communication_technology &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "knowledge_analysis_communication_technology", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E14\u0E49\u0E32\u0E19\u0E17\u0E31\u0E01\u0E29\u0E30\u0E14\u0E49\u0E32\u0E19\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "art_culture_development", type: "checkbox", checked: projectTypes.art_culture_development &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "art_culture_development", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E28\u0E34\u0E25\u0E1B\u0E30\u0E41\u0E25\u0E30\u0E27\u0E31\u0E12\u0E19\u0E18\u0E23\u0E23\u0E21")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "numerical_analysis_communication_technology", type: "checkbox", checked: projectTypes.numerical_analysis_communication_technology &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "numerical_analysis_communication_technology", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E14\u0E49\u0E32\u0E19\u0E17\u0E31\u0E01\u0E29\u0E30\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02 \u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E40\u0E17\u0E04\u0E42\u0E19\u0E42\u0E25\u0E22\u0E35")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "moral_ethical_development", type: "checkbox", checked: projectTypes.moral_ethical_development &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "moral_ethical_development", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E04\u0E38\u0E13\u0E18\u0E23\u0E23\u0E21 \u0E08\u0E23\u0E34\u0E22\u0E18\u0E23\u0E23\u0E21")),
                            React.createElement("div", { className: "flex items-center ps-4" },
                                React.createElement("input", { name: "leadership_development", type: "checkbox", checked: projectTypes.leadership_development &&
                                        projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "leadership_development", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E01\u0E29\u0E30\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E39\u0E49\u0E19\u0E33")),
                            React.createElement("div", { className: "ps-4" },
                                React.createElement("div", { className: "flex items-center" },
                                    React.createElement("input", { name: "sub_other", type: "checkbox", checked: projectTypes.sub_other &&
                                            projectTypes.student_development, disabled: !projectTypes.student_development, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                    React.createElement("label", { htmlFor: "sub_other", className: "ms-2 py-4 text-sm font-medium" }, "\u0E2D\u0E37\u0E48\u0E19\u0E46"),
                                    projectTypes.sub_other &&
                                        projectTypes.student_development && (React.createElement("div", { className: "w-full border-b border-gray-300 px-2" },
                                        React.createElement("input", { type: "text", name: "sub_other_detail", className: "flex w-full border-none ", placeholder: "\u0E42\u0E1B\u0E23\u0E14\u0E23\u0E30\u0E1A\u0E38", value: projectTypes.sub_other_detail || '', onChange: handleProjectTypeChange, disabled: isSubOtherDisabled, required: !isSubOtherDisabled }))))))),
                    React.createElement("div", { className: "grid gap-x-6 gap-y-3 md:grid-cols-2" },
                        React.createElement("div", { className: "rounded border " + (validationError.projectTypes
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("div", { className: "flex items-center" },
                                React.createElement("input", { name: "other", type: "checkbox", checked: projectTypes.other, onChange: handleProjectTypeChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                                React.createElement("label", { htmlFor: "other", className: "ms-2 py-4 text-sm font-medium" }, "\u0E2D\u0E37\u0E48\u0E19\u0E46"),
                                projectTypes.other && (React.createElement("div", { className: "w-full border-b border-gray-300 pl-2 pr-4" },
                                    React.createElement("input", { type: "text", name: "other_detail", className: "flex w-full border-none", placeholder: "\u0E42\u0E1B\u0E23\u0E14\u0E23\u0E30\u0E1A\u0E38", value: projectTypes.other_detail || '', onChange: handleProjectTypeChange, disabled: isOtherDisabled, required: !isOtherDisabled })))))),
                    validationError.projectTypes && (React.createElement("p", { className: "ml-3 pt-[4px] text-xs tracking-wider text-red-600" }, validationError.projectTypes))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium " + (validationError.universityIndentity
                        ? 'text-red-600'
                        : 'text-gray-900') }, "6.\u0E01\u0E32\u0E23\u0E15\u0E2D\u0E1A\u0E2A\u0E19\u0E2D\u0E07\u0E15\u0E48\u0E2D\u0E04\u0E38\u0E13\u0E25\u0E31\u0E01\u0E29\u0E13\u0E30\u0E02\u0E2D\u0E07\u0E1A\u0E31\u0E13\u0E11\u0E34\u0E15\u0E17\u0E35\u0E48\u0E1E\u0E36\u0E07\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C/\u0E2D\u0E31\u0E15\u0E25\u0E31\u0E01\u0E29\u0E13\u0E4C\u0E02\u0E2D\u0E07\u0E21\u0E2B\u0E32\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E1E\u0E32\u0E22\u0E31\u0E1E *"),
                React.createElement("div", { className: "mb-6 " + (validationError.universityIndentity
                        ? ' text-red-600'
                        : 'text-gray-900') },
                    React.createElement("div", { className: "grid gap-x-6 gap-y-3 md:grid-cols-2" },
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.universityIndentity
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "moral", type: "checkbox", checked: universityIndentity.moral, onChange: handleUniversityIndentityChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "bordered-checkbox-1", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E04\u0E38\u0E13\u0E18\u0E23\u0E23\u0E21\u0E19\u0E33\u0E43\u0E08")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.universityIndentity
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "serve", type: "checkbox", checked: universityIndentity.serve, onChange: handleUniversityIndentityChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "bordered-checkbox-1", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E23\u0E31\u0E1A\u0E43\u0E0A\u0E49\u0E2A\u0E31\u0E07\u0E04\u0E21")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.universityIndentity
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "academic", type: "checkbox", checked: universityIndentity.academic, onChange: handleUniversityIndentityChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "bordered-checkbox-1", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23\u0E01\u0E49\u0E32\u0E27\u0E2B\u0E19\u0E49\u0E32")),
                        React.createElement("div", { className: "flex items-center rounded border " + (validationError.universityIndentity
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            React.createElement("input", { name: "develop", type: "checkbox", checked: universityIndentity.develop, onChange: handleUniversityIndentityChange, className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500" }),
                            React.createElement("label", { htmlFor: "bordered-checkbox-1", className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E2A\u0E39\u0E48\u0E2A\u0E32\u0E01\u0E25"))),
                    validationError.universityIndentity && (React.createElement("p", { className: "ml-3 pt-[4px] text-xs tracking-wider text-red-600" }, validationError.universityIndentity))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium " + (validationError.principleReason ? 'text-red-600' : 'text-gray-900') }, "7.\u0E2B\u0E25\u0E31\u0E01\u0E01\u0E32\u0E23\u0E41\u0E25\u0E30\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25 *"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", { className: "grid gap-6 md:grid-cols-1" },
                        React.createElement(material_1.TextField, { name: "principleReason", multiline: true, rows: 5, sx: {
                                '.MuiOutlinedInput-root': {
                                    padding: 1
                                }
                            }, className: "flex w-full", helperText: validationError.principleReason, error: Boolean(validationError.principleReason), placeholder: "", value: formInput.principleReason, onChange: handleInputChange }))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "8.\u0E27\u0E31\u0E15\u0E16\u0E38\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C \u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14 \u0E04\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22/\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u0E41\u0E25\u0E30 \u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E37\u0E2D/\u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E27\u0E1A\u0E23\u0E27\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E32\u0E21\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14 *"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", { className: "grid gap-6 md:grid-cols-1" },
                        React.createElement("div", { className: "relative overflow-x-auto" },
                            React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                                React.createElement("thead", { className: "bg-gray-200 text-center text-base uppercase text-gray-700" },
                                    React.createElement("tr", null,
                                        React.createElement("th", { scope: "col", className: "bg-gray-300 px-6 py-3" }, "\u0E27\u0E31\u0E15\u0E16\u0E38\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                        React.createElement("th", { scope: "col", className: "px-6 py-3" }, "\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14"),
                                        React.createElement("th", { scope: "col", className: "bg-gray-300 px-6 py-3" }, "\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 (\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08)"),
                                        React.createElement("th", { scope: "col", className: "px-6 py-3" }, "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E37\u0E2D/\u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E27\u0E1A\u0E23\u0E27\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E32\u0E21\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14"),
                                        React.createElement("th", { scope: "col", className: "w-[10%] bg-gray-300 px-6 py-3" }, "\u0E40\u0E1E\u0E34\u0E48\u0E21/\u0E25\u0E1A\u0E41\u0E16\u0E27"))),
                                React.createElement("tbody", null, OIVTRows.map(function (row) {
                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                                    return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                        React.createElement("td", { className: "bg-gray-50 px-6 py-4" },
                                            React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                React.createElement(material_1.TextField, { type: "text", name: "objective", className: "flex w-full", placeholder: "", value: row.objective, onChange: function (e) {
                                                        return handleOIVTChange(row.id, 'objective', e.target.value);
                                                    }, error: Boolean((_a = validationArrayError['OIVT_objective']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['OIVT_objective']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) || '' }))),
                                        React.createElement("td", { className: "px-6 py-4" },
                                            React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                React.createElement(material_1.TextField, { type: "text", name: "indicator", className: "flex w-full", placeholder: "", value: row.indicator, onChange: function (e) {
                                                        return handleOIVTChange(row.id, 'indicator', e.target.value);
                                                    }, error: Boolean((_d = validationArrayError['OIVT_indicator']) === null || _d === void 0 ? void 0 : _d.some(function (item) { return item.id === row.id; })), helperText: ((_f = (_e = validationArrayError['OIVT_indicator']) === null || _e === void 0 ? void 0 : _e.find(function (item) { return item.id === row.id; })) === null || _f === void 0 ? void 0 : _f.error) || '' }))),
                                        React.createElement("td", { className: "bg-gray-50 px-6 py-4" },
                                            React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                React.createElement(material_1.TextField, { type: "text", name: "value", className: "flex w-full", placeholder: "", value: row.value, onChange: function (e) {
                                                        return handleOIVTChange(row.id, 'value', e.target.value);
                                                    }, error: Boolean((_g = validationArrayError['OIVT_value']) === null || _g === void 0 ? void 0 : _g.some(function (item) { return item.id === row.id; })), helperText: ((_j = (_h = validationArrayError['OIVT_value']) === null || _h === void 0 ? void 0 : _h.find(function (item) { return item.id === row.id; })) === null || _j === void 0 ? void 0 : _j.error) || '' }))),
                                        React.createElement("td", { className: "px-6 py-4" },
                                            React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                React.createElement(material_1.TextField, { type: "text", name: "tool", className: "flex w-full", placeholder: "", value: row.tool, onChange: function (e) {
                                                        return handleOIVTChange(row.id, 'tool', e.target.value);
                                                    }, error: Boolean((_k = validationArrayError['OIVT_tool']) === null || _k === void 0 ? void 0 : _k.some(function (item) { return item.id === row.id; })), helperText: ((_m = (_l = validationArrayError['OIVT_tool']) === null || _l === void 0 ? void 0 : _l.find(function (item) { return item.id === row.id; })) === null || _m === void 0 ? void 0 : _m.error) || '' }))),
                                        React.createElement("td", { className: "flex items-center justify-center bg-gray-50 px-6 py-4" },
                                            React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                                React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addOIVTRow },
                                                    React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                            OIVTRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                                React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () { return deleteOIVTRow(row.id); } },
                                                    React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" })))))));
                                })))))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "9.\u0E1B\u0E23\u0E30\u0E42\u0E22\u0E0A\u0E19\u0E4C\u0E17\u0E35\u0E48\u0E04\u0E32\u0E14\u0E27\u0E48\u0E32\u0E08\u0E30\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A *"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", { className: "grid gap-6 md:grid-cols-1" },
                        React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                            React.createElement("tbody", null, expectedResultRows.map(function (row) {
                                var _a, _b, _c;
                                return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                    React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4 text-center text-base" }, row.id),
                                    React.createElement("td", { className: "px-6 py-4" },
                                        React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                            React.createElement(material_1.TextField, { type: "text", id: "expected_result", className: "flex w-full", placeholder: "", value: row.expected_result, onChange: function (e) {
                                                    return handleExpectedResultChange(row.id, e.target.value);
                                                }, error: Boolean((_a = validationArrayError['expectedResult_expected_result']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['expectedResult_expected_result']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) || '' }))),
                                    React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4" },
                                        React.createElement("div", { className: "flex items-center justify-center" },
                                            React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                                React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addExpectedResultRow },
                                                    React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                            expectedResultRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                                React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () { return deleteExpectedResultRow(row.id); } },
                                                    React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" }))))))));
                            }))))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "10.\u0E27\u0E34\u0E18\u0E35\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E07\u0E32\u0E19\u0E41\u0E25\u0E30\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 *"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", { className: "grid gap-6 md:grid-cols-1" },
                        React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                            React.createElement("tbody", null, operationDurationRows.map(function (row) {
                                var _a, _b, _c;
                                return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                    React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4 text-center text-base" }, row.id),
                                    React.createElement("td", { className: "px-6 py-4" },
                                        React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                            React.createElement(material_1.TextField, { type: "text", id: "operation_duration", className: "flex w-full", placeholder: "", value: row.operation_duration, onChange: function (e) {
                                                    return handleOperationDurationChange(row.id, e.target.value);
                                                }, error: Boolean((_a = validationArrayError['operationDuration_operation_duration']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['operationDuration_operation_duration']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) || '' }))),
                                    React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4" },
                                        React.createElement("div", { className: "flex items-center justify-center" },
                                            React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                                React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addOperationDurationRow },
                                                    React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                            operationDurationRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                                React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () {
                                                        return deleteOperationDurationRow(row.id);
                                                    } },
                                                    React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" }))))))));
                            }))))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "11.\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E08\u0E31\u0E14\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E41\u0E25\u0E30\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E01\u0E32\u0E23"),
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-3 grid gap-6 md:grid-cols-2" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "projectLocation", className: "mb-2 block text-base font-medium " + (validationError.projectLocation
                                    ? 'text-red-600'
                                    : 'text-gray-900') }, "11.1 \u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E08\u0E31\u0E14\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 *"),
                            React.createElement(material_1.TextField, { type: "text", name: "projectLocation", className: "flex w-full", value: formInput.projectLocation, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.projectLocation), helperText: validationError.projectLocation })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "project_datetime", className: "mb-2 block text-base font-medium " + (validationError.projectDatetime
                                    ? 'text-red-600'
                                    : 'text-gray-900') },
                                React.createElement("p", { className: "flex items-center gap-1" }, "11.2 \u0E27\u0E31\u0E19/\u0E40\u0E27\u0E25\u0E32 \u0E17\u0E35\u0E48\u0E08\u0E31\u0E14\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 *")),
                            React.createElement(material_1.TextField, { type: "text", name: "projectDatetime", className: "flex w-full", value: formInput.projectDatetime, onChange: handleInputChange, placeholder: "\u0E27\u0E31\u0E19/\u0E40\u0E14\u0E37\u0E2D\u0E19/\u0E1B\u0E35", error: Boolean(validationError.projectDatetime), helperText: validationError.projectDatetime }))),
                    React.createElement("div", { className: "grid gap-6 md:grid-cols-1" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "countries", className: "mb-2 block text-base font-medium text-gray-900" }, "11.3 \u0E01\u0E33\u0E2B\u0E19\u0E14\u0E01\u0E32\u0E23 (\u0E42\u0E14\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14) *"),
                            React.createElement("div", { className: "mb-6" },
                                React.createElement("div", { className: "grid gap-6 md:grid-cols-1" },
                                    React.createElement("div", { className: "relative overflow-x-auto" },
                                        React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                                            React.createElement("thead", { className: "bg-gray-200 text-center text-base uppercase text-gray-700" },
                                                React.createElement("tr", null,
                                                    React.createElement("th", { scope: "col", className: "w-[15%] px-6 py-3" },
                                                        React.createElement("p", { className: "flex items-center justify-center gap-1" }, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48")),
                                                    React.createElement("th", { scope: "col", className: "w-[15%] bg-gray-300 px-6 py-3" },
                                                        React.createElement("p", { className: "flex items-center justify-center gap-1" }, "\u0E40\u0E27\u0E25\u0E32")),
                                                    React.createElement("th", { scope: "col", className: "px-6 py-3" }, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 *"),
                                                    React.createElement("th", { scope: "col", className: "w-[10%] bg-gray-300 px-6 py-3" }, "\u0E40\u0E1E\u0E34\u0E48\u0E21/\u0E25\u0E1A\u0E41\u0E16\u0E27"))),
                                            React.createElement("tbody", null, projectScheduleRows.map(function (row) {
                                                var _a, _b, _c;
                                                return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                                    React.createElement("td", { className: "px-6 py-4" },
                                                        React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                            React.createElement(material_1.TextField, { type: "text", name: "date", className: "flex w-full", variant: "outlined", placeholder: "\u0E27\u0E31\u0E19/\u0E40\u0E14\u0E37\u0E2D\u0E19/\u0E1B\u0E35", value: row.date, onChange: function (value) {
                                                                    return handleProjectScheduleChange(row.id, value);
                                                                } }))),
                                                    React.createElement("td", { className: "bg-gray-50 px-6 py-4" },
                                                        React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                            React.createElement(material_1.TextField, { type: "text", name: "time", className: "flex w-full", variant: "outlined", placeholder: "\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A 24 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07", value: row.time, onChange: function (value) {
                                                                    return handleProjectScheduleChange(row.id, value);
                                                                } }))),
                                                    React.createElement("td", { className: "px-6 py-4" },
                                                        React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                            React.createElement(material_1.TextField, { type: "text", name: "detail", className: "flex w-full", variant: "outlined", placeholder: "", value: row.detail, onChange: function (value) {
                                                                    return handleProjectScheduleChange(row.id, value);
                                                                }, error: Boolean((_a = validationArrayError['projectSchedule_detail']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['projectSchedule_detail']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) || '' }))),
                                                    React.createElement("td", { className: "flex items-center justify-center bg-gray-50 px-6 py-4" },
                                                        React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                                            React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addProjectScheduleRow },
                                                                React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                                        projectScheduleRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                                            React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () {
                                                                    return deleteProjectScheduleRow(row.id);
                                                                } },
                                                                React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" })))))));
                                            }))))))))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "12.\u0E27\u0E34\u0E17\u0E22\u0E32\u0E01\u0E23 (\u0E16\u0E49\u0E32\u0E21\u0E35)"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", { className: "mb-3 grid grid-cols-1 gap-6" },
                        React.createElement(material_1.TextField, { type: "text", name: "lecturer", className: "flex w-full", value: formInput.lecturer, onChange: handleInputChange, placeholder: "" }))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "13.\u0E1C\u0E39\u0E49\u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23/\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 *"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", { className: "grid gap-6 md:grid-cols-1" },
                        React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                            React.createElement("thead", { className: "bg-gray-200 text-center text-base uppercase text-gray-700" },
                                React.createElement("tr", null,
                                    React.createElement("th", { scope: "col", className: "w-[75%] bg-gray-300 px-6 py-3" }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"),
                                    React.createElement("th", { scope: "col", className: "w-[15%] px-6 py-3" }, "\u0E08\u0E33\u0E19\u0E27\u0E19/\u0E04\u0E19"),
                                    React.createElement("th", { scope: "col", className: "w-[10%] bg-gray-300 px-6 py-3" }, "\u0E40\u0E1E\u0E34\u0E48\u0E21/\u0E25\u0E1A\u0E41\u0E16\u0E27"))),
                            React.createElement("tbody", null,
                                targetRows.map(function (row) {
                                    var _a, _b, _c, _d, _e, _f;
                                    return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                        React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4 text-center text-base" },
                                            React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                React.createElement(material_1.TextField, { hiddenLabel: true, type: "text", id: "detail", className: "flex w-full", placeholder: "", value: row.detail, onChange: function (e) {
                                                        return handleTargetChange(row.id, 'detail', e.target.value);
                                                    }, error: Boolean((_a = validationArrayError['target_detail']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['target_detail']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) || '' }))),
                                        React.createElement("td", { className: "px-6 py-4" },
                                            React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                React.createElement(material_1.TextField, { hiddenLabel: true, type: "number", name: "count", className: "flex w-full", placeholder: "", value: row.count, onChange: function (e) {
                                                        return handleTargetChange(row.id, 'count', e.target.value);
                                                    }, onBlur: calculateTargetTotal, error: Boolean((_d = validationArrayError['target_count']) === null || _d === void 0 ? void 0 : _d.some(function (item) { return item.id === row.id; })), helperText: ((_f = (_e = validationArrayError['target_count']) === null || _e === void 0 ? void 0 : _e.find(function (item) { return item.id === row.id; })) === null || _f === void 0 ? void 0 : _f.error) || '' }))),
                                        React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4" },
                                            React.createElement("div", { className: "flex items-center justify-center" },
                                                React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                                    React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addTargetRow },
                                                        React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                                targetRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                                    React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () { return deleteTargetRow(row.id); } },
                                                        React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" }))))))));
                                }),
                                React.createElement("tr", null,
                                    React.createElement("td", { className: "py-2 text-right font-bold" }, "\u0E23\u0E27\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19"),
                                    React.createElement("td", { className: "px-6 py-2 text-right font-bold" }, targetTotal),
                                    React.createElement("td", { className: "py-2 text-left font-bold" }, "\u0E04\u0E19")))))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium " + (validationError.improvement ? 'text-red-600' : 'text-gray-900') }, "14.\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E02\u0E2D\u0E07\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1C\u0E48\u0E32\u0E19\u0E21\u0E32/\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E21\u0E35\u0E25\u0E31\u0E01\u0E29\u0E13\u0E30\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07\u0E01\u0E31\u0E19 *"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", null,
                        React.createElement(material_1.TextField, { name: "improvement", rows: 5, multiline: true, className: "flex w-full", sx: {
                                '.MuiOutlinedInput-root': {
                                    padding: 1
                                }
                            }, placeholder: "", helperText: validationError.improvement, error: Boolean(validationError.improvement), value: formInput.improvement, onChange: handleInputChange }))),
                React.createElement("h3", { className: "mb-2 block text-base font-medium text-gray-900 " }, "15.\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13"),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("div", { className: "mb-3 grid gap-6 md:grid-cols-1" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "project_location", className: "mb-2 block text-base font-medium text-gray-900" }, "15.1 \u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A *"),
                            React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                                React.createElement("thead", { className: "bg-gray-200 text-center text-base uppercase text-gray-700" },
                                    React.createElement("tr", null,
                                        React.createElement("th", { scope: "col", className: "w-[10%] px-6 py-3" }, "\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E17\u0E35\u0E48"),
                                        React.createElement("th", { scope: "col", className: "w-[40%] bg-gray-300 px-6 py-3" }, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"),
                                        React.createElement("th", { scope: "col", className: "w-[20%] px-6 py-3" }, "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19"),
                                        React.createElement("th", { scope: "col", className: "w-[20%] bg-gray-300 px-6 py-3" }, "\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A"),
                                        React.createElement("th", { scope: "col", className: "w-[10%] px-6 py-3" }, "\u0E40\u0E1E\u0E34\u0E48\u0E21/\u0E25\u0E1A\u0E41\u0E16\u0E27"))),
                                React.createElement("tbody", null,
                                    budgetIncomeRows.map(function (row) {
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                        return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                            React.createElement("th", { scope: "row", className: "px-6 py-4 text-center text-lg font-medium" }, row.id),
                                            React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4 text-center text-base" },
                                                React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                    React.createElement(material_1.TextField, { hiddenLabel: true, type: "text", name: "detail", className: "flex w-full", placeholder: "", value: row.detail, onChange: function (e) {
                                                            return handleBudgetIncomeChange(row.id, 'detail', e.target.value);
                                                        }, error: Boolean((_a = validationArrayError['budgetIncome_detail']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['budgetIncome_detail']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) ||
                                                            '' }))),
                                            React.createElement("td", { className: "px-6 py-4" },
                                                React.createElement("div", { className: "grid grid-cols-1 gap-0" },
                                                    React.createElement(material_1.OutlinedInput
                                                    // hiddenLabel
                                                    , { 
                                                        // hiddenLabel
                                                        type: "number", name: "amount", endAdornment: React.createElement(material_1.InputAdornment, { position: "end" }, "\u0E1A\u0E32\u0E17"), className: "flex w-full", placeholder: "", value: row.amount, onChange: function (e) {
                                                            return handleBudgetIncomeChange(row.id, 'amount', e.target.value);
                                                        }, error: Boolean((_d = validationArrayError['budgetIncome_amount']) === null || _d === void 0 ? void 0 : _d.some(function (item) { return item.id === row.id; })) }),
                                                    React.createElement(material_1.FormHelperText, { className: "ml-3 text-red-700" }, ((_f = (_e = validationArrayError['budgetIncome_amount']) === null || _e === void 0 ? void 0 : _e.find(function (item) { return item.id === row.id; })) === null || _f === void 0 ? void 0 : _f.error) ||
                                                        ''))),
                                            React.createElement("td", { className: "bg-gray-50 px-6 py-4" },
                                                React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                    React.createElement(material_1.TextField, { hiddenLabel: true, type: "text", name: "source", className: "flex w-full", placeholder: "\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E2B\u0E21\u0E27\u0E14", value: row.source, onChange: function (e) {
                                                            return handleBudgetIncomeChange(row.id, 'source', e.target.value);
                                                        }, error: Boolean((_g = validationArrayError['budgetIncome_source']) === null || _g === void 0 ? void 0 : _g.some(function (item) { return item.id === row.id; })), helperText: ((_j = (_h = validationArrayError['budgetIncome_source']) === null || _h === void 0 ? void 0 : _h.find(function (item) { return item.id === row.id; })) === null || _j === void 0 ? void 0 : _j.error) ||
                                                            '' }))),
                                            React.createElement("td", null,
                                                React.createElement("div", { className: "flex items-center justify-center" },
                                                    React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                                        React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addBudgetIncomeRow },
                                                            React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                                    budgetIncomeRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                                        React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () { return deleteBudgetIncomeRow(row.id); } },
                                                            React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" }))))))));
                                    }),
                                    React.createElement("tr", null,
                                        React.createElement("td", { colSpan: 2, className: "py-2 text-right font-bold" }, "\u0E23\u0E27\u0E21\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A"),
                                        React.createElement("td", { className: "px-6 py-2 text-right font-bold" }, budgetIncomeTotal),
                                        React.createElement("td", { colSpan: 2, className: "py-2 text-left font-bold" }, "\u0E1A\u0E32\u0E17"))))),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "project_location", className: "mb-2 block text-base font-medium text-gray-900" }, "15.2 \u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22 *"),
                            React.createElement("table", { className: "w-full rounded border text-left text-sm text-gray-500" },
                                React.createElement("thead", { className: "bg-gray-200 text-center text-base uppercase text-gray-700" },
                                    React.createElement("tr", null,
                                        React.createElement("th", { scope: "col", className: "w-[10%] px-6 py-3" }, "\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E17\u0E35\u0E48"),
                                        React.createElement("th", { scope: "col", className: "w-[40%] bg-gray-300 px-6 py-3" }, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"),
                                        React.createElement("th", { scope: "col", className: "w-[20%] px-6 py-3" }, "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19"),
                                        React.createElement("th", { scope: "col", className: "w-[20%] bg-gray-300 px-6 py-3" }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"),
                                        React.createElement("th", { scope: "col", className: "w-[10%] px-6 py-3" }, "\u0E40\u0E1E\u0E34\u0E48\u0E21/\u0E25\u0E1A\u0E41\u0E16\u0E27"))),
                                React.createElement("tbody", null,
                                    budgetExpenseRows.map(function (row) {
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                        return (React.createElement("tr", { className: "border-b bg-white", key: row.id },
                                            React.createElement("th", { scope: "row", className: "px-6 py-4 text-center text-lg font-medium" }, row.id),
                                            React.createElement("td", { className: "w-[10%] bg-gray-50 px-6 py-4 text-center text-base" },
                                                React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                    React.createElement(material_1.TextField, { hiddenLabel: true, type: "text", name: "detail", className: "flex w-full", placeholder: "", value: row.detail, onChange: function (e) {
                                                            return handleBudgetExpenseChange(row.id, 'detail', e.target.value);
                                                        }, error: Boolean((_a = validationArrayError['budgetExpense_detail']) === null || _a === void 0 ? void 0 : _a.some(function (item) { return item.id === row.id; })), helperText: ((_c = (_b = validationArrayError['budgetExpense_detail']) === null || _b === void 0 ? void 0 : _b.find(function (item) { return item.id === row.id; })) === null || _c === void 0 ? void 0 : _c.error) ||
                                                            '' }))),
                                            React.createElement("td", { className: "px-6 py-4" },
                                                React.createElement("div", { className: "grid grid-cols-1 gap-0" },
                                                    React.createElement(material_1.OutlinedInput
                                                    // hiddenLabel
                                                    , { 
                                                        // hiddenLabel
                                                        type: "number", name: "amount", endAdornment: React.createElement(material_1.InputAdornment, { position: "end" }, "\u0E1A\u0E32\u0E17"), className: "flex w-full", placeholder: "", value: row.amount, onChange: function (e) {
                                                            return handleBudgetExpenseChange(row.id, 'amount', e.target.value);
                                                        }, error: Boolean((_d = validationArrayError['budgetExpense_amount']) === null || _d === void 0 ? void 0 : _d.some(function (item) { return item.id === row.id; })) }),
                                                    React.createElement(material_1.FormHelperText, { className: "ml-3 text-red-700" }, ((_f = (_e = validationArrayError['budgetExpense_amount']) === null || _e === void 0 ? void 0 : _e.find(function (item) { return item.id === row.id; })) === null || _f === void 0 ? void 0 : _f.error) ||
                                                        ''))),
                                            React.createElement("td", { className: "bg-gray-50 px-6 py-4" },
                                                React.createElement("div", { className: "grid grid-cols-1 gap-6" },
                                                    React.createElement(material_1.TextField, { hiddenLabel: true, type: "text", name: "note", className: "flex w-full", placeholder: "", value: row.note, onChange: function (e) {
                                                            return handleBudgetExpenseChange(row.id, 'note', e.target.value);
                                                        }, error: Boolean((_g = validationArrayError['budgetExpense_note']) === null || _g === void 0 ? void 0 : _g.some(function (item) { return item.id === row.id; })), helperText: ((_j = (_h = validationArrayError['budgetExpense_note']) === null || _h === void 0 ? void 0 : _h.find(function (item) { return item.id === row.id; })) === null || _j === void 0 ? void 0 : _j.error) ||
                                                            '' }))),
                                            React.createElement("td", null,
                                                React.createElement("div", { className: "flex items-center justify-center" },
                                                    React.createElement(material_1.Tooltip, { title: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E16\u0E27" },
                                                        React.createElement(material_1.IconButton, { "aria-label": "add_row", size: "small", onClick: addBudgetExpenseRow },
                                                            React.createElement(outline_1.PlusCircleIcon, { className: "h-9 w-9" }))),
                                                    budgetExpenseRows.length > 1 && (React.createElement(material_1.Tooltip, { title: "\u0E25\u0E1A\u0E41\u0E16\u0E27" },
                                                        React.createElement(material_1.IconButton, { "aria-label": "delete_row", size: "small", onClick: function () { return deleteBudgetExpenseRow(row.id); } },
                                                            React.createElement(outline_1.XCircleIcon, { className: "h-9 w-9" }))))))));
                                    }),
                                    React.createElement("tr", null,
                                        React.createElement("td", { colSpan: 2, className: "py-2 text-right font-bold" }, "\u0E23\u0E27\u0E21\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22"),
                                        React.createElement("td", { className: "px-6 py-2 text-right font-bold" }, budgetExpenseTotal),
                                        React.createElement("td", { colSpan: 2, className: "py-2 text-left font-bold" }, "\u0E1A\u0E32\u0E17"))))))))),
        React.createElement("div", { className: "mt-6 flex justify-end gap-4" },
            React.createElement(link_1["default"], { href: "/dashboard/project-proposal/document/", className: "flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200" }, "Test Document"),
            React.createElement("button", { onClick: function () { return handleOpenModal(true, false, false); }, className: "flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200" }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"),
            React.createElement("button", { onClick: function () { return handleOpenModal(false, true, false); }, className: "flex h-10 items-center rounded-lg border border-blue-500 px-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100" }, "\u0E41\u0E1A\u0E1A\u0E23\u0E48\u0E32\u0E07"),
            React.createElement(button_1.Button, { onClick: function () { return handleOpenModal(false, false, true); } }, "\u0E15\u0E01\u0E25\u0E07"),
            React.createElement(modal_1.ModalQuestion, { openModal: openQuestionModal, onCloseModal: handleCloseModal, title: titleModal, detail: detailModal, okAction: handleAction, onOk: function (action) {
                    if (action === 'draft') {
                        handleDraft();
                    }
                    else if (action === 'submit') {
                        handleSubmit();
                    }
                    else if (action === 'cancel') {
                        router.push('/dashboard/project-proposal', { scroll: false });
                    }
                } }),
            React.createElement(modal_1.ModalResponse, { openModal: openResponseModal, onCloseModal: handleCloseModal, title: titleModal, detail: detailModal, isSuccess: modalSuccess, isError: modalError, buttonLink: buttonLink, buttonText: buttonText }),
            React.createElement(loading_screen_1.OverlayLoading, { showLoading: loading }))));
}
exports["default"] = PN01Form;
