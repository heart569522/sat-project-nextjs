
import { getDataById } from '@/app/lib/api-service';
import ProfileEditForm from './edit';

export default async function EditProfile({ params }: { params: { id: string } }) {
  
  //get User data
  const id = params.id;
  const data = await getDataById('profile', id);

  return (
    <ProfileEditForm editData={data} />
  );
}
