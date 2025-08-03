import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4F46E5", "#6366F1", "#818CF8"]; // Soft Indigo palette

const FunnelChartComponent = () => {
  const [data, setData] = useState([]);
  const { key } = useParams<{ key: string }>();

  useEffect(() => {
    if (!key) {
      console.error("API key is missing");
      return;
    }

    fetch(
      "http://localhost:4000/api/events/funnel?events=signup,view,purchase",
      {
        headers: {
          "x-api-key": key,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.steps) {
          const formatted = res.steps.map((step: any, i: number) => ({
            name: step.event.charAt(0).toUpperCase() + step.event.slice(1),
            value: step.users,
            fill: COLORS[i % COLORS.length],
          }));
          setData(formatted);
        } else {
          console.warn("No steps found in response");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch funnel data", err);
      });
  }, [key]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Funnel</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip
              formatter={(value: number) => [`${value} users`]}
              contentStyle={{
                color: "#000",
                backgroundColor: "#f9fafb",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#000" }}
            />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList
                dataKey="name"
                position="inside"
                fill="#fff"
                style={{ fontWeight: 600, fontSize: 14 }}
              />
              <LabelList
                dataKey="value"
                position="right"
                fill="#374151"
                style={{ fontSize: 14 }}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FunnelChartComponent;
