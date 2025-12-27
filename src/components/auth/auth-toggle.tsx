"use client";

interface AuthToggleProps {
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

export function AuthToggle({ activeTab, onTabChange }: AuthToggleProps) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6">
      <button
        onClick={() => onTabChange("login")}
        className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-colors ${
          activeTab === "login"
            ? "bg-primary text-white"
            : "text-foreground hover:text-primary/80"
        }`}
      >
        Login
      </button>
      <button
        onClick={() => onTabChange("signup")}
        className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-colors ${
          activeTab === "signup"
            ? "bg-primary text-white"
            : "text-foreground hover:text-primary/80"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}
