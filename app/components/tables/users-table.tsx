'use client';
import React from 'react';
import { fetchFilter, getAllData, updateData } from '@/app/lib/api-service';
import { convertISOStringToDateText } from '@/app/lib/services';
import {
  DeleteButton,
  DetailButton,
  EditButton,
} from '@/app/components/buttons/buttons';
import { useEffect, useState } from 'react';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
import { Button } from '@/app/components/buttons/button';

interface ToggleCanEditState {
  [key: string]: boolean;
}

export default function UsersTable({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: number;
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showRemark, setShowRemark] = useState<string | null>(null);
  const [showRecipient, setShowRecipient] = useState<string | null>(null);

  const [remark, setRemark] = useState('');
  const [selectedStatus, setSelectedStatus] = useState();
  const [toggleVerify, setToggleVerify] = useState<ToggleCanEditState>({});

  const fetchData = async () => {
    setLoading(true);

    const res = await fetchFilter('users/fetch-filter', query, currentPage);

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
    setShowRemark((prevShowRemark) =>
      prevShowRemark === rowId ? null : rowId,
    );
    setShowRecipient(null);
  };

  const handleOpenRecipientDetail = (rowId: string) => {
    setShowRecipient((prevShowRecipient) =>
      prevShowRecipient === rowId ? null : rowId,
    );
    setShowRemark(null);
  };

  const handleSelectChange = async (
    event: { target: { value: any } },
    rowId: any,
  ) => {
    try {
      const newValue = event.target.value;
      setSelectedStatus((prevSelected: any) => ({
        ...prevSelected,
        [rowId]: newValue,
      }));

      await handleSaveData('users/update-status', rowId, newValue);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  const handleToggle = async (rowId: string) => {
    try {
      setToggleVerify((prevToggleCanEdit) => {
        const newToggleVerify = {
          ...prevToggleCanEdit,
          [rowId]: !prevToggleCanEdit[rowId],
        };

        handleSaveData(
          'users/update-edit-state',
          rowId,
          newToggleVerify[rowId],
        );

        // Return the new state
        return newToggleVerify;
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  const handleSaveData = async (apiPath: string, rowId: string, data: any) => {
    console.log('🚀 ~ handleSaveData ~ data:', data);
    try {
      const response = await updateData(apiPath, data, rowId, true);

      if (response && (response.status === 201 || response.status === 200)) {
        console.log('update row success');
        setRemark('');
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
                          <p className="text-sm font-medium">
                            ผู้รับผิดชอบโครงการ
                          </p>
                          <p className="text-base font-semibold">
                            {row.project_head || '-'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-y-1">
                          <p className="text-sm font-medium">เบอร์โทรศัพท์</p>
                          <p className="text-base font-semibold">
                            {row.project_head_phone || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between border-b py-5">
                        <div className="flex flex-col items-start justify-center gap-y-2">
                          <p className="text-sm font-medium">วันที่</p>
                          <p className="text-base font-semibold">
                            {convertISOStringToDateText(row.created_at)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-y-2">
                          <p className="text-sm font-medium">สถานะ</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-4">
                        <DetailButton
                          id={row.id}
                          path="activity-transcript/document"
                        />
                        <EditButton
                          id={row.id}
                          path="activity-transcript"
                          disabled={!row.is_edit && !row.is_draft}
                        />
                        <ButtonDialog
                          id={row.id}
                          apiPath="users"
                          action="delete"
                          title="ลบโครงการ/กิจกรรม"
                          detail={`${
                            row.is_draft
                              ? 'คุณยืนยันที่จะลบรายการแบบร่างนี้ ?'
                              : `คุณยืนยันที่จะลบรายการโครงการ/กิจกรรม "${row.project_name}" ?`
                          }`}
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
                      ชื่อผู้ใช้
                    </th>
                    <th scope="col" className="w-[15%] px-3 py-5">
                      ชื่อ - สกุล
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      คณะ/วิทยาลัย
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      สาขาวิชา
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      เบอร์โทรศัพท์
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      อีเมล
                    </th>
                    <th scope="col" className="w-[5%] px-3 py-5">
                      สิทธ์
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      สถานะ
                    </th>
                    <th scope="col" className="w-[15%] px-3 py-5">
                      จัดการ
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {loading ? (
                    <>
                      <TableRowFullSkeleton countColumn={10} />
                    </>
                  ) : data.length === 0 ? (
                    <>
                      <TableRowFullNotFound countColumn={10} />
                    </>
                  ) : (
                    data?.map((row: any, i: number) => (
                      <React.Fragment key={row.id}>
                        <tr className="group text-center">
                          <td
                            rowSpan={
                              (showRemark || showRecipient) === row.id ? 2 : 1
                            }
                            className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-base text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6"
                          >
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.username || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-left text-sm">
                            {row.firstname + ' ' + row.lastname || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.faculty_name || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.major_name || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.phone || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.email || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.role == 'teacher'
                              ? 'อาจารย์'
                              : row.role == 'admin'
                              ? 'เจ้าหน้าที่'
                              : '' || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            <div className="flex items-center justify-evenly gap-1">
                              {/* <p className="text-base">ปิด</p> */}
                              <Switch
                                checked={
                                  toggleVerify?.[row.id] ?? row.is_verify
                                }
                                onClick={() => handleToggle(row.id)}
                                color="success"
                              />
                              <p className="text-base">
                                {row.is_verify ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยีน'}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            <div className="flex justify-center gap-2">
                              <DetailButton
                                id={row.id}
                                path={'management/pn11/document'}
                              />
                              <EditButton
                                id={row.id}
                                path={'management/pn11'}
                              />
                              <ButtonDialog
                                id={row.id}
                                apiPath="users"
                                action="delete"
                                title="ลบคำร้องระเบียนกิจกรรม"
                                detail={`คุณยืนยันที่จะลบคำร้องขอระเบียนกิจกรรมฉบับนี้ ?`}
                                onSuccess={fetchData}
                              />
                            </div>
                          </td>
                        </tr>
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
