// app/jobs/create/page.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  company: yup.string().required("Company name is required"),
  location: yup.string().required("Location is required"),
});

const CreateJobPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await fetch("/api/jobs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setLoading(false);
    if (result.message === "Job created") {
      router.push("/jobs");
    }
  };

  return (
    <div className="px-40">
      <h2 className="text-3xl font-bold">Create Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div>
          <label>Job Title</label>
          <input {...register("title")} className="w-full p-3 border mt-2" />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className="mt-4">
          <label>Job Description</label>
          <textarea
            {...register("description")}
            className="w-full p-3 border mt-2"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="mt-4">
          <label>Company</label>
          <input {...register("company")} className="w-full p-3 border mt-2" />
          {errors.company && <p>{errors.company.message}</p>}
        </div>
        <div className="mt-4">
          <label>Location</label>
          <input {...register("location")} className="w-full p-3 border mt-2" />
          {errors.location && <p>{errors.location.message}</p>}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-700 text-white p-3"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJobPage;
