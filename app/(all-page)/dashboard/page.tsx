import CardWrapper from '@/app/components/dashboard/cards';
import { Suspense } from 'react';
import {
  LatestDataSkeleton,
  CardsSkeleton,
} from '@/app/components/skeletons';
import LatestPN01 from '@/app/components/dashboard/latest-pn01';
import LatestPN11 from '@/app/components/dashboard/latest-pn11';
import LatestSignUp from '@/app/components/dashboard/latest-signup';
import { Metadata } from 'next';
import IsAdminAuthen from '@/app/lib/isAuthen';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'แดชบอร์ด',
};

export default async function Page() {
  const isAdmin = await IsAdminAuthen();
  if (!isAdmin) {
    notFound();
  }
  
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>แดชบอร์ด</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-8 xl:grid-cols-12">
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
