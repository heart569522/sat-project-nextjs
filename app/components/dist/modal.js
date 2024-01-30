"use strict";
// 'use client';
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
exports.__esModule = true;
exports.ModalResponse = exports.ModalQuestion = void 0;
var react_1 = require("react");
var Close_1 = require("@mui/icons-material/Close");
var ErrorOutlineOutlined_1 = require("@mui/icons-material/ErrorOutlineOutlined");
var CheckCircleOutlined_1 = require("@mui/icons-material/CheckCircleOutlined");
var material_1 = require("@mui/material");
var navigation_1 = require("next/navigation");
var style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 5
};
function ModalQuestion(props) {
    return (react_1["default"].createElement(material_1.Modal, { open: props.openModal, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
        react_1["default"].createElement(material_1.Box, { sx: __assign(__assign({}, style), { width: 450 }) },
            react_1["default"].createElement("div", { className: "absolute right-0 top-0 mr-1 mt-1" },
                react_1["default"].createElement(material_1.IconButton, { "aria-label": "close", size: "small", onClick: props.onCloseModal },
                    react_1["default"].createElement(Close_1["default"], null))),
            react_1["default"].createElement("div", { className: "mb-2 flex items-center justify-between px-6 pt-6" },
                react_1["default"].createElement("h3", { id: "modal-modal-title", className: "text-xl font-semibold" }, props.title)),
            react_1["default"].createElement("div", { className: "mb-4 px-6" },
                react_1["default"].createElement("p", { id: "modal-modal-description" }, props.detail)),
            react_1["default"].createElement("div", { className: "flex items-center justify-end gap-x-1 bg-gray-50 px-4 py-3" },
                react_1["default"].createElement("button", { type: "button", className: "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm", onClick: props.onCloseModal }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"),
                react_1["default"].createElement("button", { type: "button", className: "inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm", onClick: function () {
                        props.onOk(props.okAction);
                        props.onCloseModal();
                    } }, "\u0E15\u0E01\u0E25\u0E07")))));
}
exports.ModalQuestion = ModalQuestion;
function ModalResponse(_a) {
    var openModal = _a.openModal, onCloseModal = _a.onCloseModal, isSuccess = _a.isSuccess, isError = _a.isError, title = _a.title, detail = _a.detail, buttonLink = _a.buttonLink, buttonText = _a.buttonText;
    var router = navigation_1.useRouter();
    var handleNextPage = function () {
        router.replace(buttonLink);
    };
    return (react_1["default"].createElement(material_1.Modal, { open: openModal, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
        react_1["default"].createElement(material_1.Box, { sx: __assign(__assign({}, style), { width: 450 }) },
            react_1["default"].createElement("div", { className: "flex items-center justify-center pt-6" },
                isSuccess && (react_1["default"].createElement(CheckCircleOutlined_1["default"], { className: "h-14 w-14 text-green-500" })),
                isError && (react_1["default"].createElement(ErrorOutlineOutlined_1["default"], { className: "h-14 w-14 text-red-500" }))),
            react_1["default"].createElement("div", { className: "mb-2 flex items-center justify-center px-6 pt-4" },
                react_1["default"].createElement("h3", { id: "modal-modal-title", className: "text-xl font-semibold" }, title)),
            react_1["default"].createElement("div", { className: "mb-4 px-6 text-center" },
                react_1["default"].createElement("p", { id: "modal-modal-description" }, detail)),
            react_1["default"].createElement("div", { className: "flex items-center justify-start p-5" },
                isError && (react_1["default"].createElement("button", { type: "button", className: "inline-flex w-full justify-center rounded-md border border-red-500 px-4 py-2 text-base font-medium text-red-500 shadow-sm hover:bg-red-50", onClick: onCloseModal }, "\u0E1B\u0E34\u0E14")),
                isSuccess && (react_1["default"].createElement("button", { type: "button", className: "inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700", onClick: handleNextPage }, buttonText))))));
}
exports.ModalResponse = ModalResponse;
