import { useEffect, useState } from "react";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { AiOutlineStock } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { FiClock } from "react-icons/fi";
import DashboardSalesAnalyticsChart from "../../Components/Chart/DashboardSalesAnalyticsChart";
import DashboardSalesRanking from "../../Components/Chart/DashboardSalesRanking";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SuperAdminService from "../../services/SuperAdminService";
import requests from "../../services/httpRequest";
const Dashboard = () => {
  // Date and time state
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
  //   chart
  const sealsAnaData = {
    // labels: ["Mirpur", "Uttara", "Gulshan"],
    datasets: [
      {
        label: "SalesRanking",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const CategorysAnalytics = {
    // labels: ["Salad", "Sandwich", "Bread", "Tuna Steak", "Fish", "Shrimp"],
    datasets: [
      {
        label: "SalesRanking",
        data: [300, 50, 100, 75, 170, 210],
        backgroundColor: [
          "rgb(3, 99, 232)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(355, 99, 132)",
          "rgb(540, 162, 235)",
          "rgb(155, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="text-black mt-4 ml-4 overflow-hidden">
      {/* Date and time display */}
      <div className="flex items-center gap-3 p-4 bg-white shadow-md rounded-lg max-w-sm border border-gray-200">
        <FiClock size={24} className="text-blue-500" />
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm font-medium">
            Current Date & Time
          </span>
          <h2 className="text-xl font-semibold text-gray-800">
            {dateTime.toLocaleString("en-US", options)}
          </h2>
        </div>
      </div>
      {/* total Orders, Sales, SMS and Delivered section */}
      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="flex justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-500 text-4xl">
              <HiMiniShoppingBag />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">7</p>
              <p className="text-gray-500">Total Orders</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex  justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-green-500 text-4xl">
              <AiOutlineStock />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">5</p>
              <p className="text-gray-500">Total Stocks</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex  justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-purple-500 text-4xl">
              <RiMessage2Line />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">12</p>
              <p className="text-gray-500">Messages</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex  justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-orange-500 text-4xl">
              <TbTruckDelivery />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">4</p>
              <p className="text-gray-500">Deliveries</p>
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg font-semibold text-gray-700">Sales Analytics</p>
          <DashboardSalesAnalyticsChart />
        </div>
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg font-semibold text-gray-700">
            Sales Ranking of Branch
          </p>
          <DashboardSalesRanking data={sealsAnaData} />
        </div>
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg font-semibold text-gray-700">
            Categories Analytics
          </p>
          <DashboardSalesRanking data={CategorysAnalytics} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
