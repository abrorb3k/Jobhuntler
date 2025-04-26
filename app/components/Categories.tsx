import React from "react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    title: "Design",
    jobs: "235 jobs available",
    icon: "/icon-1.svg",
    bg: "bg-white",
    textColor: "text-[#25324B]",
  },
  {
    id: 2,
    title: "Sales",
    jobs: "756 jobs available",
    icon: "/icon-2.svg",
    bg: "bg-white",
    textColor: "text-[#25324B]",
  },
  {
    id: 3,
    title: "Design",
    jobs: "140 jobs available",
    icon: "/icon-3.svg",
    bg: "bg-[#4640DE]",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Finance",
    jobs: "325 jobs available",
    icon: "/icon-4.svg",
    bg: "bg-white",
    textColor: "text-[#25324B]",
  },
  {
    id: 5,
    title: "Technology",
    jobs: "436 jobs available",
    icon: "/icon-5.svg",
    bg: "bg-white",
    textColor: "text-[#25324B]",
  },
  {
    id: 6,
    title: "Engineering",
    jobs: "542 jobs available",
    icon: "/icon-6.png",
    bg: "bg-white",
    textColor: "text-[#25324B]",
  },
  {
    id: 7,
    title: "Business",
    jobs: "211 jobs available",
    icon: "/icon-7.svg",
    bg: "bg-white",
    textColor: "text-[#25324B]",
  },
  {
    id: 8,
    title: "Human Resource",
    jobs: "346 jobs available",
    icon: "/icon-8.svg",
    bg: "bg-white",
    textColor: "text-[#25324B]",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-16 px-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`p-6 rounded-lg shadow-md ${category.bg} transition hover:shadow-xl`}
        >
          <Image src={category.icon} alt="icon" width={50} height={50} />
          <h4 className={`${category.textColor} font-bold text-2xl pt-6`}>
            {category.title}
          </h4>
          <div className="flex items-center justify-between pt-4">
            <p
              className={`${
                category.textColor === "text-white"
                  ? "text-white"
                  : "text-[#7C8493]"
              } text-lg`}
            >
              {category.jobs}
            </p>
            <Image
              className="cursor-pointer"
              src="/arrow-right.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
