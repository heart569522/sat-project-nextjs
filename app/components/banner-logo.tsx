import Image from 'next/image';

export default function BannerLogo() {
  return (
    <>
    <div className="hidden md:block">
      <Image
        src="/payap-logo.png"
        width={500}
        height={200}
        alt="payap-logo"
        className="w-full"
        priority
      />
    </div>
    <div
      className={`flex flex-row items-center leading-none justify-center`}
    >
      <p className="text-2xl pb-2 md:text-xl md:pb-0">ระบบระเบียนกิจกรรมนักศึกษา</p>
    </div>
    </>
  );
}
