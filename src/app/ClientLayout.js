"use client";

import { useState } from "react";
import Navbar from "./components/Navbar/page";
import Footer from "./components/footer/page";
import Sidebar from "./components/sidebar/page";

export default function ClientLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Sidebar receives collapse state as props */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/*
        Main content margin synced with sidebar width:
        - Mobile:           ml-0   (sidebar is overlay, no margin needed)
        - Desktop expanded: ml-64  (256px)
        - Desktop collapsed: ml-16 (64px icon-only)
      */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ml-0 ${
          isCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        <Navbar />
        <main className="flex-grow p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}