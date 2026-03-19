"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import logo from "../../../../public/ReviewBadhaoLogo.png";
import { ChevronDown, LogOut, User, History, CheckCircle, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          
          {/* LOGO — Responsive sizing */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 flex-shrink-0"
          >
            <Image
              src={logo}
              alt="ReviewBadhao Logo"
              width={120}
              height={120}
              className="object-contain w-20 sm:w-24 lg:w-28 h-auto"
              priority
            />
          </Link>

          {/* DESKTOP NAVIGATION — Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-8">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md group-hover:shadow-lg transition-shadow duration-200">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {user.email?.split("@")[0]}
                  </span>

                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DESKTOP DROPDOWN */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* User Info Section */}
                    <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                      <p className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                        {user.email}
                      </p>
                      <p className="text-indigo-600 mt-2 flex items-center gap-2 text-xs sm:text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Signed in
                      </p>
                    </div>

                    {/* Navigation Links */}
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
                    >
                      <User className="w-5 h-5 text-indigo-500" />
                      My Profile
                    </Link>

                    <Link
                      href="/subscription-history"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
                    >
                      <History className="w-5 h-5 text-indigo-500" />
                      Subscription History
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 text-sm font-medium w-full text-left transition-colors duration-150 border-l-2 border-transparent hover:border-red-500"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium text-sm px-5 py-2.5 rounded-xl transition-colors duration-200"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON — Visible only on mobile */}
          <div className="lg:hidden flex items-center gap-2">
            {user && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            )}
            
            {!user && (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium text-xs sm:text-sm px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isMobileMenuOpen && user && (
          <div
            ref={menuRef}
            className="lg:hidden border-t border-gray-200 bg-white pb-4 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* User Info */}
            <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {user.email}
              </p>
              <p className="text-indigo-600 mt-2 flex items-center gap-2 text-xs font-medium">
                <CheckCircle className="w-4 h-4" />
                Signed in
              </p>
            </div>

            {/* Mobile Navigation Links */}
             <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
            >
             Dashboard
            </Link>
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
            >
              <User className="w-5 h-5 text-indigo-500" />
              My Profile
            </Link>

            <Link
              href="/subscription-history"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
            >
              <History className="w-5 h-5 text-indigo-500" />
              Subscription History
            </Link>
            <Link
              href="/submissions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
            >
              <History className="w-5 h-5 text-indigo-500" />
              Reviews
            </Link>

             <Link
              href="/subscribe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
            >
              <History className="w-5 h-5 text-indigo-500" />
              subscribe
            </Link>
            <Link
              href="/generate-qr"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-gray-700 text-sm font-medium transition-colors duration-150 border-l-2 border-transparent hover:border-indigo-500"
            >
              <History className="w-5 h-5 text-indigo-500" />
              generate-qr
            </Link>

            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-sm font-medium w-full text-left transition-colors duration-150 border-l-2 border-transparent hover:border-red-500"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}