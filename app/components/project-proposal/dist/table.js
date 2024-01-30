'use client';
"use strict";
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
var react_1 = require("react");
var api_service_1 = require("@/app/lib/api-service");
var services_1 = require("@/app/lib/services");
var buttons_1 = require("../buttons");
var react_2 = require("react");
var FeedbackOutlined_1 = require("@mui/icons-material/FeedbackOutlined");
var material_1 = require("@mui/material");
function ProjectProposalTable(_a) {
    var _this = this;
    var query = _a.query, currentPage = _a.currentPage;
    var _b = react_2.useState([]), data = _b[0], setData = _b[1];
    console.log('🚀 ~ data:', data);
    var _c = react_2.useState(null), showRemark = _c[0], setShowRemark = _c[1];
    var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_service_1.fetchFilter('project-proposal/fetch-filter', query, currentPage)];
                case 1:
                    res = _a.sent();
                    setData(res);
                    return [2 /*return*/];
            }
        });
    }); };
    react_2.useEffect(function () {
        fetchData();
    }, [query]);
    var handleOpenRemark = function (rowId) {
        setShowRemark(function (prevShowRemark) {
            return prevShowRemark === rowId ? null : rowId;
        });
    };
    return (react_1["default"].createElement("div", { className: "w-full" },
        react_1["default"].createElement("div", { className: "mt-6 flow-root" },
            react_1["default"].createElement("div", { className: "overflow-x-auto" },
                react_1["default"].createElement("div", { className: "inline-block min-w-full align-middle" },
                    react_1["default"].createElement("div", { className: "overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0" },
                        react_1["default"].createElement("div", { className: "md:hidden" }, data === null || data === void 0 ? void 0 : data.map(function (row, i) { return (react_1["default"].createElement("div", { key: row.id, className: "mb-2 w-full rounded-md bg-white p-4" },
                            react_1["default"].createElement("div", { className: "flex items-center justify-between gap-2 border-b pb-4" },
                                react_1["default"].createElement("div", { className: "flex items-center justify-start gap-3" },
                                    react_1["default"].createElement("div", { className: "text-center text-gray-900" },
                                        react_1["default"].createElement("p", { className: "font-semibold" }, i + 1)),
                                    react_1["default"].createElement("div", { className: "flex flex-col items-start justify-center" },
                                        react_1["default"].createElement("p", { className: "text-sm font-medium" }, "\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23/\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21"),
                                        react_1["default"].createElement("p", { className: "text-lg font-semibold" }, row.project_name))),
                                react_1["default"].createElement("div", { className: "flex flex-col items-end justify-center" },
                                    react_1["default"].createElement("p", { className: "text-sm font-medium" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23"),
                                    react_1["default"].createElement("p", { className: "text-lg font-semibold" }, row.project_code))),
                            react_1["default"].createElement("div", { className: "flex w-full items-center justify-between border-b py-5" },
                                react_1["default"].createElement("div", { className: "flex flex-col items-start justify-center" },
                                    react_1["default"].createElement("p", { className: "text-sm font-medium" }, "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                    react_1["default"].createElement("p", { className: "text-base font-semibold" }, row.project_head)),
                                react_1["default"].createElement("div", { className: "flex flex-col items-end justify-center" },
                                    react_1["default"].createElement("p", { className: "text-sm font-medium" }, "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A"),
                                    react_1["default"].createElement("p", { className: "text-base font-semibold" }, row.project_head_phone))),
                            react_1["default"].createElement("div", { className: "flex w-full items-center justify-between border-b py-5" },
                                react_1["default"].createElement("div", { className: "flex flex-col items-start justify-center" },
                                    react_1["default"].createElement("p", { className: "text-sm font-medium" }, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"),
                                    react_1["default"].createElement("p", { className: "text-base font-semibold" }, services_1.convertISOStringToDateText(row.created_at))),
                                react_1["default"].createElement("div", { className: "flex flex-col items-end justify-center" },
                                    react_1["default"].createElement("p", { className: "text-sm font-medium" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30"),
                                    react_1["default"].createElement("p", { className: "text-base font-semibold" }, row.status))),
                            react_1["default"].createElement("div", { className: "flex items-center justify-center gap-2 pt-4" },
                                react_1["default"].createElement(buttons_1.DetailButton, { id: row.id, path: "project-proposal/document" }),
                                react_1["default"].createElement(buttons_1.EditButton, { id: row.id, path: "project-proposal", disabled: !row.is_edit }),
                                react_1["default"].createElement(buttons_1.DeleteButton, { id: row.id, path: "project-proposal" })))); })),
                        react_1["default"].createElement("table", { className: "hidden min-w-full rounded-md text-gray-900 md:table" },
                            react_1["default"].createElement("thead", { className: "rounded-md bg-gray-50 text-center text-sm font-semibold" },
                                react_1["default"].createElement("tr", null,
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[5%] px-4 py-5 sm:pl-6" }, "\u0E25\u0E33\u0E14\u0E31\u0E1A"),
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[10%] px-3 py-5" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23"),
                                    react_1["default"].createElement("th", { scope: "col", className: "px-3 py-5" }, "\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23/\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21"),
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[15%] px-3 py-5" }, "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[15%] px-3 py-5" }, "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A"),
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[10%] px-3 py-5" }, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"),
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[10%] px-3 py-5" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30"),
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[5%] px-3 py-5" }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"),
                                    react_1["default"].createElement("th", { scope: "col", className: "w-[15%] px-3 py-5" }, "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23"))),
                            react_1["default"].createElement("tbody", { className: "divide-y divide-gray-200 text-gray-900" }, data === null || data === void 0 ? void 0 : data.map(function (row, i) { return (react_1["default"].createElement(react_1["default"].Fragment, { key: row.id },
                                react_1["default"].createElement("tr", { className: "group text-center" },
                                    react_1["default"].createElement("td", { rowSpan: showRemark === row.id ? 2 : 1, className: "whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6" }, i + 1),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm" }, row.project_code),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm" }, row.project_name),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm" }, row.project_head),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm" }, row.project_head_phone),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm" }, services_1.convertISOStringToDateText(row.created_at)),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm" }, row.status),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm" },
                                        react_1["default"].createElement(material_1.IconButton, { onClick: function () { return handleOpenRemark(row.id); }, disabled: Boolean(!row.status_remark) },
                                            react_1["default"].createElement(FeedbackOutlined_1["default"], { className: "w-8" }))),
                                    react_1["default"].createElement("td", { className: "whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md" },
                                        react_1["default"].createElement("div", { className: "flex justify-center gap-2" },
                                            react_1["default"].createElement(buttons_1.DetailButton, { id: row.id, path: "project-proposal/document" }),
                                            react_1["default"].createElement(buttons_1.EditButton, { id: row.id, path: "project-proposal", disabled: !row.is_edit }),
                                            react_1["default"].createElement(buttons_1.DeleteButton, { id: row.id, path: "project-proposal" })))),
                                showRemark === row.id && (react_1["default"].createElement("tr", { className: "group" },
                                    react_1["default"].createElement("td", { colSpan: 9, className: "whitespace-nowrap rounded-md bg-white px-4 pb-5 pt-2 text-sm" },
                                        react_1["default"].createElement("div", { className: "flex flex-col items-start" },
                                            react_1["default"].createElement("p", { className: "text-sm font-medium underline" }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"),
                                            react_1["default"].createElement("p", { className: "text-base" }, row.status_remark || '-'))))))); })))))))));
}
exports["default"] = ProjectProposalTable;
