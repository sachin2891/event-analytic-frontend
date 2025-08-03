import React from "react";
import { useParams } from "react-router-dom";
import LiveEventCount from "../components/LiveEventCounter";
import FunnelChart from "../components/FunnelChart";
import RetentionChart from "../components/RetentionTable";

const DashboardPage: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  // console.log(key);

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Dashboard for Project: {key}
      </h2>
      <div className="max-w-4xl mx-auto space-y-12">
        <LiveEventCount />
        <FunnelChart />

        <RetentionChart />
      </div>
    </div>
  );
};

export default DashboardPage;
