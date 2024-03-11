import { getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';

export default async function Welcome() {
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id);
  console.log('🚀 ~ Welcome ~ userData:', userData);

  return (
    <div className="flex h-modal w-full items-center justify-center">
      <div className="rounded-md border border-gray-400 p-10 shadow-md">
        <div className="text-center">
          <div className="mb-2 flex flex-col items-center justify-center gap-3">
            <WavingHandOutlinedIcon className="h-16 w-16 text-gray-700" />
            <p className="text-2xl font-semibold">ยินดีต้อนรับ</p>
          </div>
          <p className="text-xl">
            คุณ{`${userData.firstname} ${userData.lastname}`}
          </p>
          <div className="mt-2 mb-1 flex items-center justify-center gap-2">
            <p className="text-lg">สถานะบัญชี : </p>
            {userData.is_verify ? (
              <div className="rounded-md bg-green-500 px-3 py-2 font-semibold text-white">
                ยืนยันแล้ว
              </div>
            ) : (
              <div className="rounded-md bg-gray-300 px-3 py-2 font-semibold text-gray-800">
                ไม่ยืนยัน
              </div>
            )}
          </div>
          {!userData.is_verify && (
            <p className="text-base text-red-500">**รอการยืนยันจากเจ้าหน้าที่</p>
          )}
        </div>
      </div>
    </div>
  );
}
