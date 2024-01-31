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
exports.DeleteButton = exports.EditButton = exports.DetailButton = exports.DeleteInvoice = exports.UpdateInvoice = exports.MoreDetialInvoice = exports.CreateInvoice = exports.CreateRequestTranscript = exports.CreateRequestProjectProposal = void 0;
var outline_1 = require("@heroicons/react/24/outline");
var DescriptionOutlined_1 = require("@mui/icons-material/DescriptionOutlined");
var link_1 = require("next/link");
var actions_1 = require("@/app/lib/actions");
var api_service_1 = require("../lib/api-service");
function CreateRequestProjectProposal() {
    return (React.createElement(link_1["default"], { href: "/dashboard/project-proposal/request", className: "flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" },
        React.createElement("span", { className: "hidden md:block" }, "\u0E40\u0E2A\u0E19\u0E2D\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23/\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21"),
        ' ',
        React.createElement(DescriptionOutlined_1["default"], { className: "h-5 md:ml-2" })));
}
exports.CreateRequestProjectProposal = CreateRequestProjectProposal;
function CreateRequestTranscript() {
    return (React.createElement(link_1["default"], { href: "/dashboard/activity-history/transcript", className: "flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" },
        React.createElement("span", { className: "block" }, "\u0E23\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E23\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21"),
        ' ',
        React.createElement(DescriptionOutlined_1["default"], { className: "h-5 md:ml-2" })));
}
exports.CreateRequestTranscript = CreateRequestTranscript;
function CreateInvoice() {
    return (React.createElement(link_1["default"], { href: "/dashboard/invoices/create", className: "flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" },
        React.createElement("span", { className: "hidden md:block" }, "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E23\u0E30\u0E1A\u0E1A"),
        ' ',
        React.createElement(outline_1.PlusIcon, { className: "h-5 md:ml-4" })));
}
exports.CreateInvoice = CreateInvoice;
function MoreDetialInvoice() {
    return (React.createElement("form", { action: "" },
        React.createElement("button", { className: "rounded-md border p-2 hover:bg-gray-100" },
            React.createElement("span", { className: "sr-only" }, "MoreDetial"),
            React.createElement(outline_1.EyeIcon, { className: "w-5" }))));
}
exports.MoreDetialInvoice = MoreDetialInvoice;
function UpdateInvoice(_a) {
    var id = _a.id;
    return (React.createElement(link_1["default"], { href: "/dashboard/invoices/" + id + "/edit", className: "rounded-md border p-2 hover:bg-gray-100" },
        React.createElement(outline_1.PencilIcon, { className: "w-5" })));
}
exports.UpdateInvoice = UpdateInvoice;
function DeleteInvoice(_a) {
    var id = _a.id;
    var deleteInvoiceWithId = actions_1.deleteInvoice.bind(null, id);
    return (React.createElement("form", { action: deleteInvoiceWithId },
        React.createElement("button", { className: "rounded-md border p-2 hover:bg-gray-100" },
            React.createElement("span", { className: "sr-only" }, "Delete"),
            React.createElement(outline_1.TrashIcon, { className: "w-5" }))));
}
exports.DeleteInvoice = DeleteInvoice;
function DetailButton(_a) {
    var id = _a.id, path = _a.path;
    return (React.createElement(link_1["default"], { href: "/dashboard/" + path + "/" + id, className: "rounded-md border p-2 hover:bg-gray-100" },
        React.createElement(outline_1.EyeIcon, { className: "w-5" })));
}
exports.DetailButton = DetailButton;
function EditButton(_a) {
    var id = _a.id, path = _a.path, disabled = _a.disabled;
    return (React.createElement("div", { className: "rounded-md border p-2 " + (disabled
            ? 'cursor-not-allowed bg-gray-100 text-gray-500'
            : 'hover:bg-gray-100') }, disabled ? (React.createElement("span", { className: "w-5" },
        React.createElement(outline_1.PencilIcon, { className: "w-5" }))) : (React.createElement(link_1["default"], { href: id ? "/dashboard/" + path + "/" + id + "/edit" : '#' },
        React.createElement(outline_1.PencilIcon, { className: "w-5" })))));
}
exports.EditButton = EditButton;
function DeleteButton(_a) {
    var _this = this;
    var id = _a.id, apiPath = _a.apiPath;
    var handleDelete = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_service_1.deleteData(apiPath, id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("button", { onClick: handleDelete, className: "rounded-md border p-2 hover:bg-gray-100" },
        React.createElement("span", { className: "sr-only" }, "Delete"),
        React.createElement(outline_1.TrashIcon, { className: "w-5" })));
}
exports.DeleteButton = DeleteButton;
