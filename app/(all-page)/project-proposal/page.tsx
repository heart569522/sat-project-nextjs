import Breadcrumbs from '@/app/components/breadcrumbs';
import { CreateRequestProjectProposal } from '@/app/components/buttons/buttons';
import PN01Form from '@/app/components/form/pn01-form';
import Pagination from '@/app/components/pagination';
import ProjectProposalTable from '@/app/components/tables/project-proposal-table';
import SearchAuto from '@/app/components/search-box/search-auto';
import { fetchPages, getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เสนอโครงการ/กิจกรรม (พน.01)',
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
  const userData = await getUserLoginData(id)

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPages(
    'project-proposal/fetch-page',
    query,
    userData.id,
  );

  return (
    <div className="mb-2 w-full">
      <div className="flex text-xl md:text-2xl">โครงการ/กิจกรรม</div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2 md:mt-8">
          <CreateRequestProjectProposal />
          <SearchAuto placeholder="ค้นหาโครงการ/กิจกรรม" />
        </div>
        <ProjectProposalTable
          userId={userData.id}
          query={query}
          currentPage={currentPage}
        />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
