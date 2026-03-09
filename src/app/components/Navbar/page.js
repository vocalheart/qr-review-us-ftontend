"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import logo from "../../../../public/ReviewBadhaoLogo.png";
import { ChevronDown, LogOut, User, History, CheckCircle } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 shadow-sm" style={{fontSize:'14px'}}>
      <div className="px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">

          {/* LOGO — hidden on mobile, visible on desktop */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            style={{fontSize:'14px'}}
          >
            <Image src={logo} alt="Logo" width={56} height={56} className="w-12 h-12 hidden" />
          </Link>

          {/* Mobile: spacer so profile stays right */}
          <div className="md:hidden flex-1" />

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            {user ? (
              /* ── PROFILE DROPDOWN ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-all"
                  aria-label="User menu"
                >
                  <div
                    className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                    style={{fontSize:'14px'}}
                  >
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                      <p className="font-semibold text-gray-900 truncate" style={{fontSize:'14px'}}>
                        {user.email}
                      </p>
                      <p className="text-indigo-600 mt-1 flex items-center gap-1" style={{fontSize:'14px'}}>
                        <CheckCircle className="w-4 h-4" />
                        Signed in
                      </p>
                    </div>
                    {/* Links */}
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                      style={{fontSize:'14px'}}
                    >
                      <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      My Profile
                    </Link>

                    <Link
                      href="/subscription-history"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors"
                      style={{fontSize:'14px'}}
                    >
                      <History className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      Subscription History
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 w-full text-left transition-colors"
                      style={{fontSize:'14px'}}
                    >
                      <LogOut className="w-4 h-4 flex-shrink-0" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── LOGIN / SIGNUP ── */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded-xl transition-colors"
                  style={{fontSize:'14px'}}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                  style={{fontSize:'14px'}}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}