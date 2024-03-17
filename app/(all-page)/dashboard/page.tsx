import CardWrapper from '@/app/components/dashboard/cards';
import RevenueChart from '@/app/components/dashboard/revenue-chart';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestDataSkeleton,
  CardsSkeleton,
} from '@/app/components/skeletons';
import LatestPN01 from '@/app/components/dashboard/latest-pn01';
import LatestPN11 from '@/app/components/dashboard/latest-pn11';
import LatestSignUp from '@/app/components/dashboard/latest-signup';

export default async function Page() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>แดชบอร์ด</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid gap-3 grid-cols-1 lg:grid-cols-8 xl:grid-cols-12">
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}
        <Suspense fallback={<LatestDataSkeleton />}>
          <LatestPN01 />
        </Suspense>
        <Suspense fallback={<LatestDataSkeleton />}>
          <LatestPN11 />
        </Suspense>
        <Suspense fallback={<LatestDataSkeleton />}>
          <LatestSignUp />
        </Suspense>
      </div>
    </main>
  );
}
