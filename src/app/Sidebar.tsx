"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  if (hidden) {
    return (
      <aside className="flex flex-col items-center h-full w-16 p-4 fixed left-0 top-0 bottom-0 z-20 transition-all">
        <button
          onClick={() => setHidden(false)}
          className="mb-6 mt-2 bg-gray-800 border border-gray-700 rounded-full p-1 shadow hover:bg-gray-700 transition-colors"
          aria-label="Show sidebar"
        >
          <Image
            src="/ArrowLeft.png"
            alt="Show sidebar"
            width={20}
            height={20}
            style={{ transform: "rotate(180deg)" }}
          />
        </button>
        <div className="flex flex-col items-center gap-4 mt-8">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={
                  "block p-2 rounded-lg " +
                  (isActive ? "text-blue-600" : "hover:bg-gray-800 text-gray-300")
                }
              >
                <Image
                  src={item.icon}
                  alt={item.name + " icon"}
                  width={24}
                  height={24}
                  className={isActive ? "filter-blue" : ""}
                />
              </Link>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col justify-between h-full w-[200px] fixed left-0 top-0 bottom-0 z-20 transition-all">
      {/* Logo at the top */}
      <div className="flex items-center min-h-[60px] px-4 border-1">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={158}
          height={40}
        />
      </div>
      <nav className="flex-1 border-r-1">
        <ul className="mt-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={
                    "flex items-center px-4 py-[10px] font-medium text-sm " +
                    (isActive
                      ? "text-blue-600"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white")
                  }
                >
                  <Image
                    src={item.icon}
                    alt={item.name + " icon"}
                    width={20}
                    height={20}
                    className={
                      "w-5 h-5 mr-2 flex-shrink-0 " +
                      (isActive ? "filter-blue" : "")
                    }
                  />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Hide Sidebar Button */}
      <div className="relative border-r-1">
        <button
          onClick={() => setHidden(true)}
          className="absolute right-[10%] bg-gray-800 border border-gray-700 rounded-full p-1 shadow hover:bg-gray-700 transition-colors z-30"
          style={{ top: "unset", bottom: "50px" }}
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
          <Image
            src="/Avatar.png"
            alt="User avatar"
            width={28}
            height={28}
            className="w-10 h-10 rounded-full object-cover bg-gray-700"
          />
          <span className="text-white font-semibold">Micheal A.</span>
        </div>
      </div>
    </aside>
  );
}
