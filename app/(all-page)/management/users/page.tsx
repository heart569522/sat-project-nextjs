import Pagination from '@/app/components/pagination';
import SearchAuto from '@/app/components/search-box/search-auto';
import { Metadata } from 'next';
import { fetchPages, getUserLoginData } from '@/app/lib/api-service';
import UsersTable from '@/app/components/tables/users-table';
import { auth } from '@/auth';

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
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPages('users/fetch-page', query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>รายการผู้ใช้งานระบบ</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <CreateInvoice /> */}
        <SearchAuto placeholder="ค้นหาข้อมูลในตาราง" />
      </div>
      <UsersTable query={query} currentPage={currentPage} userId={userData.id}/>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
