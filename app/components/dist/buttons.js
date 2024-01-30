"use strict";
exports.__esModule = true;
exports.DeleteButton = exports.EditButton = exports.DetailButton = exports.DeleteInvoice = exports.UpdateInvoice = exports.MoreDetialInvoice = exports.CreateInvoice = exports.CreateRequestTranscript = exports.CreateRequestProjectProposal = void 0;
var outline_1 = require("@heroicons/react/24/outline");
var DescriptionOutlined_1 = require("@mui/icons-material/DescriptionOutlined");
var link_1 = require("next/link");
var actions_1 = require("@/app/lib/actions");
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
    var id = _a.id, path = _a.path;
    return (React.createElement("form", null,
        React.createElement("button", { className: "rounded-md border p-2 hover:bg-gray-100" },
            React.createElement("span", { className: "sr-only" }, "Delete"),
            React.createElement(outline_1.TrashIcon, { className: "w-5" }))));
}
exports.DeleteButton = DeleteButton;
