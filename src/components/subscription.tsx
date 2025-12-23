"use client";

import { useEffect, useState } from "react";

interface SubscriptionCardProps {
  className?: string;
}

export function SubscriptionCard({ className }: SubscriptionCardProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      console.log("Subscribing:", email);
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-border/60 bg-white dark:bg-gray-950/50 p-6 shadow-sm ${
        className || ""
      }`}
    >
      <h3 className="text-lg font-bold uppercase text-foreground mb-4">
        EXCLUSIVE READ FROM CRYPTO THREADS
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Weekly, insightful analysis of hot trends in Web3 markets, exclusive
        interviews, and deep dives into the crypto ecosystem. Stay ahead with
        Crypto Threads.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full px-4 py-2 bg-primary text-white dark:text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
        </button>
      </form>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

export function Collaboration() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    verifyEmail(email);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    try {
      console.log("Submitting:", email);
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const verifyEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = email.length > 0 && emailRegex.test(email);
    setEmailValid(isValid);
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-3xl md:text-4xl font-semibold text-white">
        Subscribe to receive the latest updates
      </p>

      <form className="w-full md:w-auto" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-2">
          <input
            required
            id="footer-collab-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-full bg-white py-2 px-3 text-sm text-primary font-semibold focus:ring-1 focus:ring-black focus:outline-none transition"
          />
          {email.trim().length > 0 && (
            <button
              type="submit"
              disabled={isSubmitting || !email || !emailValid}
              className="px-3 py-2 bg-white text-primary rounded-full dark:text-black font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-white/80"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
