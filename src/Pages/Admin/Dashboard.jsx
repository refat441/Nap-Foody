import { useEffect, useState } from "react";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { AiOutlineStock } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

const Dashboard = () => {
  // date time
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
    <div className="text-black mt-4 ml-4">
      {/* date time */}
      <h2 className="text-2xl">{dateTime.toLocaleString("en-US", options)}</h2>

      {/* total Orders, Sales, SMS and Delivered section */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-500 text-3xl">
              <HiMiniShoppingBag />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">7</p>
              <p className="text-gray-500">Total Orders</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-green-500 text-3xl">
              <AiOutlineStock />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">5</p>
              <p className="text-gray-500">Total Stocks</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-purple-500 text-3xl">
              <RiMessage2Line />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">12</p>
              <p className="text-gray-500">Messages</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-orange-500 text-3xl">
              <TbTruckDelivery />
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-800">4</p>
              <p className="text-gray-500">Deliveries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
