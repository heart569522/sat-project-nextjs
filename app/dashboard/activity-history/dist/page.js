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
exports.metadata = void 0;
var search_history_1 = require("@/app/components/search-box/search-history");
var buttons_1 = require("@/app/components/button/buttons");
var table_1 = require("@/app/components/history-activity/table");
var react_1 = require("react");
var loading_screen_1 = require("@/app/components/loading-screen");
exports.metadata = {
    title: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม'
};
function Page(_a) {
    var searchParams = _a.searchParams;
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_b) {
            query = (searchParams === null || searchParams === void 0 ? void 0 : searchParams.query) || '';
            return [2 /*return*/, (React.createElement("div", { className: "w-full" },
                    React.createElement("div", { className: 'flex text-xl md:text-2xl' }, "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23/\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21"),
                    React.createElement("div", { className: "mt-4" },
                        React.createElement("div", { className: "flex items-center justify-start gap-2 md:mt-8" },
                            React.createElement(buttons_1.CreateRequestTranscript, null)),
                        React.createElement("div", { className: "my-6 rounded-md border-2 border-gray-100 p-4 md:p-6" },
                            React.createElement(search_history_1["default"], null)),
                        query && (React.createElement("div", { className: "my-6 rounded-md border-2 border-gray-100 p-4 md:p-6" },
                            React.createElement(react_1.Suspense, { key: query, fallback: React.createElement(loading_screen_1.ActivityHistoryLoading, null) },
                                React.createElement(table_1["default"], { query: query })))))))];
        });
    });
}
exports["default"] = Page;
