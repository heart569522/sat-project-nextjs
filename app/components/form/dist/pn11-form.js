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
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var link_1 = require("next/link");
var button_1 = require("../button");
var api_service_1 = require("@/app/lib/api-service");
var navigation_1 = require("next/navigation");
var modal_1 = require("../modal");
function PN11Form() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(false), openModal = _a[0], setOpenModal = _a[1];
    var _b = react_1.useState(''), titleModal = _b[0], setTitleModal = _b[1];
    var _c = react_1.useState(''), detailModal = _c[0], setDetailModal = _c[1];
    var _d = react_1.useState(''), handleAction = _d[0], setHandleAction = _d[1];
    var handleOpenModal = function (isCancel, isSubmit) {
        console.log('handleOpenModal');
        if (isCancel) {
            setTitleModal('ยกเลิกการร้องขอระเบียนกิจกรรม');
            setDetailModal('คุณยืนยันที่จะยกเลิกคำร้องขอระเบียนกิจกรรม');
            setHandleAction('cancel');
            setOpenModal(true);
        }
        if (isSubmit) {
            var isFormValid = validateForm();
            if (isFormValid) {
                setTitleModal('ร้องขอระเบียนกิจกรรม');
                setDetailModal('คุณยืนยันที่จะส่งข้อมูลคำร้องขอระเบียนกิจกรรม');
                setHandleAction('submit');
                setOpenModal(true);
            }
        }
    };
    var handleCloseModal = function () {
        setOpenModal(false);
    };
    var _e = react_1.useState({
        firstname: '',
        lastname: '',
        studentId: '',
        phone: '',
        major: '',
        faculty: '',
        email: '',
        recipientName: '',
        recipientAddress: '',
        recipientPhone: ''
    }), formInput = _e[0], setFormInput = _e[1];
    var _f = react_1.useState([]), faculties = _f[0], setFaculties = _f[1];
    var _g = react_1.useState([]), majors = _g[0], setMajors = _g[1];
    var getFaculties = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_service_1.getAllData('faculties')];
                case 1:
                    data = _a.sent();
                    setFaculties(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getMajors = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_service_1.getAllData('majors')];
                case 1:
                    data = _a.sent();
                    setMajors(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        console.log('fetch list fac/major');
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getFaculties()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getMajors()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var _h = react_1.useState({
        deliveryMethod: ''
    }), formRadio = _h[0], setFormRadio = _h[1];
    var isSending = formRadio.deliveryMethod == 'send';
    var checkSendRadio = function () {
        if (!isSending) {
            setFormInput(function (prevTypes) { return (__assign(__assign({}, prevTypes), { recipientName: '', recipientAddress: '', recipientPhone: '' })); });
            setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { recipientName: '', recipientAddress: '', recipientPhone: '' })); });
        }
    };
    react_1.useEffect(function () {
        checkSendRadio();
    }, [isSending]);
    var _j = react_1.useState({}), validationError = _j[0], setValidationError = _j[1];
    var handleInputChange = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        setFormInput(function (prevValues) {
            var _a;
            return (__assign(__assign({}, prevValues), (_a = {}, _a[name] = value, _a)));
        });
        setValidationError(function (prevErrors) {
            var _a;
            return (__assign(__assign({}, prevErrors), (_a = {}, _a[name] = '', _a)));
        });
    };
    var handleFacultyChange = function (event) {
        var facultyValue = event.target.value;
        setFormInput(function (prevInput) { return (__assign(__assign({}, prevInput), { faculty: facultyValue, major: '' })); });
        setValidationError(function (prevError) { return (__assign(__assign({}, prevError), { faculty: '' })); });
    };
    var handleMajorChange = function (event) {
        var majorValue = event.target.value;
        setFormInput(function (prevInput) { return (__assign(__assign({}, prevInput), { major: majorValue })); });
        setValidationError(function (prevError) { return (__assign(__assign({}, prevError), { major: '' })); });
    };
    var handleRadioChange = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        setFormRadio(function (prevTypes) {
            var _a;
            return (__assign(__assign({}, prevTypes), (_a = {}, _a[name] = value, _a)));
        });
        setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { formRadio: '' })); });
    };
    var validateForm = function () {
        var isValid = true;
        var excludedFields = [
            'recipientName',
            'recipientAddress',
            'recipientPhone',
        ];
        console.log('--validateForm--');
        var _loop_1 = function (key) {
            if (Object.prototype.hasOwnProperty.call(formInput, key)) {
                if (!isSending) {
                    if (excludedFields.includes(key)) {
                        return "continue";
                    }
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
        // Validate formRadio
        if (!formRadio.deliveryMethod) {
            isValid = false;
            setValidationError(function (prevErrors) { return (__assign(__assign({}, prevErrors), { formRadio: "\u0E42\u0E1B\u0E23\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07" })); });
            console.error("Delivery method is required.");
        }
        return isValid;
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData, apiPath, res, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = setFinalFormData();
                    console.log('formData: ', formData);
                    apiPath = 'activity-transcript';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api_service_1.createData(apiPath, formData)];
                case 2:
                    res = _a.sent();
                    if (res && res.status === 201) {
                        console.log('Create success!');
                        console.log('id: ', res.data.id);
                        router.push("/dashboard/activity-history/transcript/document/" + res.data.id);
                    }
                    else {
                        console.error('Create failed, please try again later');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error while submitting data:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var setFinalFormData = function () {
        console.log('--set form--');
        var finalFormData = {
            firstname: formInput.firstname,
            lastname: formInput.lastname,
            studentId: formInput.studentId,
            phone: formInput.phone,
            faculty: formInput.faculty,
            major: formInput.major,
            email: formInput.email,
            deliveryMethod: formRadio.deliveryMethod,
            recipientName: formInput.recipientName,
            recipientAddress: formInput.recipientAddress,
            recipientPhone: formInput.recipientPhone
        };
        return finalFormData;
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("form", { className: "py-2" },
            react_1["default"].createElement("div", { className: "mb-6 rounded-md border-2 border-gray-100 p-4 md:p-6" },
                react_1["default"].createElement("div", { className: "mb-0 grid gap-6 md:grid-cols-2" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "firstname", className: "mb-2 block text-base font-medium " + (validationError.firstname ? 'text-red-600' : 'text-gray-900') }, "\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07"),
                        react_1["default"].createElement(material_1.TextField, { type: "text", name: "firstname", className: "flex w-full", value: formInput.firstname, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.firstname), helperText: validationError.firstname })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "lastname", className: "mb-2 block text-base font-medium " + (validationError.lastname ? 'text-red-600' : 'text-gray-900') }, "\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25"),
                        react_1["default"].createElement(material_1.TextField, { type: "text", name: "lastname", className: "flex w-full", value: formInput.lastname, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.lastname), helperText: validationError.lastname })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "studentId", className: "mb-2 block text-base font-medium " + (validationError.studentId ? 'text-red-600' : 'text-gray-900') }, "\u0E23\u0E2B\u0E31\u0E2A\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32"),
                        react_1["default"].createElement(material_1.TextField, { type: "text", name: "studentId", className: "flex w-full", value: formInput.studentId, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.studentId), helperText: validationError.studentId })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "phone", className: "mb-2 block text-base font-medium " + (validationError.phone ? 'text-red-600' : 'text-gray-900') }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C"),
                        react_1["default"].createElement(material_1.TextField, { type: "text", name: "phone", className: "flex w-full", value: formInput.phone, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.phone), helperText: validationError.phone })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "faculty", className: "mb-2 block text-base font-medium " + (validationError.faculty ? 'text-red-600' : 'text-gray-900') }, "\u0E04\u0E13\u0E30/\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22"),
                        react_1["default"].createElement(material_1.FormControl, { className: "flex w-full", error: Boolean(validationError.faculty) },
                            react_1["default"].createElement(material_1.Select, { name: "faculty", value: formInput.faculty, onChange: handleFacultyChange }, faculties.map(function (faculty) { return (react_1["default"].createElement(material_1.MenuItem, { divider: true, key: faculty.id, value: faculty.id }, faculty.name)); })),
                            react_1["default"].createElement(material_1.FormHelperText, null, validationError.faculty))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "major", className: "mb-2 block text-base font-medium " + (formInput.faculty ? "text-gray-900" : "text-gray-400") + " " }, "\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32"),
                        react_1["default"].createElement(material_1.FormControl, { className: "flex w-full" },
                            react_1["default"].createElement(material_1.Select, { name: "major", value: formInput.major, onChange: handleMajorChange, disabled: !formInput.faculty }, majors
                                .filter(function (major) { return major.faculty_id === Number(formInput.faculty); })
                                .map(function (filteredMajor) { return (react_1["default"].createElement(material_1.MenuItem, { divider: true, key: filteredMajor.id, value: filteredMajor.id }, filteredMajor.name)); })))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "email", className: "mb-2 block text-base font-medium " + (validationError.email ? 'text-red-600' : 'text-gray-900') }, "Email (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E2A\u0E48\u0E07\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23)"),
                        react_1["default"].createElement(material_1.TextField, { type: "email", name: "email", className: "flex w-full", value: formInput.email, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.email), helperText: validationError.email })))),
            react_1["default"].createElement("div", { className: "rounded-md border-2 border-gray-100 p-4 md:p-6" },
                react_1["default"].createElement("h3", { className: "mb-3 block text-lg font-medium " + (validationError.formRadio ? 'text-red-600' : 'text-gray-900') }, "\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23"),
                react_1["default"].createElement("div", { className: "mb-6 " + (validationError.formRadio ? ' text-red-600' : 'text-gray-900') },
                    react_1["default"].createElement("div", { className: (validationError.formRadio ? 'mb-0' : 'mb-6') + " grid gap-x-6 gap-y-3 md:grid-cols-2" },
                        react_1["default"].createElement("div", { className: "flex items-center rounded border " + (validationError.formRadio
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            react_1["default"].createElement("input", { name: "deliveryMethod", type: "radio", value: "receive", checked: formRadio.deliveryMethod === 'receive', onChange: handleRadioChange, className: "h-5 w-5 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500" }),
                            react_1["default"].createElement("label", { className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E23\u0E31\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22\u0E15\u0E19\u0E40\u0E2D\u0E07 \u0E17\u0E35\u0E48 \u0E2A\u0E33\u0E19\u0E31\u0E01\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32")),
                        react_1["default"].createElement("div", { className: "flex items-center rounded border " + (validationError.formRadio
                                ? 'border-red-600'
                                : 'border-gray-200') + " ps-4" },
                            react_1["default"].createElement("input", { name: "deliveryMethod", type: "radio", value: "send", checked: formRadio.deliveryMethod === 'send', onChange: handleRadioChange, className: "h-5 w-5 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500" }),
                            react_1["default"].createElement("label", { className: "ms-2 w-full py-4 text-sm font-medium" }, "\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07\u0E17\u0E32\u0E07\u0E44\u0E1B\u0E23\u0E29\u0E13\u0E35\u0E22\u0E4C \u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E44\u0E1B\u0E23\u0E29\u0E13\u0E35\u0E22\u0E4C 33 \u0E1A\u0E32\u0E17"))),
                    validationError.formRadio && (react_1["default"].createElement("p", { className: "ml-3 pt-[4px] text-xs tracking-wider text-red-600" }, validationError.formRadio)),
                    isSending && (react_1["default"].createElement("div", { className: "mb-0 grid gap-3 md:grid-cols-1" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { htmlFor: "recipientName", className: "mb-2 block text-base font-medium " + (validationError.recipientName
                                    ? 'text-red-600'
                                    : 'text-gray-900') }, "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 (\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A)"),
                            react_1["default"].createElement(material_1.TextField, { type: "text", name: "recipientName", className: "flex w-full", value: formInput.recipientName, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.recipientName), helperText: validationError.recipientName })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { htmlFor: "recipientAddress", className: "mb-2 block text-base font-medium " + (validationError.recipientAddress
                                    ? 'text-red-600'
                                    : 'text-gray-900') }, "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07 (\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A)"),
                            react_1["default"].createElement(material_1.TextField, { type: "text", name: "recipientAddress", className: "flex w-full", value: formInput.recipientAddress, onChange: handleInputChange, placeholder: "", multiline: true, rows: 4, sx: {
                                    '.MuiOutlinedInput-root': {
                                        padding: 1
                                    }
                                }, error: Boolean(validationError.recipientAddress), helperText: validationError.recipientAddress })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { htmlFor: "recipientPhone", className: "mb-2 block text-base font-medium " + (validationError.recipientPhone
                                    ? 'text-red-600'
                                    : 'text-gray-900') }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C (\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A)"),
                            react_1["default"].createElement(material_1.TextField, { type: "text", name: "recipientPhone", className: "flex w-full", value: formInput.recipientPhone, onChange: handleInputChange, placeholder: "", error: Boolean(validationError.recipientPhone), helperText: validationError.recipientPhone }))))))),
        react_1["default"].createElement("div", { className: "mt-6 flex justify-end gap-4" },
            react_1["default"].createElement(link_1["default"], { href: "/dashboard/activity-history/transcript/document/", className: "flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200" }, "Test Document"),
            react_1["default"].createElement("button", { onClick: function () { return handleOpenModal(true, false); }, className: "flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200" }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"),
            react_1["default"].createElement(button_1.Button, { onClick: function () { return handleOpenModal(false, true); } }, "\u0E15\u0E01\u0E25\u0E07")),
        react_1["default"].createElement(modal_1.ModalQuestion, { openModal: openModal, onCloseModal: handleCloseModal, title: titleModal, detail: detailModal, okAction: handleAction, onOk: function (action) {
                console.log(action);
                if (action === 'submit') {
                    handleSubmit();
                }
                else if (action === 'cancel') {
                    router.push('/dashboard/activity-history/', { scroll: false });
                }
            } })));
}
exports["default"] = PN11Form;
