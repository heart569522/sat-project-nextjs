import Pagination from '@/app/components/pagination';
import SearchAuto from '@/app/components/search-box/search-auto';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchPages } from '@/app/lib/api-service';
import ActivityRecordTable from '@/app/components/tables/activity-record-table';

export const metadata: Metadata = {
  title: 'จัดการบันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPages(
    'attendance/fetch-page',
    query,
    undefined,
    'isAdminTable',
  );

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>
          รายการข้อมูลบันทึกการเข้าร่วมโครงการ / กิจกรรม พน.10
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchAuto placeholder="ค้นหาข้อมูลในตาราง" />
      </div>
      <ActivityRecordTable
        query={query}
        currentPage={currentPage}
        isAdminTable={true}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
