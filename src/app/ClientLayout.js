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

  //  Pages jahan Navbar & Footer nahi dikhana (including nested routes)
  const hideLayoutRoutes = ["/login", "/signup", "/register", "/form"];

  // Check for nested routes like /form/123, /form/abc
  const isHiddenLayout = hideLayoutRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (loading) return null;

  return (
    <>
      {/* Sidebar only when user is logged in AND not hidden pages */}
      {user && !isHiddenLayout && (
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}

      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          user && !isHiddenLayout
            ? isCollapsed
              ? "md:ml-16"
              : "md:ml-64"
            : "ml-0"
        }`}
      >
        {/* Navbar Hide */}
        {!isHiddenLayout && <Navbar />}

        {/* Main Content */}
        <main className="flex-grow overflow-x-hidden">
          {children}
        </main>

        {/* Footer Hide */}
        {!isHiddenLayout && <Footer />}
      </div>
    </>
  );
}