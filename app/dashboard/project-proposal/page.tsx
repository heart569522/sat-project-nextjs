import Breadcrumbs from '@/app/components/breadcrumbs';
import { CreateRequestProjectProposal } from '@/app/components/buttons';
import PN01Form from '@/app/components/form/pn01-form';
import ProjectProposalTable from '@/app/components/project-proposal/table';
import SearchAuto from '@/app/components/search-box/search-auto';
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
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'โครงการ/กิจกรรม',
            href: '/dashboard/project-proposal',
            active: true,
          },
        ]}
      />
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2 md:mt-8">
          <CreateRequestProjectProposal />
          <SearchAuto placeholder="ค้นหาโครงการ/กิจกรรม" />
        </div>
        <ProjectProposalTable />
        {/* <Table query={query} currentPage={currentPage} /> */}
        {/* <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div> */}
      </div>
    </div>
  );
}
