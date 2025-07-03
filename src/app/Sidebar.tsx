"use client";
import React, { useState } from "react";
import Image from "next/image";

const navItems = [
  { name: "Proposals", href: "/proposals", icon: "/AlignTop.svg" },
  { name: "Services", href: "/services", icon: "/Car.svg" },
  { name: "Vehicle Rules", href: "/vehicle-rules", icon: "/currency-circle-dollar.svg" },
  { name: "Appointments", href: "/appointment/step-1", icon: "/CalendarBlank.svg" },
  { name: "Inventory", href: "/inventory", icon: "/package.svg" },
  { name: "Contacts", href: "/contacts", icon: "/User.svg" },
  { name: "Transactions", href: "/transactions", icon: "/Money.svg" },
  { name: "Invoices", href: "/invoices", icon: "/Newspaper.svg" },
];

export default function Sidebar() {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    // Mini sidebar: chỉ hiện icon và nút mở rộng
    return (
      <aside className="flex flex-col items-center h-full w-16 bg-gray-900 p-4 fixed left-0 top-0 bottom-0 z-20 transition-all">
        <button
          onClick={() => setHidden(false)}
          className="mb-6 mt-2 bg-gray-800 border border-gray-700 rounded-full p-1 shadow hover:bg-gray-700 transition-colors"
          aria-label="Show sidebar"
        >
          <Image src="/ArrowLeft.png" alt="Show sidebar" width={20} height={20} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="flex flex-col items-center gap-4 mt-8">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="block p-2 rounded-lg hover:bg-gray-800">
              <Image src={item.icon} alt={item.name + ' icon'} width={24} height={24} />
            </a>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col justify-between h-full w-56 bg-gray-900 p-4 fixed left-0 top-0 bottom-0 z-20 transition-all">
      {/* Logo at the top */}
      <div className="flex justify-center items-center mt-2 mb-6">
        <Image src="/Logo.png" alt="Logo" width={160} height={40} className="h-10 w-auto max-w-full object-contain" />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 mt-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-3 block px-4 py-2 rounded-lg transition-colors font-medium text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Image src={item.icon} alt={item.name + ' icon'} width={20} height={20} className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Hide Sidebar Button */}
      <div className="relative">
      <button
        onClick={() => setHidden(true)}
        className="absolute right-[10%] bg-gray-800 border border-gray-700 rounded-full p-1 shadow hover:bg-gray-700 transition-colors z-30"
        style={{ top: 'unset', bottom: '50px' }}
        aria-label="Hide sidebar"
      >
        <Image
          src="/ArrowLeft.png"
          alt="Hide sidebar"
          width={20}
          height={20}
        />
      </button>
        <div className="flex items-center gap-3 p-3 mt-8 border-t border-gray-800">
          <Image src="/Avatar.png" alt="User avatar" width={28} height={28} className="w-10 h-10 rounded-full object-cover bg-gray-700" />
          <span className="text-white font-semibold">Micheal A.</span>
        </div>
      </div>
    </aside>
  );
}
