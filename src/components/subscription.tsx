"use client";

import { useState } from "react";
import { MailIcon } from 'lucide-react';

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
    <div className={`rounded-2xl border border-border/60 bg-white dark:bg-gray-950/50 p-6 shadow-sm ${className || ""}`}>
      <h3 className="text-lg font-bold uppercase text-foreground mb-4">
        EXCLUSIVE READ FROM CRYPTO THREADS
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Weekly, insightful analysis of hot trends in Web3 markets, exclusive interviews, and deep dives into the crypto ecosystem. Stay ahead with Crypto Threads.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
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
  return <div className="container mx-auto px-4 sm:px-6 relative mb-16 sm:mb-20 z-10">
    <div className="rounded-3xl border border-foreground/10 bg-gradient-to-br from-background-light/90 to-background-dark/30 px-5 py-8 sm:px-8 sm:py-12 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="text-center md:text-left flex-1">
        <p className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
          Don’t be shy!
          <br /> Let’s collaborate
        </p>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto md:mx-0">
          Share your email and we’ll reach out with partnership opportunities, product updates, and ways we can help grow your crypto community.
        </p>
      </div>
      <form className="w-full md:w-auto">
        <label htmlFor="footer-collab-email" className="sr-only">
          Enter your email
        </label>
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <MailIcon className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="footer-collab-email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-foreground/10 bg-background-light/80 py-3 pl-11 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition"
            />
          </div>
          <button
            type="button"
            className="rounded-2xl bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-85 transition w-full sm:w-auto"
          >
            Let’s talk
          </button>
        </div>
      </form>
    </div>
  </div>
}