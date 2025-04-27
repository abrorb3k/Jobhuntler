"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Specialist {
  id: number;
  full_name: string;
  email: string;
  profession: string;
  location: string;
  skills: string[];
}

const CompaniesPage = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newSpecialist, setNewSpecialist] = useState<Omit<Specialist, "id">>({
    full_name: "",
    email: "",
    profession: "",
    location: "",
    skills: [],
  });
  const [currentSkill, setCurrentSkill] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      const isDark = JSON.parse(storedDarkMode);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const fetchSpecialists = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://mustafocoder.pythonanywhere.com/api/users/"
      );

      if (!response.ok) {
        throw new Error(`HTTP xatosi! Status: ${response.status}`);
      }

      const data = await response.json();
      setSpecialists(data);
    } catch (err) {
      setError(err.message || "Specialistlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSpecialist((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (
      currentSkill.trim() &&
      !newSpecialist.skills.includes(currentSkill.trim())
    ) {
      setNewSpecialist((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }));
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setNewSpecialist((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(
        "https://mustafocoder.pythonanywhere.com/api/users/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSpecialist),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.message ||
            `Request failed. Status: ${response.status}`
        );
      }

      setSpecialists((prev) => [...prev, data]);

      setNewSpecialist({
        full_name: "",
        email: "",
        profession: "",
        location: "",
        skills: [],
      });

      setSuccessMessage("Specialist added successfully");
      setShowForm(false);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error message:", err);
      setError(
        err.message ||
          "Error adding specialist. Please check the details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !showForm) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-lg">Downloading...</div>
      </div>
    );
  }

  if (error && !showForm) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-red-500">
          <p>Xato: {error}</p>
          <button
            onClick={fetchSpecialists}
            className="mt-4 px-4 py-2 bg-[#4640DE] text-white rounded-md"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-20 py-10">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Top Specialists</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#4640DE] cursor-pointer text-white rounded-md hover:bg-[#3730a3] transition"
        >
          {showForm ? "Bekor qilish" : "Specialist Qo'shish"}
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Add specialist
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={newSpecialist.full_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newSpecialist.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job</label>
                <input
                  type="text"
                  name="profession"
                  value={newSpecialist.profession}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newSpecialist.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Skills
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                  }
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Ko'nikma qo'shish"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 cursor-pointer bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Add 
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newSpecialist.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#F4F4F5] dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-xs rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer bg-[#4640DE] text-white rounded-md hover:bg-[#3730a3] transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialists.map((specialist) => (
          <Link key={specialist.id} href={`/companies/${specialist.id}`}>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#4640DE] text-white flex items-center justify-center text-xl font-bold">
                  {specialist.full_name ? specialist.full_name.charAt(0) : "S"}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">
                    {specialist.full_name || "Specialist"}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {specialist.profession || "No profession"}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                📍 {specialist.location || "Manzil kiritilmagan"}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 break-words">
                📧 {specialist.email || "Email kiritilmagan"}
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
                <button className="px-4 py-2 cursor-pointer bg-[#4640DE] text-white text-sm rounded-md hover:bg-[#3730a3] transition">
                  See Profile
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