"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LogoOg from "@/assets/icons/logo-og-white.svg";

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
      className={`rounded-xl bg-primary p-4 md:p-6 shadow-sm overflow-hidden relative ${
        className || ""
      }`}
    >
      <div className="w-8/12 block md:flex md:h-full md:flex-col md:justify-between">
        <div className="flex-1">
          <h3 className="text-base font-bold uppercase text-[#F2F2F7]">
            Exclusive read from
          </h3>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Crypto Threads
          </h2>
          <p className="text-sm text-[#F2F2F7] mb-2">
            Weekly snapshot of key trends in Web3 markets to serve your
            interests. Fill the form to gain breaking news and valuable insights
            to navigate and spot can&apos;t -miss opportunities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-full bg-white py-2 px-3 text-sm text-primary font-medium focus:ring-1 focus:ring-black focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="px-6 py-1 text-sm md:text-base bg-white text-primary font-medium  rounded-full hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        <p className="text-xs text-[#F2F2F7] mt-4 ">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
      <div className="absolute bottom-[-10%] right-[-15%] w-1/2 aspect-square">
        <Image
          src={LogoOg}
          alt="Logo"
          width={128}
          height={128}
          className="w-full h-full object-contain"
        />
      </div>
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
        <div className="flex flex-col items-start gap-2">
          <input
            required
            id="footer-collab-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-full bg-white py-2 px-3 text-sm text-primary font-medium focus:ring-1 focus:ring-black focus:outline-none transition"
          />
          {email.trim().length > 0 && (
            <button
              type="submit"
              disabled={isSubmitting || !email || !emailValid}
              className="px-6 py-1.5 bg-white text-primary rounded-full dark:text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-white/80"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
