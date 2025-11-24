"use client";

interface AuthToggleProps {
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

export function AuthToggle({ activeTab, onTabChange }: AuthToggleProps) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
      <button
        onClick={() => onTabChange("login")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === "login"
            ? "bg-gray-900 dark:bg-gray-700 text-white"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        Login
      </button>
      <button
        onClick={() => onTabChange("signup")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === "signup"
            ? "bg-gray-900 dark:bg-gray-700 text-white"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}

