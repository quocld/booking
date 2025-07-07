'use client';
import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  return (
    <div className="flex">
      {/* Sidebar cho desktop, ẩn trên mobile */}
      <div className="hidden md:block">
        <Sidebar
          hidden={sidebarHidden}
          isMobile={false}
          onHiddenChange={setSidebarHidden}
        />
      </div>
      {/* Sidebar overlay cho mobile */}
      <div className={sidebarOpen ? 'fixed inset-0 z-40 flex md:hidden' : 'hidden'}>
        <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setSidebarOpen(false)} />
        <div className="relative w-[200px] bg-[#18181B] h-full shadow-xl z-50">
          <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      {/* Main content */}
      <main className={`flex-1 min-h-screen flex flex-col transition-all duration-200 ${sidebarHidden ? 'md:ml-16' : 'md:ml-[200px]'}`}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
};
