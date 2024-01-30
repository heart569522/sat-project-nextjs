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
exports.POST = exports.GET = void 0;
var db_1 = require("@/app/lib/db");
var server_1 = require("next/server");
var services_1 = require("@/app/lib/services");
var pn01_status_1 = require("@/app/model/pn01-status");
function generateProjectCode(projectYear) {
    return __awaiter(this, void 0, void 0, function () {
        var yearDigits, latestProject, runningNumber, formattedRunningNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    yearDigits = projectYear.slice(-2);
                    return [4 /*yield*/, db_1.pool.query("\n    SELECT MAX(CAST(project_code AS INTEGER)) AS max_project_code\n    FROM project_proposal_pn01\n    WHERE project_code LIKE '" + yearDigits + "%'\n  ")];
                case 1:
                    latestProject = _a.sent();
                    runningNumber = 1;
                    if (latestProject.rows.length > 0 &&
                        latestProject.rows[0].max_project_code !== null) {
                        runningNumber = latestProject.rows[0].max_project_code + 1;
                    }
                    // Ensure the runningNumber does not exceed 999
                    runningNumber = runningNumber % 1000;
                    formattedRunningNumber = runningNumber.toString().padStart(3, '0');
                    return [2 /*return*/, "" + yearDigits + formattedRunningNumber];
            }
        });
    });
}
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.pool.query("SELECT * FROM project_proposal_pn01 WHERE is_delete = false ORDER BY id")];
                case 1:
                    res = _a.sent();
                    data = res.rows;
                    return [2 /*return*/, server_1.NextResponse.json(data, { status: 200 })];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Server error please try again later" }, {
                            status: 500
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, project_year, projectCode, userId, faculty, project_name, project_head, project_head_phone, principle_reason, project_location, project_datetime, lecturer, improvement, strategic_issue, objective, university_strategic, strategic_plan_kpi, operational_plan_kpi, project_kpi, project_status, responsible_rows, OIVT_rows, expected_result_rows, operation_duration_rows, project_schedule_rows, target_total, target_rows, budget_income_total, budget_income_rows, budget_expense_total, budget_expense_rows, project_types, university_identity, datetime, date, time, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    formData = _a.sent();
                    project_year = formData.projectYear;
                    return [4 /*yield*/, generateProjectCode(project_year)];
                case 2:
                    projectCode = _a.sent();
                    userId = formData.userId;
                    faculty = formData.faculty;
                    project_name = formData.projectName;
                    project_head = formData.projectHead;
                    project_head_phone = formData.projectHeadPhone;
                    principle_reason = formData.principleReason;
                    project_location = formData.projectLocation;
                    project_datetime = formData.projectDatetime;
                    lecturer = formData.lecturer;
                    improvement = formData.improvement;
                    strategic_issue = formData.strategicIssue;
                    objective = formData.objective;
                    university_strategic = formData.universityStrategic;
                    strategic_plan_kpi = formData.strategicPlanKPI;
                    operational_plan_kpi = formData.operationPlanKPI;
                    project_kpi = formData.projectKPI;
                    project_status = formData.projectStatus;
                    responsible_rows = JSON.stringify(formData.responsibleRows);
                    OIVT_rows = JSON.stringify(formData.OIVTRows);
                    expected_result_rows = JSON.stringify(formData.expectedResultRows);
                    operation_duration_rows = JSON.stringify(formData.operationDurationRows);
                    project_schedule_rows = JSON.stringify(formData.projectScheduleRows);
                    target_total = formData.targetTotal;
                    target_rows = JSON.stringify(formData.targetRows);
                    budget_income_total = formData.budgetIncomeTotal;
                    budget_income_rows = JSON.stringify(formData.budgetIncomeRows);
                    budget_expense_total = formData.budgetExpenseTotal;
                    budget_expense_rows = JSON.stringify(formData.budgetExpenseRows);
                    project_types = JSON.stringify(formData.projectTypes);
                    university_identity = JSON.stringify(formData.universityIndentity);
                    datetime = services_1.getCurrentDateAndTime();
                    date = datetime.date;
                    time = datetime.time;
                    return [4 /*yield*/, db_1.pool.query("\n        INSERT INTO project_proposal_pn01 (\n            project_code, date, time, faculty, project_name, project_year, project_head, project_head_phone,\n            project_responsible, strategic_issue_id, objective_id, university_strategic_id,\n            strategic_plan_kpi_id, operational_plan_kpi_id, project_kpi_id, project_status_id,\n            project_type, university_identity, principle_reason, objective_indicator_value_tool,\n            expected_result, operation_duration, project_location, project_datetime,\n            project_schedule, lecturer, target_total, target, improvement, budget_income_total, budget_income, budget_expense_total, budget_expense,\n            status, created_by\n        )\n        VALUES (\n            '" + projectCode + "', '" + date + "', '" + time + "', '" + faculty + "',\n            '" + project_name + "', '" + project_year + "', '" + project_head + "', '" + project_head_phone + "',\n            '" + responsible_rows + "', '" + strategic_issue + "', '" + objective + "',\n            '" + university_strategic + "', '" + strategic_plan_kpi + "', '" + operational_plan_kpi + "',\n            '" + project_kpi + "', '" + project_status + "', '" + project_types + "',\n            '" + university_identity + "', '" + principle_reason + "',\n            '" + OIVT_rows + "', '" + expected_result_rows + "',\n            '" + operation_duration_rows + "', '" + project_location + "', '" + project_datetime + "',\n            '" + project_schedule_rows + "', '" + lecturer + "', '" + target_total + "', '" + target_rows + "',\n            '" + improvement + "', '" + budget_income_total + "', '" + budget_income_rows + "', '" + budget_expense_total + "', '" + budget_expense_rows + "',\n            '" + pn01_status_1.PN01Status['กรุณานำส่งเอกสาร พน.01'] + "', (SELECT id FROM users WHERE id = '" + userId + "')\n        )\n        RETURNING id;\n    ")];
                case 3:
                    response = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: 'Create new project proposal success',
                            id: response.rows[0].id
                        }, { status: 201 })];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error creating project proposal:', error_2);
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Server error please try again later" }, {
                            status: 500
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
