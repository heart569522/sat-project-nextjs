import Pagination from '@/app/components/pagination';
import SearchAuto from '@/app/components/search-box/search-auto';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'จัดการคำร้องขอระเบียนกิจกรรม พน.11',
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>รายการข้อมูลบันทึกการเข้าร่วมโครงการ / กิจกรรม พน.10</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchAuto placeholder="ค้นหาข้อมูลในตาราง" />
      </div>
      
    </div>
  );
}
