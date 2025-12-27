"use client";

import Link from "next/link";
import { AuthToggle, LoginForm, RegisterForm } from "@/components/auth";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import bgLogin from "@/assets/images/bg-login.svg";

type AuthType = "login" | "register";

function AuthPageContent() {
  const searchParams = useSearchParams();
  const typeParam =
    searchParams.get("type") === "register" ? "register" : "login";

  const router = useRouter();
  const [authType, setAuthType] = useState<AuthType>(typeParam);

  const handleTabChange = (tab: AuthType) => {
    setAuthType(tab);
    const url = tab === "register" ? "/auth?type=register" : "/auth";
    router.replace(url);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 z-0 bg-primary"></div>
      <main className="container min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-2 w-full">
          <div className="flex justify-center ">
            <div className="w-2/3 aspect-square relative">
              <Image
                src={bgLogin}
                alt="Background Login"
                fill
                className="w-full h-full object-top"
              />
            </div>
          </div>

          <div className="flex items-center justify-center px-4">
            <div className="relative w-2/3">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {authType === "login" ? "Hi, Welcome" : "Create Account"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {authType === "login"
                    ? "Please login to entry cryptomind"
                    : "Please input to your account"}
                </p>
              </div>

              <AuthToggle
                activeTab={authType === "login" ? "login" : "signup"}
                onTabChange={(tab) =>
                  handleTabChange(tab === "signup" ? "register" : "login")
                }
              />

              <div className="mt-6 max-h-[70vh] overflow-visible">
                {authType === "login" ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-4 w-full z-50">
          <div className="container">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Back to home"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </span>
              <span className="hidden md:inline">Back to home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
