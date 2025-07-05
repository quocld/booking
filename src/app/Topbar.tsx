'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Topbar() {
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
      <h1 className="text-lg font-bold size-4 w-full h-full">Create Appointment</h1>
    </header>
  );
}
