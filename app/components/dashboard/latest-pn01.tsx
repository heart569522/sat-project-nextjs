import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { notoThai } from '@/app/components/fonts';
import { getLastRequestData } from '@/app/lib/api-service';
import { convertISOStringToDateTimeText } from '@/app/lib/services';
import Link from 'next/link';

export default async function LatestPN01() {
  const latestPN01 = await getLastRequestData('project-proposal/get-latest');

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${notoThai.className} mb-4 text-lg lg:text-xl xl:text-2xl font-semibold`}>
        คำร้องเสนอโครงการ/กิจกรรมล่าสุด
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-blue-50 p-4">
        <div className="">
          {latestPN01.map((row: any, i: any) => (
            <Link
              key={row.id}
              className={clsx(
                'flex cursor-pointer flex-row items-center justify-between rounded-sm bg-white px-6 py-4 transition hover:bg-gray-50',
                {
                  'border-t': i !== 0,
                },
              )}
              href={`/management/pn01/document/${row.id}`}
            >
              <div className="flex items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {row.project_name}
                  </p>
                  <p className="hidden text-gray-500 sm:block md:text-base">
                    {row.project_code}
                  </p>
                </div>
              </div>
              <p
                className={`${notoThai.className} truncate text-sm font-medium`}
              >
                {/* {`${row.date} ${row.time}`} */}
                {convertISOStringToDateTimeText(row.created_at)}
              </p>
            </Link>
          ))}
        </div>
        {/* <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div> */}
      </div>
    </div>
  );
}
