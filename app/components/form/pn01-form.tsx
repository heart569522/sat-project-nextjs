'use client';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

export default function PN01Form() {
    const [responsibleRows, setResponsibleRows] = useState([
        { id: 1, firstname: '', lastname: '' }, // Initial row
    ]);

    const [OIVTRows, setOIVTRows] = useState([
        { id: 1, objective: '', indicator: '', value: '', tool: '' }, // Initial row
    ]);

    const addResponsibleRow = () => {
        setResponsibleRows((prevRows) => [
            ...prevRows,
            { id: prevRows.length + 1, firstname: '', lastname: '' },
        ]);
    };

    const addOIVTRow = () => {
        setOIVTRows((prevRows) => [
            ...prevRows,
            { id: prevRows.length + 1, objective: '', indicator: '', value: '', tool: '' },
        ]);
    };

    const deleteResponsibleRow = (id: number) => {
        setResponsibleRows((prevRows) => {
            const updatedRows = prevRows.filter((row) => row.id !== id);

            // Update IDs to maintain a sequential order
            const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
                ...row,
                id: index + 1,
            }));

            return updatedRowsWithSequentialIds;
        });
    };

    const deleteOIVTRow = (id: number) => {
        setOIVTRows((prevRows) => {
            const updatedRows = prevRows.filter((row) => row.id !== id);

            // Update IDs to maintain a sequential order
            const updatedRowsWithSequentialIds = updatedRows.map((row, index) => ({
                ...row,
                id: index + 1,
            }));

            return updatedRowsWithSequentialIds;
        });
    };

    const handleFirstNameChange = (id: number, value: string) => {
        setResponsibleRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, firstname: value } : row,
            ),
        );
    };

    const handleLastNameChange = (id: number, value: string) => {
        setResponsibleRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, lastname: value } : row,
            ),
        );
    };

    const handleOIVTChange = (id: number, field: string, value: string) => {
        setOIVTRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    console.log(OIVTRows);
    


    return (
        <form className="py-2">
            <div className={`mb-0 grid gap-6 md:grid-cols-2`}>
                <div>
                    <label
                        htmlFor="first_name"
                        className="mb-2 block text-base font-medium"
                    >
                        1.ชื่อคณะ/วิทยาลัย/หน่วยงาน
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="John"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="last_name"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        2.ชื่อโครงการ
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Doe"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="company"
                        className="mb-2 block text-base font-medium text-gray-900 "
                    >
                        3.ผู้ดำเนินการ/ผู้รับผิดชอบโครงการ
                    </label>
                    <input
                        type="text"
                        id="company"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Flowbite"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-base font-medium text-gray-900 "
                    >
                        หมายเลขโทรศัพท์
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder=""
                        required
                    />
                </div>
                <div>
                </div>
            </div>
            <div className={`mb-6 grid gap-6 md:grid-cols-1`}>
                <div className="relative overflow-x-auto">
                    <table className="w-full rounded border text-left text-sm text-gray-500">
                        <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                            <tr>
                                <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                                    ลำดับที่
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ชื่อ - สกุล
                                </th>
                                <th scope="col" className="w-[10%] bg-gray-300 px-6 py-3">
                                    เพิ่ม/ลบแถว
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {responsibleRows.map((row) => (
                                <tr className="border-b bg-white">
                                    <th
                                        scope="row"
                                        className="bg-gray-50 px-6 py-4 text-center text-lg font-medium"
                                    >
                                        {row.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className={`grid grid-cols-2 gap-6`}>
                                            <input
                                                type="text"
                                                id="res_firstname"
                                                className="block w-full rounded border-b border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="ชื่อจริง"
                                                value={row.firstname}
                                                onChange={(e) =>
                                                    handleFirstNameChange(row.id, e.target.value)
                                                }
                                                required
                                            />
                                            <input
                                                type="text"
                                                id="res_lastname"
                                                className="block w-full rounded border-b border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="นามสกุล"
                                                value={row.lastname}
                                                onChange={(e) =>
                                                    handleLastNameChange(row.id, e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </td>
                                    <td className="flex items-center justify-center px-6 py-4 bg-gray-50">
                                        <Tooltip title="เพิ่มแถว">
                                            <IconButton
                                                aria-label="add_row"
                                                size="small"
                                                onClick={addResponsibleRow}
                                            >
                                                <PlusCircleIcon className="h-9 w-9" />
                                            </IconButton>
                                        </Tooltip>
                                        {responsibleRows.length > 1 && (
                                            <Tooltip title="ลบแถว">
                                                <IconButton
                                                    aria-label="delete_row"
                                                    size="small"
                                                    onClick={() => deleteResponsibleRow(row.id)}
                                                >
                                                    <XCircleIcon className="h-9 w-9" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                4.ความสอดคล้องกับยุทธศาสตร์ของคณะวิชา/มหาวิทยาลัยพายัพ
            </h3>
            <div className="mb-6 grid gap-x-6 gap-y-3 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="countries"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        4.1 ประเด็นยุทธศาสตร์ที่
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="countries"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        4.2 เป้าประสงค์ที่
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="countries"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        4.3 กลยุทธ์ระดับมหาวิทยาลัยที่
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="countries"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        4.4 ตัวชี้วัดแผนกลยุทธ์ที่
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="countries"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        4.5 ตัวชี้วัดแผนปฏิบัติการที่
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="countries"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        4.6 ตัวชี้วัดโครงการ
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="countries"
                        className="mb-2 block text-base font-medium text-gray-900"
                    >
                        4.7 สถานะโครงการ
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
            </div>
            <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                5.ประเภทโครงการ
            </h3>
            {/* <div className='rounded border border-gray-200 p-2'> */}
            <div className="mb-6">
                <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            แผนทำนุบำรุงศิลปวัฒนธรรม
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            แผนบริการวิชาการ
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            แผนการจัดการความรู้
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            แผนการส่งเสริมงานวิจัย
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            แผนการประกันคุณภาพการศึกษา
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            แผนพัฒนาบุคลากร
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            แผนบริหารความเสี่ยง
                        </label>
                    </div>
                </div>
                <div className="my-3 rounded border border-gray-200">
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-1">
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                แผนพัฒนานักศึกษาตามกรอบมาตรฐานคุณวุฒิ และกิจกรรมพัฒนานักศึกษา{' '}
                                <b>(เลือกได้มากกว่า 1 ประเภท)</b>
                            </label>
                        </div>
                    </div>
                    <div className="grid gap-x-6 gap-y-0 px-2 pb-2 pt-0 md:grid-cols-2">
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                ด้านคุณธรรม จริยธรรม
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                กิจกรรมด้านวิชาการที่ส่งเสริมคุณลักษณะที่พึงประสงค์
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                ด้านความรู้
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                กิจกรรมบำเพ็ญประโยชน์หรือรักษาสิ่งแวดล้อม
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                ด้านทักษะทางปัญญา
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                กิจกรรมกีฬา และการส่งเสริมสุขภาพ
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                ด้านทักษะด้านความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                กิจกรรมส่งเสริมศิลปะและวัฒนธรรม
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสาร และการใช้เทคโนโลยี
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                กิจกรรมเสริมสร้างคุณธรรม จริยธรรม
                            </label>
                        </div>
                        <div className="flex items-center ps-4">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                กิจกรรมส่งเสริมพัฒนาทักษะชีวิตความเป็นผู้นำ
                            </label>
                        </div>
                        <div className="ps-4">
                            <div className="flex items-center">
                                <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                                >
                                    อื่นๆ
                                </label>
                                <div className="border-b border-gray-300">
                                    <input
                                        type="text"
                                        id="website"
                                        className="w-full rounded bg-gray-50 text-base text-gray-900"
                                        placeholder="โปรดระบุ"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                    <div className="rounded border border-gray-200 ps-4">
                        <div className="flex items-center">
                            <input
                                id="bordered-checkbox-1"
                                type="checkbox"
                                value=""
                                name="bordered-checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <label
                                htmlFor="bordered-checkbox-1"
                                className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                            >
                                อื่นๆ
                            </label>
                            <div className="border-b border-gray-300">
                                <input
                                    type="text"
                                    id="website"
                                    className="w-full rounded bg-gray-50 text-base text-gray-900"
                                    placeholder="โปรดระบุ"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}

            <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                6.การตอบสนองต่อคุณลักษณะของบัณฑิตที่พึงประสงค์/อัตลักษณ์ของมหาวิทยาลัยพายัพ
            </h3>
            <div className="mb-6">
                <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            คุณธรรมนำใจ
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            รับใช้สังคม
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            วิชาการก้าวหน้า
                        </label>
                    </div>
                    <div className="flex items-center rounded border border-gray-200 ps-4">
                        <input
                            id="bordered-checkbox-1"
                            type="checkbox"
                            value=""
                            name="bordered-checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="ms-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                            พัฒนาสู่สากล
                        </label>
                    </div>
                </div>
            </div>

            <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                7.หลักการและเหตุผล
            </h3>
            <div className="mb-6">
                <div className="grid gap-6 md:grid-cols-1">
                    <textarea
                        id="message"
                        rows={4}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder=""
                    ></textarea>
                </div>
            </div>

            <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                8.วัตถุประสงค์ ตัวชี้วัด ค่าเป้าหมาย/เกณฑ์ความสำเร็จ และ เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
            </h3>
            <div className="mb-6">
                <div className="grid gap-6 md:grid-cols-1">
                    <div className="relative overflow-x-auto">
                        <table className="w-full rounded border text-left text-sm text-gray-500">
                            <thead className="bg-gray-200 text-center text-base uppercase text-gray-700">
                                <tr>
                                    <th scope="col" className="bg-gray-300 px-6 py-3">
                                        วัตถุประสงค์โครงการ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ตัวชี้วัด
                                    </th>
                                    <th scope="col" className="bg-gray-300 px-6 py-3">
                                        เป้าหมาย (เกณฑ์ความสำเร็จ)
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        เครื่องมือ/วิธีการเก็บรวบรวมข้อมูลตามตัวชี้วัด
                                    </th>
                                    <th scope="col" className="bg-gray-300 w-[10%] px-6 py-3">
                                        เพิ่ม/ลบแถว
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {OIVTRows.map((row) => (
                                    <tr className="border-b bg-white">
                                        <td className="px-6 py-4 bg-gray-50">
                                            <div className={`grid grid-cols-1 gap-6`}>
                                                <input
                                                    type="text"
                                                    id="oivt_objective"
                                                    className="block w-full rounded border-b border-gray-300 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder=""
                                                    value={row.objective}
                                                    onChange={(e) =>
                                                        handleOIVTChange(row.id, 'objective', e.target.value)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`grid grid-cols-1 gap-6`}>
                                                <input
                                                    type="text"
                                                    id="oivt_indicator"
                                                    className="block w-full rounded border-b border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder=""
                                                    value={row.indicator}
                                                    onChange={(e) =>
                                                        handleOIVTChange(row.id, 'indicator', e.target.value)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 bg-gray-50">
                                            <div className={`grid grid-cols-1 gap-6`}>
                                                <input
                                                    type="text"
                                                    id="oivt_value"
                                                    className="block w-full rounded border-b border-gray-300 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder=""
                                                    value={row.value}
                                                    onChange={(e) =>
                                                        handleOIVTChange(row.id, 'value', e.target.value)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`grid grid-cols-1 gap-6`}>
                                                <input
                                                    type="text"
                                                    id="oivt_tool"
                                                    className="block w-full rounded border-b border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder=""
                                                    value={row.tool}
                                                    onChange={(e) =>
                                                        handleOIVTChange(row.id, 'tool', e.target.value)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </td>
                                        <td className="flex items-center justify-center px-6 py-4 bg-gray-50">
                                            <Tooltip title="เพิ่มแถว">
                                                <IconButton
                                                    aria-label="add_row"
                                                    size="small"
                                                    onClick={addOIVTRow}
                                                >
                                                    <PlusCircleIcon className="h-9 w-9" />
                                                </IconButton>
                                            </Tooltip>
                                            {OIVTRows.length > 1 && (
                                                <Tooltip title="ลบแถว">
                                                    <IconButton
                                                        aria-label="delete_row"
                                                        size="small"
                                                        onClick={() => deleteOIVTRow(row.id)}
                                                    >
                                                        <XCircleIcon className="h-9 w-9" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <h3 className="mb-2 block text-base font-medium text-gray-900 ">
                9.ประโยชน์ที่คาดว่าจะได้รับ
            </h3>

            <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
                Submit
            </button>
        </form>
    );
}
