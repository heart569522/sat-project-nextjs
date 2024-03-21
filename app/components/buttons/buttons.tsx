import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { deleteData } from '@/app/lib/api-service';
import { Tooltip } from '@mui/material';

export function CreateRequestProjectProposal({
  buttonText,
}: {
  buttonText?: string;
}) {
  return (
    <Link
      href="/project-proposal/request"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-base font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700"
    >
      <span className="block">
        {buttonText || 'เสนอโครงการ/กิจกรรม'}
      </span>{' '}
      {/* <DescriptionOutlinedIcon className="h-6 md:ml-2" /> */}
    </Link>
  );
}

export function CreateRequestTranscript({
  buttonText,
}: {
  buttonText?: string;
}) {
  return (
    <Link
      href="/activity-history/transcript"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-base font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700"
    >
      <span className="block">{buttonText || 'ร้องขอระเบียนกิจกรรม'}</span>{' '}
      <DescriptionOutlinedIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function CreateInvoice() {
  return (
    <Link
      href="/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">เพิ่มผู้ใช้งานระบบ</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateFacultyMajor() {
  return (
    <Link
      href="/setting/faculty-major"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-base font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700"
    >
      <span className="block">เพิ่มคณะ/วิทยาลัย - สาขา</span>{' '}
      {/* <PersonAddAltOutlinedIcon className="h-5 md:ml-4" /> */}
    </Link>
  );
}

export function CreateUser() {
  return (
    <Link
      href="/management/users/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-base font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700"
    >
      <span className="hidden md:block">เพิ่มผู้ใช้</span>{' '}
      <PersonAddAltOutlinedIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function MoreDetialInvoice() {
  return (
    <form action="">
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">MoreDetial</span>
        <EyeIcon className="w-5" />
      </button>
    </form>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DetailButton({ id, path }: { id?: string; path?: string }) {
  return (
    <Tooltip title="ดูเอกสาร/รายละเอียด" arrow>
      <Link
        href={`/${path}/${id}`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <ArticleOutlinedIcon className="w-5" />
      </Link>
    </Tooltip>
  );
}

export function EditButton({
  id,
  path,
  disabled,
}: {
  id?: string;
  path?: string;
  disabled?: boolean;
}) {
  return (
    <Tooltip title="แก้ไข" arrow>
      <div
        className={`rounded-md border p-2 ${
          disabled
            ? 'cursor-not-allowed bg-gray-100 text-gray-500'
            : 'hover:bg-gray-100'
        }`}
      >
        {disabled ? (
          <span className="w-5">
            <PencilIcon className="w-5" />
          </span>
        ) : (
          <Link href={id ? `/${path}/${id}/edit` : '#'}>
            <PencilIcon className="w-5" />
          </Link>
        )}
      </div>
    </Tooltip>
  );
}

export function DeleteButton({ id, apiPath }: { id: string; apiPath: string }) {
  const handleDelete = async () => {
    await deleteData(apiPath, id);
  };
  return (
    <Tooltip title="ลบ" arrow>
      <button
        onClick={handleDelete}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </Tooltip>
  );
}

export function EditProfile({ id }: { id: string | undefined }) {
  return (
    // <Tooltip title="แก้ไข" arrow>
      <Link href={`/profile/${id}/edit`}>
        <button className="ms-3 h-10 w-full items-center rounded-md bg-yellow-400 px-4 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900">
          แก้ไขข้อมูลโปรไฟล์
        </button>
      </Link>
    // </Tooltip>
  );
}

export function ForgotPassword() {
  return (
    <Link
      href={`/forgot-password`}
      className="flex cursor-pointer justify-center text-lg text-gray-600 underline"
    >
      ลืมรหัสผ่าน
    </Link>
  );
}

export function EditPassword({ id }: { id: string | undefined }) {
  return (
    <Link
      href={`/profile/change-password/${id}/edit`}
      className="ms-3 items-center rounded-md bg-yellow-400 px-4 py-2 text-base font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
      type="button"
    >
      เปลี่ยนรหัสผ่าน
    </Link>
  );
}
