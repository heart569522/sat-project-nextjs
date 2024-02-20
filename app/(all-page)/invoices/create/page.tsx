import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/components/invoices/create-form';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/invoices' },
          {
            label: 'Create Invoice',
            href: '/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
