"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Topbar() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 bg-gray-950 border-b border-gray-800 px-8 py-4 w-full" style={{ maxWidth: 'calc(100vw - 14rem)' }}>
      <button
        onClick={() => router.back()}
        className="p-2 rounded hover:bg-gray-800 transition-colors"
        aria-label="Back"
      >
        <Image src="/ArrowLeft.png" alt="Back" width={20} height={20} className="w-5 h-5" />
      </button>
      <h1 className="text-lg font-bold">Create Appointment</h1>
    </header>
  );
}