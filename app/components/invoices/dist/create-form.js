'use client';
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var outline_1 = require("@heroicons/react/24/outline");
var button_1 = require("@/app/components/button/button");
var actions_1 = require("@/app/lib/actions");
var react_dom_1 = require("react-dom");
function Form(_a) {
    var _b, _c, _d;
    var customers = _a.customers;
    var initialState = { message: null, errors: {} };
    var _e = react_dom_1.useFormState(actions_1.createInvoice, initialState), state = _e[0], dispatch = _e[1];
    return (React.createElement("form", { action: dispatch },
        React.createElement("div", { className: "rounded-md bg-gray-50 p-4 md:p-6" },
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "customer", className: "mb-2 block text-sm font-medium" }, "Choose customer"),
                React.createElement("div", { className: "relative" },
                    React.createElement("select", { id: "customer", name: "customerId", className: "peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", defaultValue: "", "aria-describedby": "customer-error" },
                        React.createElement("option", { value: "", disabled: true }, "Select a customer"),
                        customers.map(function (customer) { return (React.createElement("option", { key: customer.id, value: customer.id }, customer.name)); })),
                    React.createElement(outline_1.UserCircleIcon, { className: "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" })),
                React.createElement("div", { id: "customer-error", "aria-live": "polite", "aria-atomic": "true" }, ((_b = state.errors) === null || _b === void 0 ? void 0 : _b.customerId) &&
                    state.errors.customerId.map(function (error) { return (React.createElement("p", { className: "mt-2 text-sm text-red-500", key: error }, error)); }))),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "amount", className: "mb-2 block text-sm font-medium" }, "Choose an amount"),
                React.createElement("div", { className: "relative mt-2 rounded-md" },
                    React.createElement("div", { className: "relative" },
                        React.createElement("input", { id: "amount", name: "amount", type: "number", step: "0.01", placeholder: "Enter USD amount", className: "peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500", "aria-describedby": "amount-error" }),
                        React.createElement(outline_1.CurrencyDollarIcon, { className: "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" }))),
                React.createElement("div", { id: "amount-error", "aria-live": "polite", "aria-atomic": "true" }, ((_c = state.errors) === null || _c === void 0 ? void 0 : _c.amount) &&
                    state.errors.amount.map(function (error) { return (React.createElement("p", { className: "mt-2 text-sm text-red-500", key: error }, error)); }))),
            React.createElement("fieldset", null,
                React.createElement("legend", { className: "mb-2 block text-sm font-medium" }, "Set the invoice status"),
                React.createElement("div", { className: "rounded-md border border-gray-200 bg-white px-[14px] py-3" },
                    React.createElement("div", { className: "flex gap-4" },
                        React.createElement("div", { className: "flex items-center" },
                            React.createElement("input", { id: "pending", name: "status", type: "radio", value: "pending", className: "text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2" }),
                            React.createElement("label", { htmlFor: "pending", className: "ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600" },
                                "Pending ",
                                React.createElement(outline_1.ClockIcon, { className: "h-4 w-4" }))),
                        React.createElement("div", { className: "flex items-center" },
                            React.createElement("input", { id: "paid", name: "status", type: "radio", value: "paid", className: "h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2" }),
                            React.createElement("label", { htmlFor: "paid", className: "ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white" },
                                "Paid ",
                                React.createElement(outline_1.CheckIcon, { className: "h-4 w-4" }))))),
                React.createElement("div", { id: "status-error", "aria-live": "polite", "aria-atomic": "true" }, ((_d = state.errors) === null || _d === void 0 ? void 0 : _d.status) &&
                    state.errors.status.map(function (error) { return (React.createElement("p", { className: "mt-2 text-sm text-red-500", key: error }, error)); }))),
            React.createElement("div", { "aria-live": "polite", "aria-atomic": "true" }, state.message ? (React.createElement("p", { className: "mt-2 text-sm text-red-500" }, state.message)) : null)),
        React.createElement("div", { className: "mt-6 flex justify-end gap-4" },
            React.createElement(link_1["default"], { href: "/dashboard/invoices", className: "flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200" }, "Cancel"),
            React.createElement(button_1.Button, { type: "submit" }, "Create Invoice"))));
}
exports["default"] = Form;
