import Pagination from '@/app/components/pagination';
import SearchAuto from '@/app/components/search-box/search-auto';
import { Metadata } from 'next';
import { fetchPages } from '@/app/lib/api-service';
import ProjectProposalTable from '@/app/components/tables/project-proposal-table';
import { CreateRequestProjectProposal } from '@/app/components/buttons/buttons';

export const metadata: Metadata = {
  title: 'จัดการคำร้องขอเสนอโครงการ/กิจกรรม พน.01',
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

  const totalPages = await fetchPages('project-proposal/fetch-page', query, undefined, 'isAdminTable');

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-xl md:text-2xl`}>
          จัดการคำร้องขอเสนอโครงการ / กิจกรรม พน.01
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateRequestProjectProposal buttonText='เพิ่มโครงการ/กิจกรรม'/>
        <SearchAuto placeholder="ค้นหาข้อมูลในตาราง" />
      </div>
      <ProjectProposalTable query={query} currentPage={currentPage} isAdminTable={true}/>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
