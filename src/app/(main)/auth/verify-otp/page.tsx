"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import Header from "@/components/header";
// import { Footer } from "@/components/footer";
import { OTPInput } from "@/components/auth";
import authService from "@/services/auth-service";
import Link from "next/link";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // phân biệt success do verify vs do resend
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // nếu không có email trong query, redirect về trang register/login
  useEffect(() => {
    if (!email) {
      router.replace("/auth?type=register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // redirect sau khi verify thành công
  useEffect(() => {
    if (verifiedSuccess) {
      const t = setTimeout(() => {
        router.push("/auth?type=login");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [verifiedSuccess, router]);

  const handleOTPComplete = async (completeOtp: string) => {
    // không gọi nếu ko có email
    if (!email) {
      setError("Missing email. Please register first.");
      return;
    }

    setOtp(completeOtp);
    setError(null);
    setIsLoading(true);
    setVerifiedSuccess(false);

    try {
      const response = await authService.verifyOTP(email, completeOtp);
      if (response.success) {
        setVerifiedSuccess(true);
      } else {
        setError(response.message ?? "OTP verification failed");
        setOtp("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      const response = await authService.resendOTP(email);
      if (response.success) {
        setResendSuccess(true);
        // Ẩn message resend sau vài giây
        setTimeout(() => setResendSuccess(false), 3000);
      } else {
        setError(response.message ?? "Failed to resend OTP");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please input the OTP sent to your email
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-left">
                  Enter your OTP
                </label>
                <OTPInput
                  length={6}
                  onComplete={(value) => {
                    // nếu component OTPInput gọi onComplete khi đầy
                    handleOTPComplete(value);
                  }}
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                  {error}
                </div>
              )}

              {verifiedSuccess && (
                <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                  Account created successfully! Redirecting...
                </div>
              )}

              {resendSuccess && !verifiedSuccess && (
                <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                  OTP sent successfully!
                </div>
              )}

              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Didn&apos;t receive the email?{" "}
                  <button
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-gray-900 dark:text-gray-200 font-medium hover:underline disabled:opacity-50"
                  >
                    {isResending ? "Sending..." : "Click to resend code"}
                  </button>
                </p>
              </div>

              <button
                onClick={() => handleOTPComplete(otp)}
                disabled={otp.length !== 6 || isLoading}
                className="w-full py-3 px-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Verifying..." : "Create Account"}
              </button>

              <div className="text-center">
                <Link
                  href="/auth?type=register"
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
}
