import { Metadata } from 'next';
import Link from 'next/link';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export const metadata: Metadata = {
  title: 'ประวัติการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page({}: {}) {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>ประวัติการเข้าร่วมโครงการ/กิจกรรม</h1>
      </div>
      <div className="mt-4">
        <div className="mt-6 flex justify-start gap-4">
          <Link
            href="/dashboard/activity-history/pn11"
            className="flex h-12 md:h-20 items-center rounded-lg bg-blue-600 px-4 text-lg font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">ร้องขอระเบียนกิจกรรม <br />Activity Transcript</span>{' '}
            <DescriptionOutlinedIcon className="h-8 w-8 md:ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
