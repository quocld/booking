import React from "react";
import Image from "next/image";

const navItems = [
  { name: "Proposals", href: "/proposals", icon: "/AlignTop.svg" },
  { name: "Services", href: "/services", icon: "/Car.svg" },
  {
    name: "Vehicle Rules",
    href: "/vehicle-rules",
    icon: "/currency-circle-dollar.svg",
  },
  {
    name: "Appointments",
    href: "/appointment/step-1",
    icon: "/CalendarBlank.svg",
  },
  { name: "Inventory", href: "/inventory", icon: "/package.svg" },
  { name: "Contacts", href: "/contacts", icon: "/User.svg" },
  { name: "Transactions", href: "/transactions", icon: "/Money.svg" },
  { name: "Invoices", href: "/invoices", icon: "/Newspaper.svg" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-between h-full w-56 bg-gray-900 p-4 fixed left-0 top-0 bottom-0 z-20">
      {/* Logo at the top */}
      <div className="flex justify-center items-center mt-2 mb-6">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={160}
          height={40}
          className="h-10 w-auto max-w-full object-contain"
        />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 mt-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-3 block px-4 py-2 rounded-lg transition-colors font-medium text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Image
                  src={item.icon}
                  alt={item.name + " icon"}
                  width={20}
                  height={20}
                  className="w-5 h-5 flex-shrink-0"
                />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-3 p-3 mt-8 border-t border-gray-800">
        <Image
          src="/Avatar.png"
          alt="User avatar"
          width={28}
          height={28}
          className="w-10 h-10 rounded-full object-cover bg-gray-700"
        />
        <span className="text-white font-semibold">Micheal A.</span>
      </div>
    </aside>
  );
}
