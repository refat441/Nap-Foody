import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminService from "../../services/SuperAdminService";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

function SuperDashboard() {
  const adminUpdateForm = useNavigate(); // for navegative superadminservice page
  //for togol status
  const [isActive, setIsActive] = useState(true);
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  const toggleStatus = () => {
    setIsActive(!isActive);
  };

  // for access the token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      SuperAdminService.getAllAdmins()
        .then((response) => {
          console.log("Data fetched successfully:", response);
          setAdmins(response.admins);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login");
        });
    } else {
      console.warn("No token found, redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  // Delete function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      SuperAdminService.deleteAdmin(id)
        .then(() => {
          // Remove the deleted admin from the state
          setAdmins((prevAdmins) =>
            prevAdmins.filter((admin) => admin.id !== id)
          );
          alert("Admin deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting admin:", error);
          alert("Failed to delete admin. Please try again.");
        });
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between p-6 bg-white shadow-md rounded-lg mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Admins</h2>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          title="Add New Admin"
          onClick={() => adminUpdateForm("/adminupdateform")}
        >
          Add Admin
        </button>
      </div>

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
                    src={`https://sunny.napver.com/public/storage/${admin.admin_image}`}
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
                <td className="px-4 pt-3 flex items-center justify-center space-x-3">
                  {/* Update Button */}
                  <button
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                    title="Update"
                  >
                    <GrUpdate className="text-xl" />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200"
                    title="Delete"
                    onClick={() => handleDelete(admin.id)} // Attach delete handler
                  >
                    <AiOutlineDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuperDashboard;
