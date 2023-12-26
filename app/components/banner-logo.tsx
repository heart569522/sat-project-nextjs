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
      <div className={`flex flex-row items-center justify-center leading-none`}>
        <p className="pb-2 text-2xl md:pb-0 md:text-xl">
          ระบบระเบียนกิจกรรมนักศึกษา
        </p>
      </div>
    </>
  );
}
