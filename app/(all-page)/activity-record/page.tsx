import PN10Form from '@/app/components/form/pn10-form';
import Pagination from '@/app/components/pagination';
import SearchAuto from '@/app/components/search-box/search-auto';
import ActivityRecordTable from '@/app/components/tables/activity-record-table';
import { fetchPages, getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPages(
    'attendance/fetch-page',
    query,
    userData.id,
  );

  return (
    <>
      <div className="flex text-xl md:text-2xl">
        บันทึกการเข้าร่วมโครงการ/กิจกรรม
      </div>
      <div className="my-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
        <PN10Form userID={userData.id} userRole={userData.role} />
      </div>
      <div className="my-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
        <div className="flex items-center justify-between gap-2 md:mt-8">
          <SearchAuto placeholder="ค้นหารายการบันทึกการเข้าร่วมโครงการ/กิจกรรม" />
        </div>
        <ActivityRecordTable
          userId={userData.id}
          query={query}
          currentPage={currentPage}
        />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
