'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  return (
    <header className="sticky h-[60px] bg-[#0F0F0F] top-0 z-10 flex items-center justify-center gap-3 border-b border-gray-800 px-5 py-4 w-full">
      <button
        aria-label="Back"
        className="p-2 rounded bg-gray-800 transition-colors"
        onClick={() => router.back()}
      >
        <Image alt="Back" className="w-4 h-4" height={20} src="/ArrowLeft.png" width={20} />
      </button>
      <button
        aria-label="Open menu"
        className="absolute left-2 md:hidden p-2 rounded bg-gray-800 transition-colors"
        onClick={onMenuClick}
      >
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24"><path d="M4 6h16M4 12h16M4 18h16" stroke="#fff" strokeWidth="2"/></svg>
      </button>
      <h1 className="h-full size-4 text-lg font-bold w-full">Create Appointment</h1>
    </header>
  );
}
