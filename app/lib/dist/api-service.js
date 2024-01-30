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
exports.updateData = exports.createData = exports.fetchFilter = exports.fetchPages = exports.getDataById = exports.getAllData = exports.getProjectProposals = exports.getProjectStatus = exports.getProjectKPI = exports.getOperationPlanKPI = exports.getStrategicPlanKPI = exports.getUniversityStrategic = exports.getObjective = exports.getStrategicIssue = void 0;
var axios_1 = require("axios");
var cache_1 = require("next/cache");
function getStrategicIssue() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/pn01-select-list/strategic_issue_list")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getStrategicIssue = getStrategicIssue;
function getObjective() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/pn01-select-list/objective_list")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getObjective = getObjective;
function getUniversityStrategic() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/pn01-select-list/university_strategic_list")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getUniversityStrategic = getUniversityStrategic;
function getStrategicPlanKPI() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/pn01-select-list/strategic_plan_kpi_list")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getStrategicPlanKPI = getStrategicPlanKPI;
function getOperationPlanKPI() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/pn01-select-list/operational_plan_kpi_list")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getOperationPlanKPI = getOperationPlanKPI;
function getProjectKPI() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/pn01-select-list/project_kpi_list")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getProjectKPI = getProjectKPI;
function getProjectStatus() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/pn01-select-list/project_status_list")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getProjectStatus = getProjectStatus;
function getProjectProposals() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/project-proposal")];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getProjectProposals = getProjectProposals;
function getAllData(apiPath) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(process.env.API_URL + "/api/" + apiPath)];
                case 1:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getAllData = getAllData;
function getDataById(apiPath, id) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cache_1.unstable_noStore();
                    return [4 /*yield*/, fetch(process.env.API_URL + "/api/" + apiPath + "/" + id)];
                case 1:
                    res = _a.sent();
                    // if (!res.ok) {
                    //   throw new Error('Failed to fetch data');
                    // }
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getDataById = getDataById;
function fetchPages(apiPath, search) {
    return __awaiter(this, void 0, void 0, function () {
        var url, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cache_1.unstable_noStore();
                    url = new URL(process.env.API_URL + "/api/" + apiPath);
                    if (search) {
                        url.searchParams.append('query', search);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url.toString())];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error during fetch:', error_1.message);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchPages = fetchPages;
function fetchFilter(apiPath, search, currentPage) {
    return __awaiter(this, void 0, void 0, function () {
        var url, res, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cache_1.unstable_noStore();
                    url = new URL(process.env.API_URL + "/api/" + apiPath);
                    if (search) {
                        url.searchParams.append('search', search);
                    }
                    if (currentPage) {
                        url.searchParams.append('page', currentPage.toString());
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url.toString())];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return [2 /*return*/, res.json()];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error during fetch:', error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchFilter = fetchFilter;
function createData(apiPath, formData) {
    return __awaiter(this, void 0, void 0, function () {
        var response, insertedId, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post(process.env.API_URL + "/api/" + apiPath, formData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Create project proposal success', response);
                    if (response.data.id) {
                        insertedId = response.data.id;
                        console.log('Inserted ID:', insertedId);
                        return [2 /*return*/, response];
                    }
                    else {
                        console.warn('No ID found in the response data:', response.data);
                        return [2 /*return*/, response];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error while sending data:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createData = createData;
function updateData(apiPath, formData, id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].put(process.env.API_URL + "/api/" + apiPath + "/" + id, formData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Update project proposal success', response);
                    // if (response.data.id) {
                    //   const insertedId = response.data.id;
                    //   console.log('Inserted ID:', insertedId);
                    //   return response;
                    // } else {
                    //   console.warn('No ID found in the response data:', response.data);
                    //   return response;
                    // }
                    return [2 /*return*/, response];
                case 2:
                    error_4 = _a.sent();
                    console.error('Error while sending data:', error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateData = updateData;
