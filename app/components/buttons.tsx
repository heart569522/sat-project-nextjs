import { PencilIcon, PlusIcon, TrashIcon ,EyeIcon  } from '@heroicons/react/24/outline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';

export function CreateRequestProjectProposal() {
  return (
    <Link
      href="/dashboard/project-proposal/request"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">เสนอโครงการ/กิจกรรม</span>{' '}
      <DescriptionOutlinedIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function CreateRequestTranscript() {
  return (
    <Link
      href="/dashboard/activity-history/transcript"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="block">ร้องขอระเบียนกิจกรรม</span>{' '}
      <DescriptionOutlinedIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
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
        <EyeIcon  className="w-5" />
      </button>
    </form>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
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

export function EditButton() {
  return (
    <Link
      href={``}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton() {

  return (
    <form>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
