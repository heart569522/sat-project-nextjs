import CheckUserVerifyCard from '@/app/components/cards/check-user-verify';
import { getUserLoginData } from '@/app/lib/api-service';
import { auth } from '@/auth';

export default async function Welcome() {
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id);

  return (
    <div className="flex h-modal w-full items-center justify-center">
      <CheckUserVerifyCard userData={userData}/>
    </div>
  );
}
