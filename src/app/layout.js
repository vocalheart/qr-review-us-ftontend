// No "use client" here — this stays a Server Component
import { AuthProvider } from "./context/AuthContext";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Smart Google Review QR System | Review Funnel & Reputation Management",
  description:
    "Smart Google Review QR Code System that boosts 5-star reviews using rating-based redirection, private feedback funnel, and admin dashboard for reputation management.",
  keywords:
    "Smart Google Review QR, Review Funnel System, Google Review Booster, QR Code Review System, Reputation Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Smart Google Review QR Funnel System" />
        <meta
          property="og:description"
          content="Scan QR → Give Rating → Smart Redirect to Google Review."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          {/* ClientLayout handles all client-side state (sidebar collapse etc.) */}
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}