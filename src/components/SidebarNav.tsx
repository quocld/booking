import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { name: 'Proposals', href: '/proposals', icon: '/AlignTop.svg' },
  { name: 'Services', href: '/services', icon: '/Car.svg' },
  {
    name: 'Vehicle Rules',
    href: '/vehicle-rules',
    icon: '/currency-circle-dollar.svg',
  },
  {
    name: 'Appointments',
    href: '/appointment/step-1',
    icon: '/CalendarBlank.svg',
  },
  { name: 'Inventory', href: '/inventory', icon: '/package.svg' },
  { name: 'Contacts', href: '/contacts', icon: '/User.svg' },
  { name: 'Transactions', href: '/transactions', icon: '/Money.svg' },
  { name: 'Invoices', href: '/invoices', icon: '/Newspaper.svg' },
];

interface SidebarNavProps {
  isCollapsed?: boolean;
  activePath?: string;
}

export default function SidebarNav({ isCollapsed = false, activePath = '' }: SidebarNavProps) {
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        {navItems.map((item) => {
          const isActive = activePath.startsWith(item.href);
          return (
            <Link
              key={item.name}
              className={
                'block p-2 rounded-lg ' +
                (isActive ? 'text-blue-500' : 'hover:bg-gray-800 text-gray-300')
              }
              href={item.href}
            >
              <Image
                alt={item.name + ' icon'}
                className={isActive ? 'filter-blue' : ''}
                height={24}
                src={item.icon}
                width={24}
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
                className={
                  'flex items-center px-4 py-[10px] font-medium text-sm ' +
                  (isActive
                    ? 'text-blue-500 border-r-4 border-blue-500'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white')
                }
                href={item.href}
              >
                <Image
                  alt={item.name + ' icon'}
                  className={
                    'w-5 h-5 mr-2 flex-shrink-0 ' +
                    (isActive ? 'filter-blue' : '')
                  }
                  height={20}
                  src={item.icon}
                  width={20}
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
