"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Specialist {
  id: number;
  fullName: string;
  email: string;
  username: string;
  phone?: string;
  address?: string;
  bio?: string;
  skills?: string;
}

const SpecialistDetailPage = () => {
  const { id } = useParams();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://mustafocoder.pythonanywhere.com/api/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch specialist details");
        }
        return response.json();
      })
      .then((data) => {
        setSpecialist(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading specialist details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!specialist) return <div>No specialist found.</div>;

  return (
    <div className="px-6 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8">Specialist Detail</h1>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">{specialist.fullName}</h2>

        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Username:</span>{" "}
            {specialist.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {specialist.email}
          </p>
          {specialist.phone && (
            <p>
              <span className="font-semibold">Phone:</span> {specialist.phone}
            </p>
          )}
          {specialist.address && (
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {specialist.address}
            </p>
          )}
          {specialist.skills && (
            <p>
              <span className="font-semibold">Skills:</span> {specialist.skills}
            </p>
          )}
          {specialist.bio && (
            <p>
              <span className="font-semibold">Bio:</span> {specialist.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetailPage;
