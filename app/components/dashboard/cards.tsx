import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana, notoThai } from '@/app/components/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  pn01: BanknotesIcon,
  users: UserGroupIcon,
  pn11: ClockIcon,
  pn10: InboxIcon,
};

export default async function CardWrapper() {
  const { totalCountPN10, totalCountUsers, totalCountPN01, totalCountPN11 } =
    await fetchCardData();

  return (
    <>
      <Card
        title="โครงการ/กิจกรรมทั้งหมด (พน.01)"
        value={totalCountPN01}
        type="pn01"
      />
      <Card
        title="บันทึกการเข้าร่วมกิจกรรมทั้งหมด (พน.10)"
        value={totalCountPN10}
        type="pn10"
      />
      <Card
        title="คำร้องขอระเบียนกิจกรรมทั้งหมด (พน.11)"
        value={totalCountPN11}
        type="pn11"
      />
      <Card title="บัญชีสมาชิกทั้งหมด" value={totalCountUsers} type="users" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'pn10' | 'users' | 'pn11' | 'pn01';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-blue-50 border border-blue-300 p-2 shadow-sm">
      <div className="flex  items-center p-4">
        {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
        <h3 className="text-md font-semibold">{title}</h3>
      </div>
      <p
        className={`${notoThai.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl font-semibold`}
      >
        {value}
      </p>
    </div>
  );
}
