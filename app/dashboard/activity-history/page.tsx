import { Metadata } from 'next';
import SearchHistory from '@/app/components/search-box/search-history';
import { CreateRequestTranscript } from '@/app/components/buttons';
import Pagination from '@/app/components/pagination';
import Table from '@/app/components/history-activity/table';
import Breadcrumbs from '@/app/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({}: {}) {
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
            href: '/dashboard/activity-history',
            active: true,
          },
        ]}
      />
      <div className="mt-4">
        <div className="flex items-center justify-start gap-2 md:mt-8">
          <CreateRequestTranscript />
        </div>
        <div className="my-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
          <SearchHistory />
        </div>

        {/* <Table /> */}
        {/* <Table query={null} currentPage={currentPage} /> */}
        {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={null} />
        </div> */}
      </div>
    </div>
  );
}
