import Image from 'next/image';
import { lusitana } from '@/app/components/fonts';

export default function AcmeLogo() {
  return (
    <>
    <div className="flex flex-row items-center leading-none justify-center">
      <Image
        src="/identity-B.png"
        width={500}
        height={500}
        alt="Picture of the author"
        className="w-full"
      />
    </div>
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none justify-center`}
    >
      <p className="text-xl">ระบบระเบียนกิจกรรมนักศึกษา</p>
    </div>
    </>
  );
}
