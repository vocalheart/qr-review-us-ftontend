"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "../llb/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // ================= FETCH USER FROM COOKIE =================
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get("/auth/me", {
        withCredentials: true, // VERY IMPORTANT for cookies
      });

      if (res?.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run once on app load (refresh safe login)
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ================= SMART AUTO REDIRECT SYSTEM =================
  useEffect(() => {
    if (loading) return;

    // Public pages (no login required)
    const publicRoutes = ["/", "/login", "/register"];

    const isPublicRoute = publicRoutes.includes(pathname);
    const isDashboardRoute = pathname.startsWith("/dashboard");

    //  If user is logged in & opens login/register/home → go to dashboard
    if (user && isPublicRoute) {
      router.replace("/dashboard");
      return;
    }

    //  If user NOT logged in & tries to access dashboard → go to login
    if (!user && isDashboardRoute) {
      router.replace("/login");
      return;
    }
  }, [user, loading, pathname, router]);

  // ================= LOGIN FUNCTION =================
  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      // Set user instantly
      setUser(res.data.user);

      // Direct redirect to dashboard
      router.replace("/dashboard");

      return res.data;
    } catch (error) {
      setUser(null);
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT FUNCTION =================
  const logout = async () => {
    try {
      setLoading(true);

      await axios.post(
        "/logout",
        {},
        { withCredentials: true }
      );

      // Clear user
      setUser(null);

      // Redirect to login page
      router.replace("/login");
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Optional: Manual refresh (useful after profile update)
  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {/* Prevent UI flicker until auth check is done */}
      {!loading ? (
        children
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-semibold">Checking authentication...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);