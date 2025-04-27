"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  job_type: string;
  tags?: string[];
};

const Page = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [theme, setTheme] = useState("light");

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    job_type: "Full Time",
  });

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

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

  const handleSearch = () => {
    const filtered = jobs.filter((job) =>
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
          headers: { "Content-Type": "application/json" },
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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <header className="container mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Discover more than <span className="text-blue-500">5000+ Jobs</span>
          </h1>
          <p className="text-xl mt-6 opacity-90 leading-relaxed">
            Great platform for job seekers looking for new career heights and
            passionate about startups.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-6 -mt-8">
        <div
          className={`flex flex-col md:flex-row gap-4 p-6 rounded-2xl ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border border-gray-200"
          } shadow-sm hover:shadow-md transition-all max-w-4xl`}
        >
          <div className="flex items-center flex-1 gap-4">
            <div
              className={`p-3 rounded-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Image src="/search.svg" alt="search" width={24} height={24} />
            </div>
            <input
              className={`flex-1 text-lg focus:outline-none bg-transparent ${
                theme === "dark"
                  ? "placeholder-gray-400"
                  : "placeholder-gray-500"
              }`}
              type="search"
              placeholder="Job title or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium cursor-pointer"
          >
            Search my job
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="opacity-70 font-medium">Popular:</span>
          {[
            "UI Designer",
            "UX Researcher",
            "Android",
            "Admin",
            "Developer",
          ].map((tag) => (
            <span
              key={tag}
              className={`px-4 py-2 rounded-full text-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-blue-50 text-blue-600"
              } hover:bg-blue-100 transition-colors cursor-pointer`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 mt-24">
        <h3 className="opacity-70 font-medium mb-8">
          TRUSTED BY TOP COMPANIES
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`p-6 rounded-xl flex items-center justify-center ${
                theme === "dark"
                  ? "bg-gray-800"
                  : "bg-gray-800 border border-gray-200"
              } transition-all hover:shadow-md`}
            >
              <Image
                src={`/img-${i}.svg`}
                alt="company logo"
                width={120}
                height={60}
                className={`${
                  i !== 1 ? "opacity-60 grayscale" : ""
                } hover:opacity-100 hover:grayscale-0 transition-all`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 my-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold">
              Explore by <span className="text-blue-500">category</span>
            </h2>
            <p className="opacity-70 mt-3">Browse jobs by specializations</p>
          </div>
          <button className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium flex items-center gap-2">
            View all categories <span>→</span>
          </button>
        </div>
        <Categories theme={theme} />
      </section>

      <section className="container mx-auto px-6 my-16">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
        >
          <span>+</span> Add New Job
        </button>

        {showAddForm && (
          <div
            className={`mt-8 p-8 rounded-2xl ${
              theme === "dark"
                ? "bg-gray-800"
                : "bg-white border border-gray-200"
            } shadow-sm`}
          >
            <h3 className="text-2xl font-bold mb-6">Add New Job Listing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block opacity-70 mb-2">Job Title</label>
                <input
                  type="text"
                  className={`w-full p-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({ ...newJob, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block opacity-70 mb-2">Company</label>
                <input
                  type="text"
                  className={`w-full p-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={newJob.company}
                  onChange={(e) =>
                    setNewJob({ ...newJob, company: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block opacity-70 mb-2">Location</label>
                <input
                  type="text"
                  className={`w-full p-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={newJob.location}
                  onChange={(e) =>
                    setNewJob({ ...newJob, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block opacity-70 mb-2">Job Type</label>
                <select
                  className={`w-full p-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              </div>
              <div className="md:col-span-2">
                <label className="block opacity-70 mb-2">Description</label>
                <textarea
                  rows={5}
                  className={`w-full p-3 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddJob}
                className="px-6 py-3 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Submit Job
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="container mx-auto px-6 my-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold">
              Featured <span className="text-blue-500">jobs</span>
            </h2>
            <p className="opacity-70 mt-3">
              Browse through our latest job listings
            </p>
          </div>
          <button className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium">
            View all jobs →
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                theme === "dark" ? "border-blue-400" : "border-blue-500"
              }`}
            ></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`p-6 rounded-xl transition-all hover:shadow-md ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-white hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-lg text-2xl font-bold ${
                      theme === "dark"
                        ? "bg-gray-700 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {job.company?.charAt(0) || "J"}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-md text-sm ${
                      theme === "dark"
                        ? "bg-gray-700 text-blue-400 border border-gray-600"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}
                  >
                    {job.job_type || "Full Time"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="mb-4 opacity-80">
                  {job.company} • {job.location || "Remote"}
                </p>
                <p className="mb-6 line-clamp-3 opacity-80">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className={`mt-6 cursor-pointer w-full py-2 rounded-lg font-medium ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  } transition-colors`}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer/>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Page;