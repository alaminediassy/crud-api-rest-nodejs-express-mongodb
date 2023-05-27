import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-3xl font-bold text-slate-900">
                UNCHK’<span className="text-blue-600">Lab</span>
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            ></button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/auth/login">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Se connecter
              </button>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
