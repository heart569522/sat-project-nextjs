import Pagination from '@/app/components/pagination';
import SearchAuto from '@/app/components/search-box/search-auto';
import Table from '@/app/components/management-com/userManagement/table';
import { CreateInvoice } from '@/app/components/buttons';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'จัดการข้อมูลผู้ใช้งานระบบ',
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
        <h1 className={`text-2xl`}>รายการผู้ใช้งานระบบ</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateInvoice />
        <SearchAuto placeholder="ค้นหาข้อมูลในตาราง" />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
