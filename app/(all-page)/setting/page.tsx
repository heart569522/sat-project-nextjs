import SettingTab from '@/app/components/tabs/setting-tab';

export default async function Page() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl`}>ตั้งค่า</h1>
      <div className="mt-4">
        <SettingTab />
      </div>
    </main>
  );
}
