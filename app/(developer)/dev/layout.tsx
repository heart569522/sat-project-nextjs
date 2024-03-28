import { SparklesCore } from '@/app/components/dev/sparkles';
import { inter, lusitana, notoThai, rajdhani } from '@/app/components/fonts';
import { DevBackButton } from '@/app/components/navigation/nav-links';
import { Suspense } from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoThai.className} antialiased`}>
        <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
          <Suspense>
            <div className="grow print:mt-0 print:pt-0 md:mt-0 md:overflow-y-auto">
              {children}
            </div>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
