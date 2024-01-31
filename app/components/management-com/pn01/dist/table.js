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
var buttons_1 = require("@/app/components/button/buttons");
var data_1 = require("@/app/lib/data");
function InvoicesTable(_a) {
    var query = _a.query, currentPage = _a.currentPage;
    return __awaiter(this, void 0, void 0, function () {
        var invoices;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, data_1.fetchFilteredInvoices(query, currentPage)];
                case 1:
                    invoices = _b.sent();
                    return [2 /*return*/, (React.createElement("div", { className: "mt-6 flow-root" },
                            React.createElement("div", { className: "inline-block min-w-full align-middle" },
                                React.createElement("div", { className: "rounded-lg bg-gray-50 p-2 md:pt-0" },
                                    React.createElement("table", { className: "hidden min-w-full text-gray-900 md:table" },
                                        React.createElement("thead", { className: "rounded-lg text-left text-sm font-normal" },
                                            React.createElement("tr", { className: "text-center font-bold" },
                                                React.createElement("th", { scope: "col", className: "px-4 py-5 sm:pl-6" }, "\u0E25\u0E33\u0E14\u0E31\u0E1A"),
                                                React.createElement("th", { scope: "col", className: "px-3 py-5" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                                React.createElement("th", { scope: "col", className: "px-3 py-5" }, "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                                React.createElement("th", { scope: "col", className: "px-3 py-5" }, "\u0E1C\u0E39\u0E49\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                                React.createElement("th", { scope: "col", className: "px-3 py-5" }, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E2A\u0E19\u0E2D\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                                React.createElement("th", { scope: "col", className: "px-3 py-5" },
                                                    "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E1C\u0E39\u0E49\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23 ",
                                                    React.createElement("br", null),
                                                    " / \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23"),
                                                React.createElement("th", { scope: "col", className: "px-3 py-5" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23"),
                                                React.createElement("th", { scope: "col", className: "px-3 py-5" }, "\u0E41\u0E01\u0E49\u0E44\u0E02 / \u0E25\u0E1A"))),
                                        React.createElement("tbody", { className: "justify-center bg-white text-center" },
                                            React.createElement("tr", { className: "w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" },
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "1"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "00011"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "\u0E23\u0E48\u0E27\u0E21\u0E43\u0E08\u0E1E\u0E32\u0E22\u0E31\u0E1E"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "\u0E2D\u0E32\u0E08\u0E32\u0E23\u0E22\u0E4C \u0E2A\u0E21\u0E23\u0E0A\u0E31\u0E22 \u0E0A\u0E31\u0E22\u0E0A\u0E19\u0E30"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "28-12-2023"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "098-7658912"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" },
                                                    React.createElement("button", { className: "rounded-full bg-green-500 px-4 py-2 font-bold text-white" }, "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34")),
                                                React.createElement("td", { className: "whitespace-nowrap py-3 pl-6 pr-3" },
                                                    React.createElement("div", { className: "flex justify-center gap-2" },
                                                        React.createElement(buttons_1.MoreDetialInvoice, null),
                                                        React.createElement(buttons_1.EditButton, null),
                                                        React.createElement(buttons_1.DeleteButton, null)))),
                                            React.createElement("tr", { className: "w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" },
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "2"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "00012"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "\u0E2D\u0E32\u0E2A\u0E32\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E22\u0E30\u0E42\u0E23\u0E07\u0E2D\u0E32\u0E2B\u0E32\u0E23"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "\u0E14\u0E23.\u0E01\u0E21\u0E25\u0E23\u0E31\u0E15 \u0E2A\u0E21\u0E23\u0E1B\u0E31\u0E01"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "22-12-2023"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "085-9178452"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" },
                                                    React.createElement("button", { className: "rounded-full bg-green-500 px-4 py-2 font-bold text-white" }, "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34")),
                                                React.createElement("td", { className: "whitespace-nowrap py-3 pl-6 pr-3" },
                                                    React.createElement("div", { className: "flex justify-center gap-2" },
                                                        React.createElement(buttons_1.MoreDetialInvoice, null),
                                                        React.createElement(buttons_1.EditButton, null),
                                                        React.createElement(buttons_1.DeleteButton, null)))),
                                            React.createElement("tr", { className: "w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" },
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "3"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "00013"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "\u0E23\u0E48\u0E27\u0E21\u0E43\u0E08\u0E04\u0E25\u0E2D\u0E07\u0E2A\u0E30\u0E2D\u0E32\u0E14"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "\u0E2D\u0E32\u0E08\u0E32\u0E23\u0E22\u0E4C \u0E2A\u0E21\u0E01\u0E34\u0E15 \u0E01\u0E34\u0E08\u0E43\u0E08\u0E43\u0E2A\u0E48"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "02-01-2024"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "065-9814786"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" },
                                                    React.createElement("button", { className: "rounded-full bg-red-500 px-4 py-2 font-bold text-white" }, "\u0E44\u0E21\u0E48\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34")),
                                                React.createElement("td", { className: "whitespace-nowrap py-3 pl-6 pr-3" },
                                                    React.createElement("div", { className: "flex justify-center gap-2" },
                                                        React.createElement(buttons_1.MoreDetialInvoice, null),
                                                        React.createElement(buttons_1.EditButton, null),
                                                        React.createElement(buttons_1.DeleteButton, null)))),
                                            React.createElement("tr", { className: "w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" },
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "4"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "00014"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "67 \u0E19\u0E31\u0E19\u0E17\u0E19\u0E32\u0E01\u0E32\u0E23"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "\u0E2D\u0E32\u0E08\u0E32\u0E23\u0E22\u0E4C \u0E2A\u0E21\u0E01\u0E34\u0E15 \u0E01\u0E34\u0E08\u0E43\u0E08\u0E43\u0E2A\u0E48"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "03-01-2024"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" }, "065-9814786"),
                                                React.createElement("td", { className: "whitespace-nowrap px-3 py-3" },
                                                    React.createElement("button", { className: "rounded-full bg-yellow-300 px-4 py-2 font-bold text-white" }, "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32")),
                                                React.createElement("td", { className: "whitespace-nowrap py-3 pl-6 pr-3" },
                                                    React.createElement("div", { className: "flex justify-center gap-2" },
                                                        React.createElement(buttons_1.MoreDetialInvoice, null),
                                                        React.createElement(buttons_1.EditButton, null),
                                                        React.createElement(buttons_1.DeleteButton, null))))))))))];
            }
        });
    });
}
exports["default"] = InvoicesTable;
