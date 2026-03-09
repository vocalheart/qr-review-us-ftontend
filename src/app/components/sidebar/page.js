"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import logo from "../../../../public/ReviewBadhaoLogo.png";
import {
  LayoutDashboard,
  QrCode,
  Star,
  FileText,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileDrawerRef = useRef(null);

  // Close mobile sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileOpen &&
        mobileDrawerRef.current &&
        !mobileDrawerRef.current.contains(e.target)
      ) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  // Lock scroll when mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard",   path: "/dashboard",   icon: LayoutDashboard },
    { name: "QR Codes",    path: "/generate-qr", icon: QrCode },
    { name: "Subscription",path: "/subscribe",   icon: FileText },
    { name: "Reviews",     path: "/submissions", icon: Star },
  ];

  /* ── Shared nav links ── */
  const NavLinks = ({ mobile = false }) => (
    <nav className="flex flex-col gap-1 p-3 flex-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.path);
        const collapsed = isCollapsed && !mobile;

        return (
          <Link
            key={item.path}
            href={item.path}
            title={collapsed ? item.name : undefined}
            className={`flex items-center gap-3 py-2.5 rounded-xl transition-all duration-200 group relative
              ${collapsed ? "justify-center px-2" : "px-3"}
              ${isActive ? "bg-indigo-50 text-indigo-700 font-semibold shadow-sm": "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
            <Icon
              size={20}
              className={`shrink-0 ${isActive ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-700"}`}
            />
            {!collapsed && (
              <span className="text-sm whitespace-nowrap">{item.name}</span>
            )}
            {/* Tooltip when collapsed */}
            {collapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                {item.name}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
  return (
    <>
      {/* ════════════════════════════════════════
          MOBILE: Hamburger button (top-left)
      ════════════════════════════════════════ */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-3.5 left-3 z-50 md:hidden p-2 rounded-xl bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* MOBILE: Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* MOBILE: Slide-in Drawer */}
      <aside
        ref={mobileDrawerRef}
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 shadow-xl z-50 flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 h-14 sm:h-16 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={40} height={40} className="w-9 h-9" />
            <span className="font-bold text-gray-900 text-base">Reviwist</span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <NavLinks mobile={true} />
      </aside>

      {/* ════════════════════════════════════════
          DESKTOP: Collapsible Sidebar
      ════════════════════════════════════════ */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 shadow-sm z-40 hidden md:flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Desktop Header */}
        <div
          className={`flex items-center h-14 sm:h-16 border-b border-gray-100 transition-all duration-300 ${
            isCollapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2 overflow-hidden">
              <Image src={logo} alt="Logo" width={40} height={40} className="w-9 h-9 shrink-0" />
              <span className="font-bold text-gray-900 text-base whitespace-nowrap">Reviewbadhao</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shrink-0"
            aria-label="Toggle sidebar"
          >
            {isCollapsed
              ? <ChevronRight className="w-4 h-4" />
              : <ChevronLeft className="w-4 h-4" />
            }
          </button>
        </div>

        <NavLinks mobile={false} />
      </aside>
    </>
  );
}