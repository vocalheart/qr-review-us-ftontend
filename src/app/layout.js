"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/page";
import Footer from "./components/footer/page";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where Navbar should hide (Auth + Review Funnel Pages)
  const hideNavbarPaths = ["/login", "/signup"];

  // Hide navbar on dynamic review funnel pages like /form/:id (QR System)
  const hideNavbar =
    hideNavbarPaths.includes(pathname) ||
    pathname.startsWith("/form/");

  return (
    <html lang="en">
      <head>
        {/* Primary SEO Meta Tags */}
        <title>Smart Google Review QR System | Review Funnel & Reputation Management</title>
        <meta
          name="description"
          content="Smart Google Review QR Code System that boosts 5-star reviews using rating-based redirection, private feedback funnel, and admin dashboard for reputation management."
        />
        <meta
          name="keywords"
          content="Smart Google Review QR, Review Funnel System, Google Review Booster, QR Code Review System, Reputation Management, Customer Feedback Funnel, Local Business SEO Tool"
        />

        {/* Open Graph (Social SEO) */}
        <meta property="og:title" content="Smart Google Review QR Funnel System" />
        <meta
          property="og:description"
          content="Scan QR → Give Rating → Smart Redirect to Google Review. Increase 5-star ratings and protect business reputation."
        />
        <meta property="og:type" content="website" />

        {/* Mobile & Performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </head>

      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <AuthProvider>
          {/* Navbar hidden on login, signup and QR feedback form pages */}
          {!hideNavbar && <Navbar />}

          {/* Main Content (Review Funnel / Dashboard / Pages) */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer always visible for SEO + UX */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
