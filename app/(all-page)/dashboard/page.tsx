import CardWrapper from '@/app/components/dashboard/cards';
import RevenueChart from '@/app/components/dashboard/revenue-chart';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/components/skeletons';
import LatestPN01 from '@/app/components/dashboard/latest-pn01';
import LatestPN11 from '@/app/components/dashboard/latest-pn11';

export default async function Page() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>แดชบอร์ด</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestPN01 />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestPN11 />
        </Suspense>
      </div>
    </main>
  );
}
