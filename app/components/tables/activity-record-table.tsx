'use client';
import React from 'react';
import {
  fetchFilter,
  getAllData,
  getOneData,
  updateData,
} from '@/app/lib/api-service';
import { convertISOStringToDateText } from '@/app/lib/services';
import {
  DeleteButton,
  DetailButton,
  EditButton,
} from '@/app/components/buttons/buttons';
import { useEffect, useState } from 'react';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  TableRowFullSkeleton,
  TableRowMobileSkeleton,
} from '@/app/components/skeletons';
import StatusBadge from '@/app/components/status-badge/status';
import {
  TableRowFullNotFound,
  TableRowMobileNotFound,
} from '@/app/components/not-found';
import { ButtonDialog } from '@/app/components/buttons/button-dialog';
import { Button } from '../buttons/button';
import { PN10, StudentList } from '@/app/model/pn10';

export default function ActivityRecordTable({
  userId,
  query,
  currentPage,
  isAdminTable,
}: {
  userId?: string;
  query?: string;
  currentPage?: number;
  isAdminTable?: boolean;
}) {
  // console.log('🚀 ~ isAdminTable:', isAdminTable);
  const [data, setData] = useState<PN10[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStudents, setShowStudents] = useState<string | null>(null);

  const [hour, setHour] = useState('');
  const [isEditHour, setIsEditHour] = useState(false);
  const [editingRowId, setEditingRowId] = useState('');

  const fetchData = async () => {
    setLoading(true);

    const res = await fetchFilter(
      'attendance/fetch-filter',
      query,
      currentPage,
      userId,
      isAdminTable ? 'isAdminTable' : undefined,
    );

    if (res) {
      setData(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataWithTimeout = () => {
      // setTimeout(() => {
      fetchData();
      // }, 2000);
    };

    fetchDataWithTimeout();
  }, [query, currentPage]);

  const handleOpenRemark = (rowId: string) => {
    setShowStudents((prevShowRemark) =>
      prevShowRemark === rowId ? null : rowId,
    );
  };

  const handleSaveData = async (apiPath: string, rowId: string, data: any) => {
    try {
      const response = await updateData(apiPath, data, rowId, true);

      if (response && (response.status === 201 || response.status === 200)) {
        setHour('');
        setIsEditHour(false);
        setEditingRowId('');
        fetchData();
      }
    } catch (error) {
      console.log('update row failed');
    }
  };

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {loading ? (
                  <>
                    <TableRowMobileSkeleton countColumn={3} />
                  </>
                ) : data.length === 0 ? (
                  <TableRowMobileNotFound />
                ) : (
                  data?.map((row: any, i: number) => (
                    <div
                      key={row.id}
                      className="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div className="flex items-center justify-between gap-2 border-b pb-4">
                        <div className="flex items-center justify-start gap-3">
                          <div className="text-center text-gray-900">
                            <p className="font-semibold">{i + 1}</p>
                          </div>
                          <div className="flex flex-col items-start justify-center gap-y-1">
                            <p className="text-sm font-medium">
                              โครงการ/กิจกรรม
                            </p>
                            <p className="text-lg font-semibold">
                              {row.project_name || '-'}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-y-1">
                          <p className="text-sm font-medium">รหัสเอกสาร</p>
                          <p className="text-lg font-semibold">
                            {row.project_code || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between border-b py-5">
                        <div className="flex flex-col items-start justify-center gap-y-1">
                          <p className="text-sm font-medium">จำนวนนักศึกษา</p>
                          <p className="text-lg font-semibold">
                            {row.students.length || '-'} คน
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-y-1">
                          <p className="text-sm font-medium">ปีการศึกษา</p>
                          <p className="text-base font-semibold">
                            {row.project_year || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between border-b py-5">
                        <div className="flex flex-col items-start justify-center gap-y-2">
                          <p className="text-sm font-medium">จำนวนชั่วโมง</p>
                          <p className="text-base font-semibold">
                            {row.project_hour || '0'}&nbsp;ชั่วโมง
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-y-2">
                          <p className="text-sm font-medium">วันที่บันทึก</p>
                          <p className="text-base font-semibold">
                            {convertISOStringToDateText(row.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-4">
                        <DetailButton
                          id={row.id}
                          path={
                            isAdminTable
                              ? 'management/pn10/document'
                              : 'activity-record/document'
                          }
                        />
                        <EditButton
                          id={row.id}
                          path={
                            isAdminTable ? 'management/pn10' : 'activity-record'
                          }
                        />
                        <ButtonDialog
                          id={row.id}
                          apiPath="attendance"
                          action="delete"
                          title="ลบบันทึกการเข้าร่วมโครงการ/กิจกรรม"
                          detail={`คุณยืนยันที่จะลบรายการบันทึกนี้ ?`}
                          onSuccess={fetchData}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-center text-base font-semibold">
                  <tr>
                    <th scope="col" className="w-[5%] px-4 py-5 sm:pl-6">
                      ลำดับ
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      รหัสเอกสาร
                    </th>
                    <th
                      scope="col"
                      className={`${
                        isAdminTable ? 'w-[30%]' : 'w-[40%]'
                      } px-3 py-5`}
                    >
                      โครงการ/กิจกรรม
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      รายการนักศึกษา
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      ปีการศึกษา
                    </th>
                    <th
                      scope="col"
                      className={`${
                        isAdminTable ? 'w-[20%]' : 'w-[10%]'
                      } px-3 py-5`}
                    >
                      จำนวนชั่วโมง
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      วันที่บันทึก
                    </th>
                    <th scope="col" className="w-[15%] px-3 py-5">
                      จัดการ
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {loading ? (
                    <>
                      <TableRowFullSkeleton
                        countColumn={isAdminTable ? 8 : 8}
                      />
                    </>
                  ) : data.length === 0 ? (
                    <>
                      <TableRowFullNotFound
                        countColumn={isAdminTable ? 8 : 8}
                      />
                    </>
                  ) : (
                    data?.map((row: any, i: number) => (
                      <React.Fragment key={row.id}>
                        <tr className="group text-center">
                          <td
                            rowSpan={showStudents === row.id ? 2 : 1}
                            className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-base text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6"
                          >
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.project_code || '-'}
                          </td>
                          <td
                            title={row.project_name || '-'}
                            className="max-w-[200px] truncate bg-white px-4 py-5 text-sm"
                          >
                            {row.project_name || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            <Tooltip title="รายละเอียด" arrow>
                              <IconButton
                                onClick={() => handleOpenRemark(row.id)}
                              >
                                <ListAltOutlinedIcon
                                  className={`h-6 w-6 text-gray-500`}
                                />
                              </IconButton>
                            </Tooltip>
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.project_year || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {isAdminTable ? (
                              <div className="mt-2 flex items-center justify-center gap-2">
                                {isEditHour && editingRowId === row.id ? (
                                  <>
                                    <TextField
                                      size="small"
                                      className="w-full"
                                      value={hour}
                                      onChange={(e) => setHour(e.target.value)}
                                      placeholder=""
                                      type="number"
                                    />
                                    <button
                                      type="button"
                                      className="h-10 rounded-md border border-blue-500 px-3 text-blue-600 hover:bg-blue-100"
                                      onClick={() => {
                                        setIsEditHour(false);
                                        setHour('');
                                        setEditingRowId('');
                                      }}
                                    >
                                      ยกเลิก
                                    </button>
                                    <Button
                                      type="button"
                                      className="rounded-md"
                                      onClick={() =>
                                        handleSaveData(
                                          'attendance/update-hour',
                                          row.id,
                                          hour,
                                        )
                                      }
                                    >
                                      บันทึก
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-center text-base">
                                      {row.project_hour || '0'} ชั่วโมง
                                    </p>
                                    <Button
                                      type="button"
                                      className="h-8 rounded-md"
                                      onClick={() => {
                                        setIsEditHour(true);
                                        setEditingRowId(row.id);
                                      }}
                                    >
                                      แก้ไข
                                    </Button>
                                  </>
                                )}
                              </div>
                            ) : (
                              <>{row.project_hour || '0'}&nbsp;ชั่วโมง</>
                            )}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {convertISOStringToDateText(row.created_at)}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            <div className="flex justify-center gap-2">
                              <DetailButton
                                id={row.id}
                                path={
                                  isAdminTable
                                    ? 'management/pn10/document'
                                    : 'activity-record/document'
                                }
                              />
                              <EditButton
                                id={row.id}
                                path={
                                  isAdminTable
                                    ? 'management/pn10'
                                    : 'activity-record'
                                }
                              />
                              <ButtonDialog
                                id={row.id}
                                apiPath="attendance"
                                action="delete"
                                title="ลบบันทึกการเข้าร่วมโครงการ/กิจกรรม"
                                detail={`คุณยืนยันที่จะลบรายการบันทึกนี้ ?`}
                                onSuccess={fetchData}
                              />
                            </div>
                          </td>
                        </tr>
                        {showStudents === row.id && (
                          <tr className="group">
                            <td
                              colSpan={isAdminTable ? 8 : 8}
                              className="whitespace-nowrap rounded-md bg-white px-4 pb-5 pt-2 text-sm"
                            >
                              <div className="flex flex-col items-start gap-2">
                                <p className="mb-2 text-base font-semibold underline">
                                  รายการนักศึกษา
                                </p>
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-gray-300 text-center text-base font-semibold">
                                      <td className="w-[10%] border border-black p-3">
                                        ลำดับ
                                      </td>
                                      <td className="w-[15%] border border-black p-3">
                                        รหัสนักศึกษา
                                      </td>
                                      <td className="border border-black p-3">
                                        ชื่อ-นามสกุล
                                      </td>
                                      <td className="w-[25%] border border-black p-3">
                                        หมายเหตุ
                                      </td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row.students.map(
                                      (list: StudentList, i: number) => (
                                        <tr className="text-base" key={i}>
                                          <td className="border border-black p-1 text-center">
                                            {i + 1}
                                          </td>
                                          <td className="border border-black p-1 text-center">
                                            {list.Std}
                                          </td>
                                          <td className="border border-black px-2 py-1 text-left">
                                            {list.Name}
                                          </td>
                                          <td className="border border-black p-1 text-center">
                                            {list.remark}
                                          </td>
                                        </tr>
                                      ),
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
