// src/pages/ActiveEventsPage.tsx
import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

type ApiKey = {
  _id: string;
  key: string;
  orgId: string;
  projectId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const ActiveEventsPage: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchApiKeys() {
      try {
        const res = await fetch("http://localhost:4000/api/apikeys/active");
        const data = await res.json();

        const uniqueByKey = data.filter(
          (item: { key: string }, index: number, self: any[]) =>
            index === self.findIndex((t) => t.key === item.key)
        );
        setApiKeys(uniqueByKey);
      } catch (error) {
        console.error("Failed to fetch active api keys", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApiKeys();
  }, []);
  if (loading) return <Loading />;

  if (!apiKeys.length)
    return <div className="text-center p-6">No active API Keys found.</div>;

  return (
    <div className="min-h-screen bg-white py-10 px-5">
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">
        Active Events (API Keys)
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {apiKeys.map((key) => (
          <div
            key={key._id}
            className="p-6 border rounded-lg shadow hover:shadow-md cursor-pointer transition hover:border-blue-600"
            onClick={() => navigate(`/dashboard/${key.key}`)}
          >
            <div className="font-mono text-lg mb-1">{key.key}</div>
            <div className="text-sm text-gray-500">
              Project ID: {key.projectId}
            </div>
            <div className="text-sm text-gray-400">Org ID: {key.orgId}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveEventsPage;
