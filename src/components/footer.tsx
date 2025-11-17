// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Crypto Threads. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
