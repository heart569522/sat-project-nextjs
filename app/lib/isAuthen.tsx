import { auth } from '@/auth';
import { getUserLoginData } from './api-service';

export default async function IsAdminAuthen() {
  const authResult = (await auth()) as any;
  const { id } = authResult?.user || null;
  const userData = await getUserLoginData(id);

  if (userData.role === 'admin' && userData.is_verify) {
    return true;
  } else {
    return false;
  }
}
