"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Specialist {
  id: number;
  fullName: string;
  email: string;
  profession: string;
  location: string;
  skills: string[];
}

const CompaniesPage = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      const isDark = JSON.parse(storedDarkMode);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    fetch("https://mustafocoder.pythonanywhere.com/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch specialists");
        }
        return response.json();
      })
      .then((data) => {
        setSpecialists(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center text-lg">Loading specialists...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="px-6 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Top Specialists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialists.map((specialist) => (
          <Link key={specialist.id} href={`/companies/${specialist.id}`}>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#4640DE] text-white flex items-center justify-center text-xl font-bold">
                  {specialist.fullName ? specialist.fullName.charAt(0) : "S"}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">
                    {specialist.fullName || "Specialist"}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {specialist.profession || "Developer"}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                📍 {specialist.location || "Unknown location"}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 break-words">
                📧 {specialist.email || "No email"}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {(specialist.skills || []).slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#F4F4F5] dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-5">
                <button className="px-4 py-2 bg-[#4640DE] text-white text-sm rounded-md hover:bg-[#3730a3] transition">
                  View Profile
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;


