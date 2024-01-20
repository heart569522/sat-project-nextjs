import SideNav from '@/app/components/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none print:hidden md:w-80">
        <SideNav />
      </div>
      <div className="grow p-6 print:pt-0 md:overflow-y-auto md:px-12">
        {children}
      </div>
    </div>
  );
}
