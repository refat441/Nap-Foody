import axios from "axios";
import { useState, useEffect } from "react";

function SuperDashboard() {
  const [isActive, setIsActive] = useState(true);

  const toggleStatus = () => {
    setIsActive(!isActive);
  };

  // Access token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Set authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch data only once when the component mounts
      axios
        .get("https://sunny.napver.com/api/admin/list")
        .then((response) => {
          console.log("Data fetched successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.warn("No token found in localStorage");
    }
  }, [token]); // Dependency array ensures this runs only once

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Admin Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Password</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">NID</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">SMS Count</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Updated At</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="bg-gray-100 border-b hover:bg-gray-200 transition duration-300">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Image Here</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">johndoe@example.com</td>
              <td className="px-4 py-2">********</td>
              <td className="px-4 py-2">123-456-7890</td>
              <td className="px-4 py-2">123456789</td>
              <td className="px-4 py-2">123 Main St, City</td>
              <td className="px-4 py-2">5</td>
              <td className="px-4 py-2">2024-01-01</td>
              <td className="px-4 py-2">2024-02-01</td>
              <td className="px-4 py-2">
                <button
                  onClick={toggleStatus}
                  className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-black"
                  }`}
                >
                  {isActive ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="px-4 py-2">2024-02-01</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuperDashboard;
