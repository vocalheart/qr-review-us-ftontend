"use client";

import { useState } from "react";
import Navbar from "./components/Navbar/page";
import Footer from "./components/footer/page";
import Sidebar from "./components/sidebar/page";
import { useAuth } from "./context/AuthContext"; // 🔥 import auth

export default function ClientLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, loading } = useAuth(); // 🔥 get user state

  // Jab auth loading ho tab kuch render na kare (avoid flicker)
  if (loading) return null;

  return (
    <>
      {/* 🔐 Show Sidebar only when user is logged in */}
      {user && (
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}

      {/* Dynamic margin only when sidebar exists */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ml-0 ${
          user ? (isCollapsed ? "md:ml-16" : "md:ml-64") : "ml-0"
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