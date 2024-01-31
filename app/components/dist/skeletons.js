"use strict";
exports.__esModule = true;
exports.InvoicesTableSkeleton = exports.InvoicesMobileSkeleton = exports.TableRowSkeleton = exports.TableRowMobileSkeleton = exports.TableRowFullSkeleton = exports.LatestInvoicesSkeleton = exports.InvoiceSkeleton = exports.RevenueChartSkeleton = exports.CardsSkeleton = exports.CardSkeleton = void 0;
var material_1 = require("@mui/material");
var react_1 = require("react");
// Loading animation
var shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
function CardSkeleton() {
    return (react_1["default"].createElement("div", { className: shimmer + " relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm" },
        react_1["default"].createElement("div", { className: "flex p-4" },
            react_1["default"].createElement("div", { className: "h-5 w-5 rounded-md bg-gray-200" }),
            react_1["default"].createElement("div", { className: "ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" })),
        react_1["default"].createElement("div", { className: "flex items-center justify-center truncate rounded-xl bg-white px-4 py-8" },
            react_1["default"].createElement("div", { className: "h-7 w-20 rounded-md bg-gray-200" }))));
}
exports.CardSkeleton = CardSkeleton;
function CardsSkeleton() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CardSkeleton, null),
        react_1["default"].createElement(CardSkeleton, null),
        react_1["default"].createElement(CardSkeleton, null),
        react_1["default"].createElement(CardSkeleton, null)));
}
exports.CardsSkeleton = CardsSkeleton;
function RevenueChartSkeleton() {
    return (react_1["default"].createElement("div", { className: shimmer + " relative w-full overflow-hidden md:col-span-4" },
        react_1["default"].createElement("div", { className: "mb-4 h-8 w-36 rounded-md bg-gray-100" }),
        react_1["default"].createElement("div", { className: "rounded-xl bg-gray-100 p-4" },
            react_1["default"].createElement("div", { className: "mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" }),
            react_1["default"].createElement("div", { className: "flex items-center pb-2 pt-6" },
                react_1["default"].createElement("div", { className: "h-5 w-5 rounded-full bg-gray-200" }),
                react_1["default"].createElement("div", { className: "ml-2 h-4 w-20 rounded-md bg-gray-200" })))));
}
exports.RevenueChartSkeleton = RevenueChartSkeleton;
function InvoiceSkeleton() {
    return (react_1["default"].createElement("div", { className: "flex flex-row items-center justify-between border-b border-gray-100 py-4" },
        react_1["default"].createElement("div", { className: "flex items-center" },
            react_1["default"].createElement("div", { className: "mr-2 h-8 w-8 rounded-full bg-gray-200" }),
            react_1["default"].createElement("div", { className: "min-w-0" },
                react_1["default"].createElement("div", { className: "h-5 w-40 rounded-md bg-gray-200" }),
                react_1["default"].createElement("div", { className: "mt-2 h-4 w-12 rounded-md bg-gray-200" }))),
        react_1["default"].createElement("div", { className: "mt-2 h-4 w-12 rounded-md bg-gray-200" })));
}
exports.InvoiceSkeleton = InvoiceSkeleton;
function LatestInvoicesSkeleton() {
    return (react_1["default"].createElement("div", { className: shimmer + " relative flex w-full flex-col overflow-hidden md:col-span-4" },
        react_1["default"].createElement("div", { className: "mb-4 h-8 w-36 rounded-md bg-gray-100" }),
        react_1["default"].createElement("div", { className: "flex grow flex-col justify-between rounded-xl bg-gray-100 p-4" },
            react_1["default"].createElement("div", { className: "bg-white px-6" },
                react_1["default"].createElement(InvoiceSkeleton, null),
                react_1["default"].createElement(InvoiceSkeleton, null),
                react_1["default"].createElement(InvoiceSkeleton, null),
                react_1["default"].createElement(InvoiceSkeleton, null),
                react_1["default"].createElement(InvoiceSkeleton, null),
                react_1["default"].createElement("div", { className: "flex items-center pb-2 pt-6" },
                    react_1["default"].createElement("div", { className: "h-5 w-5 rounded-full bg-gray-200" }),
                    react_1["default"].createElement("div", { className: "ml-2 h-4 w-20 rounded-md bg-gray-200" }))))));
}
exports.LatestInvoicesSkeleton = LatestInvoicesSkeleton;
function DashboardSkeleton() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: shimmer + " relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100" }),
        react_1["default"].createElement("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4" },
            react_1["default"].createElement(CardSkeleton, null),
            react_1["default"].createElement(CardSkeleton, null),
            react_1["default"].createElement(CardSkeleton, null),
            react_1["default"].createElement(CardSkeleton, null)),
        react_1["default"].createElement("div", { className: "mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8" },
            react_1["default"].createElement(RevenueChartSkeleton, null),
            react_1["default"].createElement(LatestInvoicesSkeleton, null))));
}
exports["default"] = DashboardSkeleton;
function TableRowFullSkeleton(_a) {
    var countColumn = _a.countColumn;
    var skeletonColumns = Array.from({ length: countColumn }, function (_, index) { return (react_1["default"].createElement("td", { key: index, scope: "col", className: "px-4 py-5" },
        react_1["default"].createElement(material_1.Skeleton, { animation: "wave", sx: { width: '100%', height: '30px' } }))); });
    return react_1["default"].createElement("tr", { className: "w-full animate-pulse bg-white" }, skeletonColumns);
}
exports.TableRowFullSkeleton = TableRowFullSkeleton;
function TableRowMobileSkeleton(_a) {
    var countColumn = _a.countColumn;
    var skeletonColumns = Array.from({ length: countColumn }, function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "flex w-full items-center justify-between gap-2 border-b pb-4 pt-2" },
        react_1["default"].createElement("div", { className: "flex w-full flex-col items-start justify-center" },
            react_1["default"].createElement(material_1.Skeleton, { animation: "wave", sx: { width: '100%', height: '15px' } }),
            react_1["default"].createElement(material_1.Skeleton, { animation: "wave", sx: { width: '100%', height: '30px' } })),
        react_1["default"].createElement("div", { className: "flex w-full flex-col items-end justify-center" },
            react_1["default"].createElement(material_1.Skeleton, { animation: "wave", sx: { width: '100%', height: '15px' } }),
            react_1["default"].createElement(material_1.Skeleton, { animation: "wave", sx: { width: '100%', height: '30px' } })))); });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "mb-2 w-full rounded-md bg-white p-4" },
            skeletonColumns,
            react_1["default"].createElement("div", { className: "flex w-full items-center justify-center gap-2 pt-4" },
                react_1["default"].createElement(material_1.Skeleton, { animation: "wave", sx: { width: '100%', height: '30px' } })))));
}
exports.TableRowMobileSkeleton = TableRowMobileSkeleton;
function TableRowSkeleton() {
    return (react_1["default"].createElement("tr", { className: "w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" },
        react_1["default"].createElement("td", { className: "relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3" },
            react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                react_1["default"].createElement("div", { className: "h-8 w-8 rounded-full bg-gray-100" }),
                react_1["default"].createElement("div", { className: "h-6 w-24 rounded bg-gray-100" }))),
        react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-3" },
            react_1["default"].createElement("div", { className: "h-6 w-32 rounded bg-gray-100" })),
        react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-3" },
            react_1["default"].createElement("div", { className: "h-6 w-16 rounded bg-gray-100" })),
        react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-3" },
            react_1["default"].createElement("div", { className: "h-6 w-16 rounded bg-gray-100" })),
        react_1["default"].createElement("td", { className: "whitespace-nowrap px-3 py-3" },
            react_1["default"].createElement("div", { className: "h-6 w-16 rounded bg-gray-100" })),
        react_1["default"].createElement("td", { className: "whitespace-nowrap py-3 pl-6 pr-3" },
            react_1["default"].createElement("div", { className: "flex justify-end gap-3" },
                react_1["default"].createElement("div", { className: "h-[38px] w-[38px] rounded bg-gray-100" }),
                react_1["default"].createElement("div", { className: "h-[38px] w-[38px] rounded bg-gray-100" })))));
}
exports.TableRowSkeleton = TableRowSkeleton;
function InvoicesMobileSkeleton() {
    return (react_1["default"].createElement("div", { className: "mb-2 w-full rounded-md bg-white p-4" },
        react_1["default"].createElement("div", { className: "flex items-center justify-between border-b border-gray-100 pb-8" },
            react_1["default"].createElement("div", { className: "flex items-center" },
                react_1["default"].createElement("div", { className: "mr-2 h-8 w-8 rounded-full bg-gray-100" }),
                react_1["default"].createElement("div", { className: "h-6 w-16 rounded bg-gray-100" })),
            react_1["default"].createElement("div", { className: "h-6 w-16 rounded bg-gray-100" })),
        react_1["default"].createElement("div", { className: "flex w-full items-center justify-between pt-4" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "h-6 w-16 rounded bg-gray-100" }),
                react_1["default"].createElement("div", { className: "mt-2 h-6 w-24 rounded bg-gray-100" })),
            react_1["default"].createElement("div", { className: "flex justify-end gap-2" },
                react_1["default"].createElement("div", { className: "h-10 w-10 rounded bg-gray-100" }),
                react_1["default"].createElement("div", { className: "h-10 w-10 rounded bg-gray-100" })))));
}
exports.InvoicesMobileSkeleton = InvoicesMobileSkeleton;
function InvoicesTableSkeleton() {
    return (react_1["default"].createElement("div", { className: "mt-6 flow-root" },
        react_1["default"].createElement("div", { className: "inline-block min-w-full align-middle" },
            react_1["default"].createElement("div", { className: "rounded-lg bg-gray-50 p-2 md:pt-0" },
                react_1["default"].createElement("div", { className: "md:hidden" },
                    react_1["default"].createElement(InvoicesMobileSkeleton, null),
                    react_1["default"].createElement(InvoicesMobileSkeleton, null),
                    react_1["default"].createElement(InvoicesMobileSkeleton, null),
                    react_1["default"].createElement(InvoicesMobileSkeleton, null),
                    react_1["default"].createElement(InvoicesMobileSkeleton, null),
                    react_1["default"].createElement(InvoicesMobileSkeleton, null)),
                react_1["default"].createElement("table", { className: "hidden min-w-full text-gray-900 md:table" },
                    react_1["default"].createElement("thead", { className: "rounded-lg text-left text-sm font-normal" },
                        react_1["default"].createElement("tr", null,
                            react_1["default"].createElement("th", { scope: "col", className: "px-4 py-5 font-medium sm:pl-6" }, "Customer"),
                            react_1["default"].createElement("th", { scope: "col", className: "px-3 py-5 font-medium" }, "Email"),
                            react_1["default"].createElement("th", { scope: "col", className: "px-3 py-5 font-medium" }, "Amount"),
                            react_1["default"].createElement("th", { scope: "col", className: "px-3 py-5 font-medium" }, "Date"),
                            react_1["default"].createElement("th", { scope: "col", className: "px-3 py-5 font-medium" }, "Status"),
                            react_1["default"].createElement("th", { scope: "col", className: "relative pb-4 pl-3 pr-6 pt-2 sm:pr-6" },
                                react_1["default"].createElement("span", { className: "sr-only" }, "Edit")))),
                    react_1["default"].createElement("tbody", { className: "bg-white" },
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null),
                        react_1["default"].createElement(TableRowSkeleton, null)))))));
}
exports.InvoicesTableSkeleton = InvoicesTableSkeleton;
