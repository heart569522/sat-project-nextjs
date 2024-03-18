import DashboardSkeleton from '@/app/components/skeletons';
import IsAdminAuthen from '@/app/lib/isAuthen';
import { notFound } from 'next/navigation';

export default async function Loading() {
  const isAdmin = await IsAdminAuthen();
  if (!isAdmin) {
    notFound();
  }

  return <DashboardSkeleton />;
}
