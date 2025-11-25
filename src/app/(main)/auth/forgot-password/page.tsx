"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthInput } from "@/components/auth";
import authService from "@/services/auth-service";

export default function ForgotPasswordPage() {
    const route = useRouter();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState<"request" | "reset">("request");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (step === "request") {
            if (!email) return;

            setError(null);
            setSuccessMessage(null);
            setIsSubmitting(true);

            try {
                const response = await authService.forgotPassword(email);
                if (response.success) {
                    setSuccessMessage(response.message ?? "OTP sent to your email. Enter it below to reset your password.");
                    setStep("reset");
                } else {
                    setError(response.message ?? "Failed to send OTP. Please try again.");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to send OTP. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }

        if (step === "reset") {
            if (!email || !otp || !password || !confirmPassword) {
                setError("Please fill all fields.");
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            setError(null);
            setSuccessMessage(null);
            setIsSubmitting(true);

            try {
                const response = await authService.resetPassword(email, otp, password);
                if (response.success) {
                    setSuccessMessage(response.message ?? "Password reset successfully. You can now log in.");
                    setOtp("");
                    setPassword("");
                    setConfirmPassword("");
                    route.replace("/auth");
                } else {
                    setError(response.message ?? "Failed to reset password. Please check the OTP and try again.");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to reset password. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 relative">
            <Link
                href="/auth?type=login"
                className="fixed top-4 left-4 z-50 inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Back to login"
            >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </span>
                <span className="hidden md:inline">Back to login</span>
            </Link>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Forgot password?</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Enter the email associated with your account and we&apos;ll send you instructions to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {successMessage && (
                                <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                                    {successMessage}
                                </div>
                            )}

                            <div className="space-y-4">
                                <AuthInput
                                    label="Email"
                                    id="forgot-password-email"
                                    type="email"
                                    placeholder="Input your email"
                                    required
                                    value={email}
                                    disabled={step === "reset"}
                                    onChange={(event) => setEmail(event.target.value)}
                                    leftIcon={
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4m4-8H8a4 4 0 00-4 4v6" />
                                        </svg>
                                    }
                                />

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    We&apos;ll send a one-time passcode to this email. Check your spam folder if needed.
                                </p>
                            </div>

                            {step === "reset" && (
                                <div className="space-y-4">
                                    <AuthInput
                                        label="OTP code"
                                        id="otp"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="Enter the 6-digit code"
                                        maxLength={6}
                                        required
                                        value={otp}
                                        onChange={(event) => setOtp(event.target.value)}
                                        leftIcon={
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 1.105-.672 2-1.5 2S9 12.105 9 11s.672-2 1.5-2S12 9.895 12 11z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 11c0 3.314-3.358 6-7.5 6s-7.5-2.686-7.5-6 3.358-6 7.5-6 7.5 2.686 7.5 6z" />
                                            </svg>
                                        }
                                    />

                                    <AuthInput
                                        label="New password"
                                        id="new-password"
                                        type="password"
                                        placeholder="Enter new password"
                                        required
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />

                                    <AuthInput
                                        label="Confirm new password"
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Repeat new password"
                                        required
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    !email ||
                                    (step === "reset" && (!otp || !password || !confirmPassword))
                                }
                                className="w-full py-3 px-4 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? "Processing..." : step === "request" ? "Send OTP" : "Reset password"}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Remembered your password?{" "}
                                <Link href="/auth?type=login" className="font-medium text-gray-900 dark:text-gray-200 hover:underline">
                                    Back to login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}


