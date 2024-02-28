
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
            label: 'โครงการ/กิจกรรม',
            href: '/project-proposal',
            active: false,
          },
          {
            label: 'แก้ไขโครงการ/กิจกรรม (พน.01)',
            href: '',
            active: true,
          },
        ]}
      />
      <div className="flex text-xl md:text-2xl">
        แก้ไขการเสนอโครงการ/กิจกรรม (พน.01)
      </div>
    </div>
    <ProfileEditForm editData={data} isEditing={true} />
    </>
  );
}
