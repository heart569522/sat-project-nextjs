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
var image_1 = require("next/image");
var CheckBoxOutlineBlankSharp_1 = require("@mui/icons-material/CheckBoxOutlineBlankSharp");
var CheckBoxSharp_1 = require("@mui/icons-material/CheckBoxSharp");
function PN11Paper(_a) {
    var data = _a.data;
    return __awaiter(this, void 0, void 0, function () {
        var DotsPlaceholder;
        return __generator(this, function (_b) {
            console.log("🚀 ~ PN11Paper ~ data:", data);
            DotsPlaceholder = function (_a) {
                var numOfDots = _a.numOfDots, text = _a.text, position = _a.position;
                var positionClasses = {
                    left: 'left-1/3',
                    center: 'left-1/2',
                    right: 'left-3/4'
                };
                return (React.createElement("div", { className: "relative flex items-center" },
                    Array.from({ length: numOfDots }).map(function (_, index) { return (React.createElement("span", { key: index }, ".")); }),
                    text && (React.createElement("span", { className: "absolute " + positionClasses[position] + " -translate-x-1/2 transform whitespace-nowrap pb-3" }, text))));
            };
            return [2 /*return*/, (React.createElement("section", { id: "box", className: "box text-black" },
                    React.createElement("div", { id: "box-area", className: "box-area" },
                        React.createElement("div", { id: "page-height", className: "page-height" },
                            React.createElement("article", { id: "part", className: "part" },
                                React.createElement("table", { className: "w-full" },
                                    React.createElement("tbody", null,
                                        React.createElement("tr", { className: "" },
                                            React.createElement("td", { className: "w-[20%]" },
                                                React.createElement("figure", null,
                                                    React.createElement(image_1["default"], { src: "/payap-logo-blue.png", alt: "payap-logo", width: 416, height: 122, className: "mb-10 w-44" }))),
                                            React.createElement("td", { className: "w-2/4 text-center" },
                                                React.createElement("p", { className: "pt-8 text-base font-semibold leading-8" },
                                                    "\u0E04\u0E33\u0E23\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 (\u0E1E\u0E19.11) ",
                                                    React.createElement("br", null),
                                                    "\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32 \u0E21\u0E2B\u0E32\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E1E\u0E32\u0E22\u0E31\u0E1E")),
                                            React.createElement("td", { className: "w-[20%]" })))),
                                React.createElement("p", { className: "text-center" }, "********************************************************************************************************")),
                            React.createElement("article", { id: "part", className: "part" },
                                React.createElement("div", { className: "flex justify-end gap-x-0 py-2" },
                                    React.createElement("label", { className: "font-semibold" }, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"),
                                    React.createElement(DotsPlaceholder, { numOfDots: 30, text: data.date, position: "center" })),
                                React.createElement("div", { className: "flex justify-start gap-x-6 py-2" },
                                    React.createElement("label", { className: "font-semibold" }, "\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07"),
                                    React.createElement("p", null, "\u0E02\u0E2D\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23")),
                                React.createElement("div", { className: "flex justify-start gap-x-6 py-2" },
                                    React.createElement("label", { className: "font-semibold" }, "\u0E40\u0E23\u0E35\u0E22\u0E19"),
                                    React.createElement("p", null, "\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32"))),
                            React.createElement("article", { id: "part", className: "part" },
                                React.createElement("div", { className: "flex flex-row justify-start py-1" },
                                    React.createElement("label", { className: "whitespace-nowrap pl-28 font-semibold" }, "\u0E02\u0E49\u0E32\u0E1E\u0E40\u0E08\u0E49\u0E32"),
                                    React.createElement(DotsPlaceholder, { numOfDots: 145, text: data.firstname + " " + data.lastname, position: "left" })),
                                React.createElement("div", { className: "flex flex-row justify-start py-1" },
                                    React.createElement("label", { className: "whitespace-nowrap font-semibold" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32"),
                                    React.createElement(DotsPlaceholder, { numOfDots: 60, text: data.student_id, position: "center" }),
                                    React.createElement("label", { className: "whitespace-nowrap font-semibold" }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C"),
                                    React.createElement(DotsPlaceholder, { numOfDots: 59, text: data.phone, position: "center" })),
                                React.createElement("div", { className: "flex flex-row justify-start py-1" },
                                    React.createElement("label", { className: "whitespace-nowrap font-semibold" }, "\u0E2A\u0E32\u0E02\u0E32\u0E27\u0E34\u0E0A\u0E32"),
                                    React.createElement(DotsPlaceholder, { numOfDots: 170, text: data.major, position: "left" })),
                                React.createElement("div", { className: "flex flex-row justify-start py-1" },
                                    React.createElement("label", { className: "whitespace-nowrap font-semibold" }, "\u0E04\u0E13\u0E30/\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22"),
                                    React.createElement(DotsPlaceholder, { numOfDots: 162, text: data.faculty, position: "left" })),
                                React.createElement("div", { className: "flex flex-row justify-start py-1" },
                                    React.createElement("label", { className: "whitespace-nowrap font-semibold" }, "\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E07\u0E04\u0E4C\u0E02\u0E2D\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"))),
                            React.createElement("article", { id: "part", className: "part" },
                                React.createElement("div", { className: "mt-12 flex justify-end pr-16" },
                                    React.createElement("p", { className: "whitespace-nowrap" }, "\u0E25\u0E07\u0E0A\u0E37\u0E48\u0E2D"),
                                    React.createElement(DotsPlaceholder, { numOfDots: 60, position: "center" }),
                                    React.createElement("p", { className: "whitespace-nowrap" }, "\u0E1C\u0E39\u0E49\u0E22\u0E37\u0E48\u0E19\u0E04\u0E33\u0E23\u0E49\u0E2D\u0E07")),
                                React.createElement("div", { className: "mt-4 flex justify-end pr-28" },
                                    "(",
                                    React.createElement(DotsPlaceholder, { numOfDots: 68, position: "center" }),
                                    ")")),
                            React.createElement("article", { id: "part", className: "part" },
                                React.createElement("div", { className: "mt-12" },
                                    React.createElement("label", { className: "whitespace-nowrap font-semibold underline" }, "\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23"),
                                    React.createElement("div", { className: "flex justify-start py-1 pl-6" },
                                        data.delivery_method == 'receive' ? (React.createElement(CheckBoxSharp_1["default"], { className: "mt-[4px]" })) : (React.createElement(CheckBoxOutlineBlankSharp_1["default"], { className: "mt-[4px]" })),
                                        React.createElement("label", { className: "whitespace-nowrap pl-1" }, "\u0E23\u0E31\u0E1A\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22\u0E15\u0E19\u0E40\u0E2D\u0E07 \u0E17\u0E35\u0E48 \u0E2A\u0E33\u0E19\u0E31\u0E01\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32")),
                                    React.createElement("div", { className: "flex justify-start py-1 pl-6" },
                                        data.delivery_method == 'send' ? (React.createElement(CheckBoxSharp_1["default"], { className: "mt-[4px]" })) : (React.createElement(CheckBoxOutlineBlankSharp_1["default"], { className: "mt-[4px]" })),
                                        React.createElement("label", { className: "whitespace-nowrap pl-1" }, "\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07\u0E17\u0E32\u0E07\u0E44\u0E1B\u0E23\u0E29\u0E13\u0E35\u0E22\u0E4C (\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19) \u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E44\u0E1B\u0E23\u0E29\u0E13\u0E35\u0E22\u0E4C 33 \u0E1A\u0E32\u0E17")),
                                    React.createElement("div", { className: "flex justify-start pl-16" },
                                        React.createElement("p", { className: "whitespace-nowrap" }, "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 (\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A)"),
                                        React.createElement(DotsPlaceholder, { numOfDots: 140, text: data.recipient_name || null, position: "left" })),
                                    React.createElement("div", { className: "flex justify-start pl-16" },
                                        React.createElement("p", { className: "whitespace-nowrap" }, "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07 (\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A)"),
                                        React.createElement(DotsPlaceholder, { numOfDots: 134, text: data.recipient_address || null, position: "center" })),
                                    React.createElement("div", { className: "flex justify-start pl-16" },
                                        React.createElement("p", { className: "whitespace-nowrap" }, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C (\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A)"),
                                        React.createElement(DotsPlaceholder, { numOfDots: 131, text: data.recipient_phone || null, position: "left" })))),
                            React.createElement("article", { id: "part", className: "part" },
                                React.createElement("div", { className: "mt-16" },
                                    React.createElement("p", { className: "whitespace-nowrap text-center font-semibold" }, "\u0E2A\u0E33\u0E19\u0E31\u0E01\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E19\u0E31\u0E01\u0E28\u0E36\u0E01\u0E29\u0E32 \u0E21\u0E2B\u0E32\u0E27\u0E34\u0E17\u0E22\u0E32\u0E25\u0E31\u0E22\u0E1E\u0E32\u0E22\u0E31\u0E1E \u0E2D\u0E32\u0E04\u0E32\u0E23\u0E1E\u0E31\u0E19\u0E18\u0E01\u0E23 \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C 0-5385-1478 \u0E15\u0E48\u0E2D 316")))))))];
        });
    });
}
exports["default"] = PN11Paper;
