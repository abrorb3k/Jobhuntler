"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {

  return (
    <div className="flex justify-between items-center px-5 md:px-10 lg:px-40 py-5 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            src="/Logo-2.svg"
            alt="Logo"
            width={160}
            height={36}
            className="w-32 md:w-40"
          />
        </Link>

        <div >
          
          <Link
            className="hover:text-blue-700 dark:hover:text-blue-400 duration-300"
            href="/companies"
          >
            Specialists
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-blue-700 dark:text-blue-400 font-bold pr-4 md:pr-6 border-r border-gray-300 dark:border-gray-600 hover:text-blue-500 dark:hover:text-blue-300 duration-300"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-blue-700 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-400 text-white font-bold px-4 md:px-6 py-2 rounded-md transition-all"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
