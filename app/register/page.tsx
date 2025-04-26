

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Registration failed");
        return;
      }

      const data = await res.json();
      console.log("User registered:", data);
      router.push("/login"); 
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="mx-auto flex justify-center gap-20">
      <Image src="/Login-img.svg" alt="login img" width={500} height={900} />
      <div className="w-[340px] p-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="flex flex-col text-xl">
            Full Name
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border-1 border-gray-500 w-[300px] p-3 mt-2"
              placeholder="Enter full name"
            />
          </label>

          <label htmlFor="email" className="flex flex-col text-xl mt-4">
            Email
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-1 border-gray-500 w-[300px] p-3 mt-2"
              placeholder="Enter email"
            />
          </label>

          <label htmlFor="password" className="flex flex-col text-xl mt-4">
            Password
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-1 border-gray-500 w-[300px] p-3 mt-2"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="bg-[#4640DE] text-2xl py-2 text-center w-full mt-10 cursor-pointer hover:bg-[#4540deab] duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex gap-2 items-center mt-5">
          <h5 className="text-[#707481]">Already have an account?</h5>
          <Link
            className="text-[#4640DE] font-bold hover:text-[#4540deab] duration-300"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;




