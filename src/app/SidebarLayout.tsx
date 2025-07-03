"use client";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { name: "Proposals", href: "/proposals" },
  { name: "Services", href: "/services" },
  { name: "Vehicle Rules", href: "/vehicle-rules" },
  { name: "Appointments", href: "/appointment/step-1" },
  { name: "Inventory", href: "/inventory" },
  { name: "Contacts", href: "/contacts" },
  { name: "Transactions", href: "/transactions" },
  { name: "Invoices", href: "/invoices" },
];

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="flex flex-col justify-between h-full w-56 bg-gray-900 p-4 fixed left-0 top-0 bottom-0 z-20">
      <nav className="flex-1">
        <ul className="space-y-2 mt-8">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                    active
                      ? "bg-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center gap-3 p-3 mt-8 border-t border-gray-800">
        {/* Placeholder avatar SVG */}
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" fill="#3B82F6" />
            <rect x="6" y="14" width="12" height="6" rx="3" fill="#3B82F6" />
          </svg>
        </div>
        <span className="text-white font-semibold">Micheal A.</span>
      </div>
    </aside>
  );
}

function Topbar() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 bg-gray-950 border-b border-gray-800 px-8 py-4 w-full" style={{ maxWidth: 'calc(100vw - 14rem)' }}>
      <button
        onClick={() => router.back()}
        className="p-2 rounded hover:bg-gray-800 transition-colors"
        aria-label="Back"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
          <path d="M12 15l-5-5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h1 className="text-lg font-bold">Create Appointment</h1>
    </header>
  );
}

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex">
      <Sidebar pathname={pathname} />
      <main className="flex-1 ml-56 min-h-screen flex flex-col">
        <Topbar />
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
} 