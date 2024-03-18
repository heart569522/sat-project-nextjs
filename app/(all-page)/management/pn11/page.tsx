import Pagination from '@/app/components/pagination';
import SearchAuto from '@/app/components/search-box/search-auto';
import { Metadata } from 'next';
import { fetchPages } from '@/app/lib/api-service';
import ActivityTranscriptTable from '@/app/components/tables/activity-transcript-table';
import { CreateRequestTranscript } from '@/app/components/buttons/buttons';
import IsAdminAuthen from '@/app/lib/isAuthen';
import { notFound } from 'next/navigation';

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
  const isAdmin = await IsAdminAuthen();
  if (!isAdmin) {
    notFound();
  }
  
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPages('activity-transcript/fetch-page', query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>จัดการคำร้องขอระเบียนกิจกรรม พน.11</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateRequestTranscript buttonText="เพิ่มคำร้องขอระเบียนกิจกรรม" />
        <SearchAuto placeholder="ค้นหาข้อมูลในตาราง" />
      </div>
      <ActivityTranscriptTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
