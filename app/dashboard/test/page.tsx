import PN01Form from '@/app/components/form/pn01-form';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Test Page',
};

export default async function Page({ }: {}) {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`text-2xl`}>Test</h1>
            </div>
            <PN01Form />

        </div>
    );
}
