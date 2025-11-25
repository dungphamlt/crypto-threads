"use client";

import { useRef, useState, KeyboardEvent } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all inputs are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const getActiveIndex = () => {
    if (typeof document === "undefined") return 0;
    const activeElement = document.activeElement;
    const index = inputRefs.current.findIndex((ref) => ref === activeElement);
    return index === -1 ? 0 : index;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    const pastedArray = pastedData.split("").filter((char) => /^\d$/.test(char));

    if (pastedArray.length > 0) {
      const newOtp = [...otp];
      const startIndex = getActiveIndex();
      pastedArray.forEach((digit, i) => {
        if (startIndex + i < length) {
          newOtp[startIndex + i] = digit;
        }
      });
      setOtp(newOtp);

      const nextIndex = Math.min(startIndex + pastedArray.length, length - 1);
      inputRefs.current[nextIndex]?.focus();

      if (newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-full focus:border-gray-900 dark:focus:border-gray-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      ))}
    </div>
  );
}

