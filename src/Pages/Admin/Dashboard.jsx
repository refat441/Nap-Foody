import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000); // Update every second
    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return (
    <div className="text-black">
      <h2 className="text-2xl">{dateTime.toLocaleString("en-US", options)}</h2>
    </div>
  );
};

export default Dashboard;
