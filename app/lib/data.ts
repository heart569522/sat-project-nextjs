import { unstable_noStore as noStore } from 'next/cache';
import { getCountData } from '@/app/lib/api-service';

export async function fetchCardData() {
  noStore();

  const [totalCountUsers, totalCountPN01, totalCountPN10, totalCountPN11] =
    await Promise.all([
      getCountData('users/get-count/all'),
      getCountData('project-proposal/get-count/all'),
      getCountData('attendance/get-count/all'),
      getCountData('activity-transcript/get-count/all'),
    ]);

  return {
    totalCountUsers,
    totalCountPN10,
    totalCountPN01,
    totalCountPN11,
  };
}
