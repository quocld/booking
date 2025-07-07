'use client';
import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
  hidden?: boolean;
  onHiddenChange?: (hidden: boolean) => void;
}

export default function Sidebar({ onClose, isMobile, hidden = false, onHiddenChange }: SidebarProps) {
  const [localHidden, setLocalHidden] = useState(hidden);
  const pathname = usePathname();

  // Sync state with parent
  React.useEffect(() => {
    setLocalHidden(hidden);
  }, [hidden]);

  const handleHide = () => {
    setLocalHidden(true);
    if (onHiddenChange) onHiddenChange(true);
  };
  const handleShow = () => {
    setLocalHidden(false);
    if (onHiddenChange) onHiddenChange(false);
  };

  if (localHidden) {
    return (
      <aside className="flex flex-col items-center h-full w-16 p-4 fixed left-0 top-0 bottom-0 z-20 transition-all border-r-1 border-gray-800">
        <button
          aria-label="Show sidebar"
          className="mb-6 mt-2 bg-gray-800 border border-gray-700 rounded-full p-1 shadow hover:bg-gray-700 transition-colors"
          onClick={handleShow}
        >
          <Image
            alt="Show sidebar"
            height={20}
            src="/ArrowLeft.png"
            style={{ transform: 'rotate(180deg)' }}
            width={20}
          />
        </button>
        <div className="flex flex-col items-center gap-4 mt-8">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                className={
                  'block p-2 rounded-lg ' +
                  (isActive ? 'text-blue-500' : 'hover:bg-gray-800 text-gray-300')
                }
                href={item.href}
                {...(typeof onClose === 'function' ? { onClick: (_e: MouseEvent<HTMLAnchorElement>) => { onClose(); } } : {})}
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
      </aside>
    );
  }

  return (
    <aside className="flex flex-col justify-between h-full w-[200px] fixed left-0 top-0 bottom-0 z-20 transition-all">
      {/* Logo at the top */}
      <div className="flex items-center min-h-[60px] px-4 border-1 border-gray-800">
        <Image
          alt="Logo"
          height={40}
          src="/Logo.svg"
          width={158}
        />
      </div>
      <nav className="flex-1 border-r-1 border-gray-800">
        <ul className="mt-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
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
                  {...(typeof onClose === 'function' ? { onClick: (_e: MouseEvent<HTMLAnchorElement>) => { onClose(); } } : {})}
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
      {/* Hide Sidebar Button - chỉ hiện trên desktop */}
      <div className={`relative border-r-1 border-gray-800 ${isMobile ? 'hidden' : 'hidden md:block'}`}>
        <div className="relative border-b-1 border-gray-800">
          <button
            aria-label="Hide sidebar"
            className="absolute right-[16px] w-[24px] h-[24px] bg-gray-800 border-[1.5px] border-gray-700 rounded-full p-1 shadow hover:bg-gray-700 transition-colors z-30"
            style={{ top: 'unset', bottom: '-12px' }}
            onClick={handleHide}
          >
            <Image
              alt="Hide sidebar"
              height={20}
              src="/ArrowLeft.png"
              width={20}
            />
          </button>
        </div>
        <div className="flex items-center m-4 my-[18px] bg-gray-800 border-t rounded-full w-[115px] text-md border-gray-800">
          <Image
            alt="User avatar"
            className="w-7 h-7 rounded-full object-cover bg-gray-700"
            height={28}
            src="/Avatar.png"
            width={28}
          />
          <span className="text-white text-sm pl-2 font-semibold">Micheal A.</span>
        </div>
      </div>
    </aside>
  );
}
