'use client';
"use strict";
exports.__esModule = true;
var React = require("react");
var demo_1 = require("@mui/x-date-pickers/internals/demo");
var AdapterDayjs_1 = require("@mui/x-date-pickers/AdapterDayjs");
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
var pn01_status_1 = require("@/app/model/pn01-status");
function BasicDatePicker() {
    return (React.createElement("div", null,
        React.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDayjs_1.AdapterDayjs },
            React.createElement(demo_1.DemoContainer, { components: ['DatePicker'] },
                React.createElement(DatePicker_1.DatePicker, { label: "Basic date picker", views: ['year'] }))),
        React.createElement("div", null,
            React.createElement("p", null,
                " ",
                pn01_status_1.PN01Status['กรุณานำส่งเอกสาร พน.01']))));
}
exports["default"] = BasicDatePicker;
