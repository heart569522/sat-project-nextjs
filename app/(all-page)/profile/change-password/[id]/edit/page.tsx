import Breadcrumbs from '@/app/components/breadcrumbs';
import ChangePasswordForm from '@/app/components/form/change-password-form';

export default async function ChangePassword({
  params,
}: {
  params: { id: string };
}) {
  const userId = params.id;

  return (
    <>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'ข้อมูลโปรไฟล์',
              href: '/profile',
              active: false,
            },
            {
              label: 'เปลี่ยนรหัสผ่าน',
              href: '',
              active: true,
            },
          ]}
        />
      </div>
      <div className="flex text-xl md:text-2xl">เปลี่ยนรหัสผ่าน</div>
      <div className="mt-4">
        <ChangePasswordForm userId={userId}/>
      </div>
    </>
  );
}
