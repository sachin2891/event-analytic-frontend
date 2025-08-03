import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function LiveCount() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // ✅ FIXED: removed /api/event
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("✅ Connected to socket");
    });

    socket.on("eventCountUpdate", (data) => {
      console.log("📥 Received update:", data);

      // ✅ FIXED: update correct shape of state
      setCounts((prevCounts) => ({
        ...prevCounts,
        [data.eventName]: data.count,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📊 Live Event Counts</h2>
      <ul className="space-y-2">
        {Object.entries(counts).map(([eventName, count]) => (
          <li key={eventName} className="text-lg">
            <span className="font-semibold capitalize">{eventName}:</span>{" "}
            <span className="text-green-600">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
