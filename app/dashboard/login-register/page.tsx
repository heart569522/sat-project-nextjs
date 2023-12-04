import { lusitana } from '@/app/components/fonts';
import { Metadata } from 'next';
import Form from '@/app/components/login-register/form';

export const metadata: Metadata = {
    title: 'Test Page',
};

export default async function Page({ }: {}) {
    
    return (
        <>
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>เข้าสู่ระบบ / สมัครสมาชิก</h1>
            </div>
        </div>
        <div className="container-md bg-slate-100 rounded-md shadow-md p-0 mt-3">
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <Form/>
                </div>
            </div>
        </div>
        </>
    );
}
