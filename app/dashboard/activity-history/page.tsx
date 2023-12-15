import { Metadata } from 'next';
import Search from '@/app/components/search';
import { CreateRequestTranscript } from '@/app/components/invoices/buttons';
import Pagination from '@/app/components/invoices/pagination';
import Table from '@/app/components/history-activity/table';

export const metadata: Metadata = {
  title: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({}: {}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>ประวัติการเข้าร่วมโครงการ/กิจกรรม</h1>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2 md:mt-8">
          <CreateRequestTranscript />
          <Search placeholder="ค้นหาประวัติการเข้าร่วมกิจกรรม" />
        </div>
        <Table />
        {/* <Table query={null} currentPage={currentPage} /> */}
        {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={null} />
        </div> */}
      </div>
    </div>
  );
}
