import React from "react";
import Image from "next/image";
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

interface SidebarNavProps {
  isCollapsed?: boolean;
  activePath?: string;
}

export default function SidebarNav({ isCollapsed = false, activePath = "" }: SidebarNavProps) {
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        {navItems.map((item) => {
          const isActive = activePath.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={
                "block p-2 rounded-lg " +
                (isActive ? "text-blue-500" : "hover:bg-gray-800 text-gray-300")
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
    );
  }

  return (
    <nav className="flex-1 border-r-1 border-gray-800">
      <ul className="mt-3">
        {navItems.map((item) => {
          const isActive = activePath.startsWith(item.href);
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={
                  "flex items-center px-4 py-[10px] font-medium text-sm " +
                  (isActive
                    ? "text-blue-500 border-r-4 border-blue-500"
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 