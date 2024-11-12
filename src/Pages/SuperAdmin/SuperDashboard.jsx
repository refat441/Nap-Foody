import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router

function SuperDashboard() {
  const [isActive, setIsActive] = useState(true);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate(); // Navigation for redirects

  const toggleStatus = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Set the Authorization header with the token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch data from API
      axios
        .get("https://sunny.napver.com/api/admin/list")
        .then((response) => {
          console.log("Data fetched successfully:", response.data);
          setAdmins(response.data.admins);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          if (error.response && error.response.status === 401) {
            // Handle 401 error by removing token and redirecting to login
            localStorage.removeItem("token");
            alert("Session expired. Please log in again.");
            navigate("/login"); // Redirect to login page
          }
        });
    } else {
      // If no token is found, redirect to the login page
      console.warn("No token found, redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

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
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="bg-gray-100 border-b hover:bg-gray-200 transition duration-300"
              >
                <td className="px-4 py-2">{admin.id}</td>
                <td className="px-4 py-2">
                  <img
                    src={`https://sunny.napver.com/${admin.admin_image}`}
                    alt="Admin"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">********</td>
                <td className="px-4 py-2">{admin.phone}</td>
                <td className="px-4 py-2">{admin.nid}</td>
                <td className="px-4 py-2">{admin.address}</td>
                <td className="px-4 py-2">{admin.sms_count}</td>
                <td className="px-4 py-2">
                  {new Date(admin.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(admin.updated_at).toLocaleDateString()}
                </td>
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
                <td className="px-4 py-2">Action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuperDashboard;
