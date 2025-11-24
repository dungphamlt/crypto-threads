'use client';

import Link from "next/link";
import { AuthToggle, LoginForm, RegisterForm } from "@/components/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthType = "login" | "register";

interface AuthPageProps {
  searchParams: { type?: string };
}

export default function AuthPage({ searchParams }: AuthPageProps) {
  const typeParam = searchParams?.type === "register" ? "register" : "login";

  const router = useRouter();
  const [authType, setAuthType] = useState<AuthType>(typeParam);

  const handleTabChange = (tab: AuthType) => {
    setAuthType(tab);
    const url = tab === "register" ? "/auth?type=register" : "/auth";
    router.replace(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 relative">
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label="Back to home"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </span>
        <span className="hidden md:inline">Back to home</span>
      </Link>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {authType === "login" ? "Hi, Welcome" : "Create Account"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {authType === "login" ? "Please login to entry cryptomind" : "Please input to your account"}
              </p>
            </div>

            <AuthToggle activeTab={authType === "login" ? "login" : "signup"} onTabChange={(tab) => handleTabChange(tab === "signup" ? "register" : "login")} />

            <div className="mt-6 max-h-[70vh] overflow-visible">
              {authType === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

