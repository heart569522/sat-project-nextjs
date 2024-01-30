"use strict";
exports.__esModule = true;
exports.OverlayLoading = exports.DocumentLoading = exports.ActivityHistoryLoading = void 0;
var material_1 = require("@mui/material");
function ActivityHistoryLoading() {
    return (React.createElement("div", { className: "flex w-full items-center justify-center p-2" },
        React.createElement(material_1.CircularProgress, null),
        React.createElement("span", { className: "ml-4 text-lg font-medium" }, "Loading...")));
}
exports.ActivityHistoryLoading = ActivityHistoryLoading;
function DocumentLoading() {
    return (React.createElement("section", { id: "box", className: "box text-black" },
        React.createElement("div", { id: "box-area", className: "box-area" },
            React.createElement("div", { id: "page-height", className: "page-height" },
                React.createElement("div", { className: "mt-20 flex items-center justify-center" },
                    React.createElement(material_1.CircularProgress, null),
                    React.createElement("span", { className: "ml-4 text-lg font-medium" }, "Loading..."))))));
}
exports.DocumentLoading = DocumentLoading;
function OverlayLoading(_a) {
    var showLoading = _a.showLoading;
    return (React.createElement(React.Fragment, null, showLoading && (React.createElement("div", { className: "fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50" },
        React.createElement("div", { className: "flex items-center" },
            React.createElement(material_1.CircularProgress, null),
            React.createElement("span", { className: "ml-4 text-lg font-medium text-white" }, "Loading..."))))));
}
exports.OverlayLoading = OverlayLoading;
