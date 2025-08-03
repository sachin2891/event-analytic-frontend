// src/pages/RetentionPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EVENT_TYPES = [
  "signup",
  "login",
  "logout",
  "page_view",
  "purchase",
  "view",
];
const PERIOD_OPTIONS = [
  { label: "1 Day", value: "1" },
  { label: "2 Days", value: "2" },
  { label: "3 Days", value: "3" },
  { label: "4 Days", value: "4" },
  { label: "5 Days", value: "5" },
  { label: "6 Days", value: "6" },
  { label: "7 Days", value: "7" },
];

type RetentionData = {
  day: number;
  users: number;
};

const RetentionPage: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const [cohort, setCohort] = useState(EVENT_TYPES[0]);
  const [period, setPeriod] = useState("7");
  const [retention, setRetention] = useState<RetentionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetches retention data when inputs change
  useEffect(() => {
    const fetchRetention = async () => {
      if (!key) return;
      setLoading(true);
      setError(null);
      setRetention([]);
      try {
        const response = await fetch(
          `http://localhost:4000/api/events/retention?cohort=${cohort}&period=${period}`,
          {
            headers: {
              "x-api-key": key,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setRetention(data.retention || []);
      } catch (e) {
        setError("Failed to fetch retention data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRetention();
  }, [cohort, period, key]);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Retention Analysis
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {/* Cohort selection */}
        <select
          value={cohort}
          onChange={(e) => setCohort(e.target.value)}
          className="px-4 py-2 rounded border"
        >
          {EVENT_TYPES.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>

        {/* Period selection */}
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 rounded border"
        >
          {PERIOD_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-blue-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={retention}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              label={{ value: "Day", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{
                value: "Users Retained",
                angle: -90,
                position: "insideLeft",
                offset: 5,
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#1d4ed8"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RetentionPage;
