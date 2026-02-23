"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  QrCode,
  Star,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "QR Codes",
      path: "/generate-qr",
      icon: QrCode,
    },
    {
      name: "Reviews",
      path: "/submissions",
      icon: Star,
    },
    {
      name: "Feedback",
      path: "/submissions",
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm z-40 hidden md:flex flex-col">
      {/* Logo / Title */}
      <div className="h-16 flex items-center justify-center border-b">
        <h2 className="text-xl font-bold text-gray-900">
          Review Admin
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black font-semibold shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}