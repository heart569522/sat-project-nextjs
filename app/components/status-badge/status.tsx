import { PN01Status } from '@/app/model/pn01-status';
import { PN11Status } from '@/app/model/pn11-status';
import React from 'react';

interface Props {
  statusId: number;
  statusName: string;
  docType?: any;
}

export default function StatusBadge(props: Props) {
  const { statusId, docType, statusName } = props;

  const badgeColor = () => {
    let color;

    switch (statusId) {
      case 0:
        color = 'text-purple-800 border-purple-500 bg-purple-100';
        break;
      case 1:
        color = 'text-red-800 border-red-500 bg-red-100';
        break;
      case 2:
        color = 'text-orange-800 border-orange-500 bg-orange-100';
        break;
      case 3:
        color = 'text-yellow-800 border-yellow-500 bg-yellow-100';
        break;
      case 4:
        color = 'text-green-800 border-green-500 bg-green-100';
        break;
      case 5:
        color = 'text-sky-800 border-sky-500 bg-sky-100';
        break;
      default:
        color = 'text-gray-800 border-gray-500 bg-gray-100';
        break;
    }

    return color;
  };

  return (
    <div>
      <span
        className={`${badgeColor()} whitespace-nowrap rounded border px-2 py-1 text-sm font-medium`}
      >
        {docType === 'pn01' || docType === 'pn11' ? statusName : '-'}
      </span>
    </div>
  );
}
