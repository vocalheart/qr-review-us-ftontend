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
        withCredentials: true,
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

  // Run once on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ================= SMART AUTO REDIRECT SYSTEM =================
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/register"];

    const isPublicRoute = publicRoutes.includes(pathname);
    const isDashboardRoute = pathname.startsWith("/dashboard");

    if (user && isPublicRoute) {
      router.replace("/dashboard");
      return;
    }

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

      setUser(res.data.user);

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

      setUser(null);

      router.replace("/login");
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  };

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
      {!loading ? (
        children
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2 text-indigo-600 text-lg font-semibold">
      
            <span className="flex space-x-1">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
               <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);