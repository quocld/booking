import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-56 min-h-screen flex flex-col">
        <Topbar />
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
} 