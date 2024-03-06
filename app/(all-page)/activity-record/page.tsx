import PN10Form from '@/app/components/form/pn10-form';
import { getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บันทึกการเข้าร่วมโครงการ/กิจกรรม',
};

export default async function Page() {
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id)
  
  return (
    <>
      <div className='flex text-xl md:text-2xl'>บันทึกการเข้าร่วมโครงการ/กิจกรรม</div>
      <div className="my-6 rounded-md border-2 border-gray-100 p-4 md:p-6">
        <PN10Form userID={userData.id} userRole={userData.role}/>
      </div>
    </>
  );
}
