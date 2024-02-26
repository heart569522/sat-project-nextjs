import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { deleteData } from '@/app/lib/api-service';

export function CreateRequestProjectProposal() {
  return (
    <Link
      href="/project-proposal/request"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-base font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">เสนอโครงการ/กิจกรรม</span>{' '}
      <DescriptionOutlinedIcon className="h-6 md:ml-2" />
    </Link>
  );
}

export function CreateRequestTranscript() {
  return (
    <Link
      href="/activity-history/transcript"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-base font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="block">ร้องขอระเบียนกิจกรรม</span>{' '}
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
    <Link
      href={`/${path}/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
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
  );
}

export function DeleteButton({
  id,
  apiPath,
}: {
  id: string;
  apiPath: string;
}) {
  const handleDelete = async () => {
    await deleteData(apiPath, id);
  };

  return (
    <button onClick={handleDelete} className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}


export function EditProfile() {
  return (
    <Link
      href="/profile/edit/"
    >
      <button className="ms-3 w-full h-10 items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-md text-base font-medium px-4 dark:focus:ring-yellow-900">
        แก้ไขข้อมูลโปรไฟล์
      </button>
    </Link>
  );
}
