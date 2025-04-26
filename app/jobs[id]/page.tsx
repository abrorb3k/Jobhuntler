import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const JobDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/jobs/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setJob(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-40">
      <h2 className="text-3xl font-bold">{job.title}</h2>
      <p className="mt-4">{job.description}</p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Company:</h3>
        <p>{job.company}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Location:</h3>
        <p>{job.location}</p>
      </div>
      {/* Add other job details here */}
    </div>
  );
};

export default JobDetailPage;
