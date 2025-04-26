"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [theme, setTheme] = useState("light"); // 🌗 Dark/Light mode

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    job_type: "Full Time",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://mustafocoder.pythonanywhere.com/api/jobs/"
        );
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Theme bilan ishlash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle(
          "dark",
          storedTheme === "dark"
        );
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  const handleSearch = () => {
    const filtered = jobs.filter((job: any) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleAddJob = async () => {
    try {
      const response = await fetch(
        "https://mustafocoder.pythonanywhere.com/api/jobs/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        }
      );
      const data = await response.json();
      setJobs((prev) => [...prev, data]);
      setFilteredJobs((prev) => [...prev, data]);
      setShowAddForm(false);
      setNewJob({
        title: "",
        company: "",
        location: "",
        description: "",
        job_type: "Full Time",
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="px-6 md:px-20 lg:px-40 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="flex justify-end pt-6">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition"
        >
          {theme === "light" ? "Switch to Dark 🌙" : "Switch to Light ☀️"}
        </button>
      </div>

      {/* Content */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl w-full md:w-[400px] pt-10 font-bold">
        Discover more than <span className="text-[#26A4FF]">5000+ Jobs</span>
      </h1>
      <h2 className="w-full md:w-[450px] text-xl pt-7">
        Great platform for job seekers looking for new career heights and
        passionate about startups.
      </h2>

      {/* Search */}
      <div className="flex flex-col md:flex-row justify-between p-4 bg-white dark:bg-gray-800 w-full md:w-[900px] mt-6 rounded-lg shadow">
        <div className="flex gap-3 mb-4 md:mb-0">
          <Image src="/search.svg" alt="search" width={30} height={30} />
          <input
            className="text-gray-800 dark:text-white dark:bg-gray-700 w-[230px] border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none"
            type="search"
            placeholder="Job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-[#4640DE] text-white rounded hover:bg-[#3730a3]"
        >
          Search my job
        </button>
      </div>

      {/* Popular */}
      <h3 className="pt-4 text-gray-400 dark:text-gray-500">
        Popular : UI Designer, UX Researcher, Android, Admin
      </h3>

      {/* Companies */}
      <div className="mt-20">
        <h3 className="opacity-50">Companies we helped grow</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mt-5 my-10">
        <Image src="/img-1.svg" alt="img" width={100} height={100} />
        <Image
          src="/img-2.svg"
          alt="img"
          width={100}
          height={100}
          className="opacity-30"
        />
        <Image
          src="/tesla.svg"
          alt="tesla"
          width={100}
          height={100}
          className="opacity-30"
        />
        <Image
          src="/img-4.svg"
          alt="img"
          width={100}
          height={100}
          className="opacity-30"
        />
        <Image
          src="/img-5.svg"
          alt="img"
          width={100}
          height={100}
          className="opacity-30"
        />
      </div>

      {/* Category */}
      <div className="mb-10">
        <h3 className="text-5xl font-bold mb-10">
          Explore by <span className="text-[#26A4FF]">category</span>
        </h3>
        <Categories />
      </div>

      {/* Add Job */}
      <div className="mb-10">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 mb-6"
        >
          + Add New Job
        </button>

        {showAddForm && (
          <div className="p-6 mb-10 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newJob.company}
              onChange={(e) =>
                setNewJob({ ...newJob, company: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newJob.location}
              onChange={(e) =>
                setNewJob({ ...newJob, location: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
            ></textarea>
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={newJob.job_type}
              onChange={(e) =>
                setNewJob({ ...newJob, job_type: e.target.value })
              }
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={handleAddJob}
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Jobs List */}
      <div className="mb-10">
        <h3 className="text-5xl font-bold mb-5">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h3>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job: any) => (
              <div
                key={job.id}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
              >
                <span className="absolute top-4 right-4 border border-[#4640DE] text-[#4640DE] px-3 py-1 text-xs rounded-md hover:bg-amber-100">
                  {job.job_type || "Full Time"}
                </span>
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-lg text-2xl font-bold text-[#4640DE]">
                    {job.company?.charAt(0) || "R"}
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-1">{job.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {job.company} • {job.location || "Unknown"}
                </p>
                <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {job.description}
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {job.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
