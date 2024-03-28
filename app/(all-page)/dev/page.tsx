import { LampPage } from '@/app/components/dev/lamp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developers',
};

export default async function Dev() {
  return (
    <>
      <LampPage />
    </>
  );
}
