import React from "react";
import Image from "next/image";

interface TopbarContentProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function TopbarContent({ 
  title = "Create Appointment", 
  showBackButton = true,
  onBackClick 
}: TopbarContentProps) {
  return (
    <header className="sticky h-[60px] bg-[#0F0F0F] top-0 z-10 flex items-center justify-center gap-3 border-b border-gray-800 px-5 py-4 w-full">
      {showBackButton && (
        <button
          onClick={onBackClick}
          className="p-2 rounded bg-gray-800 transition-colors"
          aria-label="Back"
        >
          <Image src="/ArrowLeft.png" alt="Back" width={20} height={20} className="w-4 h-4" />
        </button>
      )}
      <h1 className="text-lg font-bold size-4 w-full h-full">{title}</h1>
    </header>
  );
} 