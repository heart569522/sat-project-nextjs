import { Metadata } from 'next';
import SearchHistory from '@/app/components/search-box/search-history';
import { CreateRequestTranscript } from '@/app/components/buttons/buttons';
import Pagination from '@/app/components/pagination';
import HistoryActivityTable from '@/app/components/tables/history-activity-table';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { Suspense } from 'react';
import { ActivityHistoryLoading } from '@/app/components/loading-screen';

export const metadata: Metadata = {
  title: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="w-full">
      <div className="flex text-xl md:text-2xl">
        ประวัติการเข้าร่วมโครงการ/กิจกรรม
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-start gap-2 md:mt-8">
          <CreateRequestTranscript />
        </div>
        <div className="my-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
          <SearchHistory />
        </div>
        {query && (
          <div className="my-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
            <Suspense key={query} fallback={<ActivityHistoryLoading />}>
              <HistoryActivityTable query={query} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
