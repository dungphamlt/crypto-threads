"use client";

import { useState, useEffect, useCallback } from "react";
import type { AuthUser } from "@/services/auth-service";

interface UseIsLoginReturn {
  isLoggedIn: boolean;
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  refresh: () => void;
}

/**
 * Helper function to trigger auth state refresh across all components
 * Call this after login/logout to update all components using useIsLogin
 */
export function triggerAuthRefresh(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-storage-change"));
  }
}

/**
 * Hook to check if user is logged in
 * Checks localStorage for token and user info
 * Listens to storage changes to update when login/logout happens
 *
 * @returns {UseIsLoginReturn} Object containing:
 * - isLoggedIn: boolean indicating if user is logged in
 * - user: AuthUser object or null
 * - token: string token or null
 * - isLoading: boolean indicating if initial check is in progress
 * - refresh: function to manually trigger auth check
 *
 * @example
 * ```tsx
 * const { isLoggedIn, user, isLoading } = useIsLogin();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (isLoggedIn) return <div>Welcome, {user?.username}!</div>;
 * return <LoginButton />;
 * ```
 */
export function useIsLogin(): UseIsLoginReturn {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser) as AuthUser;
            setUser(parsedUser);
          } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } else {
        setToken(null);
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setToken(null);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkAuth();

    // Listen to storage changes (for cross-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        checkAuth();
      }
    };

    // Listen to custom storage event (for same-tab updates)
    const handleCustomStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-storage-change", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "auth-storage-change",
        handleCustomStorageChange
      );
    };
  }, [checkAuth]);

  return {
    isLoggedIn,
    user,
    token,
    isLoading,
    refresh: checkAuth,
  };
}
