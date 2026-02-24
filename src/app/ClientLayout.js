"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/page";
import Footer from "./components/footer/page";
import Sidebar from "./components/sidebar/page";
import { useAuth } from "./context/AuthContext";

export default function ClientLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  //  Auth pages jahan Navbar & Footer nahi dikhana
  const authRoutes = ["/login", "/signup", "/register"];
  const isAuthPage = authRoutes.includes(pathname);

  // Jab auth loading ho tab flicker avoid kare
  if (loading) return null;

  return (
    <>
      {/* Sidebar only when user is logged in AND not on auth pages */}
      {user && !isAuthPage && (
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}

      {/* Layout wrapper */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          user && !isAuthPage
            ? isCollapsed
              ? "md:ml-16"
              : "md:ml-64"
            : "ml-0"
        }`}
      >
        {/* Hide Navbar on Login / Signup pages */}
        {!isAuthPage && <Navbar />}

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>

        {/*  Hide Footer on Login / Signup pages */}
        {!isAuthPage && <Footer />}
      </div>
    </>
  );
}