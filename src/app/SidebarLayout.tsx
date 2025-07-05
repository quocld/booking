import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[200px] min-h-screen flex flex-col">
        <Topbar />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
