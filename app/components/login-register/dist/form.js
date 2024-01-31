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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var React = require("react");
var Tabs_1 = require("@mui/material/Tabs");
var Tab_1 = require("@mui/material/Tab");
var Typography_1 = require("@mui/material/Typography");
var Box_1 = require("@mui/material/Box");
var react_1 = require("react");
var FormControl_1 = require("@mui/material/FormControl");
var material_1 = require("@mui/material");
var link_1 = require("next/link");
var button_1 = require("../button/button");
var api_service_1 = require("@/app/lib/api-service");
function CustomTabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "simple-tabpanel-" + index, "aria-labelledby": "simple-tab-" + index }, other), value === index && (React.createElement(Box_1["default"], { sx: { p: 2 } },
        React.createElement(Typography_1["default"], null, children)))));
}
function a11yProps(index) {
    return {
        id: "simple-tab-" + index,
        'aria-controls': "simple-tabpanel-" + index
    };
}
function Form() {
    var _this = this;
    var _a = react_1.useState(0), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var _b = react_1.useState({
        firstname: '',
        lastname: '',
        studentId: '',
        phone: '',
        major: '',
        faculty: '',
        email: '',
        username: '',
        password: ''
    }), formInput = _b[0], setFormInput = _b[1];
    var _c = react_1.useState([]), faculties = _c[0], setFaculties = _c[1];
    var _d = react_1.useState([]), majors = _d[0], setMajors = _d[1];
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
    var _e = react_1.useState({
        formRole: ''
    }), formRadio = _e[0], setFormRadio = _e[1];
    var isStudent = formRadio.formRole == 'student';
    var _f = react_1.useState({}), validationError = _f[0], setValidationError = _f[1];
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
    return (React.createElement(Box_1["default"], { sx: { width: '100%' } },
        React.createElement(Box_1["default"], { sx: { borderBottom: 1, borderColor: 'divider' } },
            React.createElement(Tabs_1["default"], { value: value, onChange: handleChange, "aria-label": "login-registerSelectedTab" },
                React.createElement(Tab_1["default"], __assign({ label: "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A" }, a11yProps(0))),
                React.createElement(Tab_1["default"], __assign({ label: "\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01" }, a11yProps(1))))),
        React.createElement(CustomTabPanel, { value: value, index: 0 },
            React.createElement("div", { className: "w-full max-w-xs" },
                React.createElement("form", { className: "mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md" },
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("label", { className: "mb-2 block text-sm font-bold text-gray-700" }, "Username"),
                        React.createElement("input", { className: "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none", id: "username", type: "text", placeholder: "Username" })),
                    React.createElement("div", { className: "mb-6" },
                        React.createElement("label", { className: "mb-2 block text-sm font-bold text-gray-700" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19"),
                        React.createElement("input", { className: "focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none", id: "password", type: "password", placeholder: "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19 6 \u0E15\u0E31\u0E27" })),
                    React.createElement("div", { className: "flex items-center justify-center" },
                        React.createElement("button", { className: "focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none", type: "button" }, "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A"))))),
        React.createElement(CustomTabPanel, { value: value, index: 1 },
            React.createElement("form", { action: "", className: "grid grid-cols-2" },
                React.createElement("div", { className: "grid grid-cols-2" },
                    React.createElement("div", { className: "mb-6 w-full md:mb-0 md:ps-2" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "grid-first-name" }, "\u0E0A\u0E37\u0E48\u0E2D"),
                        React.createElement("input", { className: "mb-3 block w-full appearance-none rounded border bg-white py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none", id: "grid-first-name", type: "text", placeholder: "\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07" })),
                    React.createElement("div", { className: "mb-6 w-full md:mb-0 md:ps-2" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "grid-last-name" }, "\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25"),
                        React.createElement("input", { className: "mb-3 block w-full appearance-none rounded border bg-white py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none", id: "grid-last-name", type: "text", placeholder: "\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25\u0E08\u0E23\u0E34\u0E07" })),
                    React.createElement("div", { className: "col-span-2 mb-6 w-full md:mb-0 md:ps-2" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "username" }, "\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19"),
                        React.createElement("input", { className: "mb-3 block w-full appearance-none rounded border bg-white py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none", id: "username", type: "text", placeholder: "\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19" })),
                    React.createElement("div", { className: "col-span-2 mb-6 w-full md:mb-0 md:ps-2" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "grid-password" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19"),
                        React.createElement("input", { className: "mb-3 block w-full appearance-none rounded border bg-white px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none", id: "grid-password", type: "password", placeholder: "********" })),
                    React.createElement("div", { className: "col-span-2 mb-6 w-full md:mb-0 md:ps-2" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "grid-comfirm-password" }, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19"),
                        React.createElement("input", { className: "borderbg-white mb-3 block w-full appearance-none rounded px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none", id: "grid-comfirm-password", type: "password", placeholder: "********" }))),
                React.createElement("div", { className: "grid grid-cols-1" },
                    React.createElement("div", { className: "w-80 px-3" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "grid-tel" }, "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E4C"),
                        React.createElement("input", { className: "block w-full appearance-none rounded border bg-white px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none", id: "grid-tel", type: "tel", placeholder: "000-000000" })),
                    React.createElement("div", { className: "w-80 px-3" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "grid-email" }, "\u0E2D\u0E35\u0E40\u0E21\u0E25"),
                        React.createElement("input", { className: "block w-full appearance-none rounded border bg-white px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none", id: "grid-email", type: "email", placeholder: "example@exammail.com" })),
                    React.createElement("div", { className: "w-80 px-3" },
                        React.createElement("label", { className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700", htmlFor: "grid-email" }, "\u0E04\u0E13\u0E30"),
                        React.createElement(FormControl_1["default"], { className: "w-full appearance-none rounded border px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none", error: Boolean(validationError.faculty) },
                            React.createElement(material_1.Select, { className: "bg-white", name: "faculty", value: formInput.faculty, onChange: handleFacultyChange }, faculties.map(function (faculty) { return (React.createElement(material_1.MenuItem, { key: faculty.id, value: faculty.id }, faculty.name)); })),
                            React.createElement(material_1.FormHelperText, null, validationError.faculty))),
                    React.createElement("div", { className: "w-80 px-3" },
                        React.createElement("label", { htmlFor: "major", className: "mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700" }, "\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32"),
                        React.createElement(FormControl_1["default"], { className: "w-full appearance-none rounded border px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none" },
                            React.createElement(material_1.Select, { className: "bg-white", name: "major", value: formInput.major, onChange: handleMajorChange, disabled: !formInput.faculty }, majors
                                .filter(function (major) { return major.faculty_id === Number(formInput.faculty); })
                                .map(function (filteredMajor) { return (React.createElement(material_1.MenuItem, { key: filteredMajor.id, value: filteredMajor.id }, filteredMajor.name)); }))))),
                React.createElement("div", { className: "mt-6 flex justify-end gap-4" },
                    React.createElement(link_1["default"], { href: "/dashboard/login-register", className: "flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200" }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"),
                    React.createElement(button_1.Button, { type: "submit" }, "\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01"))))));
}
exports["default"] = Form;
