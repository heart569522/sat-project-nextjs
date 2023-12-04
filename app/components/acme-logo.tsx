import Image from 'next/image';
import { lusitana } from '@/app/components/fonts';

export default function AcmeLogo() {
  return (
    <>
    <div className="hidden md:block">
      <Image
        src="/payap-logo.png"
        width={500}
        height={200}
        alt="payap-logo"
        className="w-full"
      />
    </div>
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none justify-center`}
    >
      <p className="text-2xl pb-2 md:text-xl md:pb-0">ระบบระเบียนกิจกรรมนักศึกษา</p>
    </div>
    </>
  );
}
