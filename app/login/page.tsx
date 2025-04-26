"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        return;
      }

      const data = await res.json();
      console.log("User logged in:", data);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div className="mx-auto flex justify-center gap-20">
      <div className="w-[340px] p-3">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="flex flex-col text-xl">
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
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-1 border-gray-500 w-[300px] p-3 mt-2"
              placeholder="Enter password"
            />
          </label>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            className="bg-[#4640DE] text-2xl py-2 text-center w-full mt-10 cursor-pointer hover:bg-[#4540deab] duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex gap-2 items-center mt-5">
          <h5 className="text-[#707481]">Dont have an account?</h5>
          <Link
            className="text-[#4640DE] font-bold hover:text-[#4540deab] duration-300"
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


