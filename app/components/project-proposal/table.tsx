'use client';
import React from 'react';
import { fetchFilter } from '@/app/lib/api-service';
import { convertISOStringToDateText } from '@/app/lib/services';
import {
  DeleteButton,
  DetailButton,
  EditButton,
} from '@/app/components/buttons/buttons';
import { useEffect, useState } from 'react';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { IconButton } from '@mui/material';
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

export default function ProjectProposalTable({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: number;
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRemark, setShowRemark] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);

    const res = await fetchFilter(
      'project-proposal/fetch-filter',
      query,
      currentPage,
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
    setShowRemark((prevShowRemark) =>
      prevShowRemark === rowId ? null : rowId,
    );
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
                          <p className="text-sm font-medium">
                            เบอร์โทรศัพท์ผู้รับผิดชอบ
                          </p>
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
                          <StatusBadge
                            docType={'pn01'}
                            statusId={row.status_id}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-4">
                        <DetailButton
                          id={row.id}
                          path="project-proposal/document"
                        />
                        <EditButton
                          id={row.id}
                          path="project-proposal"
                          disabled={!row.is_edit && !row.is_draft}
                        />
                        <ButtonDialog
                          id={row.id}
                          apiPath="project-proposal"
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
                      รหัสเอกสาร
                    </th>
                    <th scope="col" className="px-3 py-5">
                      โครงการ/กิจกรรม
                    </th>
                    <th scope="col" className="w-[15%] px-3 py-5">
                      ผู้รับผิดชอบโครงการ
                    </th>
                    <th scope="col" className="w-[15%] px-3 py-5">
                      เบอร์โทรศัพท์ผู้รับผิดชอบ
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      วันที่
                    </th>
                    <th scope="col" className="w-[10%] px-3 py-5">
                      สถานะ
                    </th>
                    <th scope="col" className="w-[5%] px-3 py-5">
                      หมายเหตุ
                    </th>
                    <th scope="col" className="w-[15%] px-3 py-5">
                      จัดการ
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {loading ? (
                    <>
                      <TableRowFullSkeleton countColumn={9} />
                    </>
                  ) : data.length === 0 ? (
                    <>
                      <TableRowFullNotFound countColumn={9} />
                    </>
                  ) : (
                    data?.map((row: any, i: number) => (
                      <React.Fragment key={row.id}>
                        <tr className="group text-center">
                          <td
                            rowSpan={showRemark === row.id ? 2 : 1}
                            className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-base text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6"
                          >
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.project_code || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.project_name || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.project_head || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {row.project_head_phone || '-'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {convertISOStringToDateText(row.created_at)}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            <StatusBadge
                              docType={'pn01'}
                              statusId={row.status_id}
                            />
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            <IconButton
                              onClick={() => handleOpenRemark(row.id)}
                              disabled={Boolean(!row.status_remark)}
                            >
                              <FeedbackOutlinedIcon
                                className={`${
                                  Boolean(row.status_remark)
                                    ? 'text-red-700'
                                    : 'text-gray-400'
                                } h-6 w-6 `}
                              />
                            </IconButton>
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            <div className="flex justify-center gap-2">
                              <DetailButton
                                id={row.id}
                                path="project-proposal/document"
                              />
                              <EditButton
                                id={row.id}
                                path="project-proposal"
                                disabled={!row.is_edit && !row.is_draft}
                              />
                              <ButtonDialog
                                id={row.id}
                                apiPath="project-proposal"
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
                          </td>
                        </tr>
                        {showRemark === row.id && (
                          <tr className="group">
                            <td
                              colSpan={9}
                              className="whitespace-nowrap rounded-md bg-white px-4 pb-5 pt-2 text-sm"
                            >
                              <div className="flex flex-col items-start">
                                <p className="text-sm font-medium underline">
                                  หมายเหตุ
                                </p>
                                <p className="text-base">
                                  {row.status_remark || '-'}
                                </p>
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
