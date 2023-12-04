import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/components/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <p className="text-xl">ระบบระเบียนกิจกรรมนักศึกษา</p>
    </div>
  );
}
