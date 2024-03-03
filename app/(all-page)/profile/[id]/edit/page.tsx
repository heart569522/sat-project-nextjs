
import { getDataById } from '@/app/lib/api-service';
import ProfileEditForm from '@/app/components/form/user-edit-form';
import Breadcrumbs from '@/app/components/breadcrumbs';

export default async function EditProfile({ params }: { params: { id: string } }) {
  
  //get User data
  const id = params.id;
  const data = await getDataById('profile', id);

  return (
    <>
      <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'จัดการโปรไฟล์',
            href: '/profile',
            active: false,
          },
          {
            label: 'แก้ไขข้อมูลโปรไฟล์',
            href: '',
            active: true,
          },
        ]}
      />
    </div>
    <div className="flex text-xl md:text-2xl">แก้ไขข้อมูลโปรไฟล์</div>
    <ProfileEditForm editData={data} isEditing={true} />
    </>
  );
}
