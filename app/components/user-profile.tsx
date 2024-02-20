import React from 'react';
import { Users } from '@/app/model/user';

export default function UserProfile({ data }: { data: Users }) {
  return (
    <main>
      <div className="w-full">
        <p>{data.firstname}</p>
      </div>
    </main>
  );
}
