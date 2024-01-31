"use strict";
exports.__esModule = true;
var pn01_status_1 = require("@/app/model/pn01-status");
var pn11_status_1 = require("@/app/model/pn11-status");
var react_1 = require("react");
function StatusBadge(props) {
    var statusId = props.statusId, docType = props.docType;
    var badgeColor = function () {
        var color;
        switch (statusId) {
            case 0:
                color = 'text-purple-800 border-purple-500 bg-purple-100';
                break;
            case 1:
                color = 'text-red-800 border-red-500 bg-red-100';
                break;
            case 2:
                color = 'text-orange-800 border-orange-500 bg-orange-100';
                break;
            case 3:
                color = 'text-yellow-800 border-yellow-500 bg-yellow-100';
                break;
            case 4:
                color = 'text-green-800 border-green-500 bg-green-100';
                break;
            case 5:
                color = 'text-sky-800 border-sky-500 bg-sky-100';
                break;
            default:
                color = 'text-gray-800 border-gray-500 bg-gray-100';
                break;
        }
        return color;
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("span", { className: badgeColor() + " rounded border px-2 py-1 text-sm font-medium" }, docType == 'pn01'
            ? pn01_status_1.PN01Status[statusId]
            : docType == 'pn11'
                ? pn11_status_1.PN11Status[statusId]
                : '-')));
}
exports["default"] = StatusBadge;
