import SettingTab from '@/app/components/tabs/setting-tab';
import IsAdminAuthen from '@/app/lib/isAuthen';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'ตั้งค่า',
};

export default async function Page() {
  const isAdmin = await IsAdminAuthen();
  if (!isAdmin) {
    notFound();
  }
  
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>ตั้งค่า</h1>
      <div className="mt-4">
        <SettingTab />
      </div>
    </main>
  );
}
