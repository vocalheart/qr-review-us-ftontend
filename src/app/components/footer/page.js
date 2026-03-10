"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "../../../../public/ReviewBadhaoLogo.png";

export default function Footer() {
  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features"},
    { href: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { href: "/terms-conditions", label: "Terms & Conditions" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/refund-policy", label: "Refund Policy" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook },
    { href: "https://twitter.com", icon: Twitter },
    { href: "https://instagram.com", icon: Instagram },
    { href: "https://linkedin.com", icon: Linkedin },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="Reviwist Logo" width={80} height={80} className="rounded" />
            </Link>
            <p className="text-gray-600 text-sm text-center md:text-left">
              A platform to leave reviews and generate QR codes easily.
            </p>
          </div>

          {/* Public Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-gray-800 text-sm">Navigation</h4>
            {publicLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-indigo-600 text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-gray-800 text-sm">Legal</h4>
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-indigo-600 text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social Icons & Contact */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-800 font-semibold text-sm">Contact Us</p>
              <a href="tel:9425305534" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                94253 05534
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} ReviewBadhao. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}