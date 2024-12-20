import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminService from "../../services/SuperAdminService";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

function SuperDashboard() {
  const adminUpdateForm = useNavigate(); // for navegative superadminservice page

  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const [toggleStatusLoading, setToggleStatusLoading] = useState(null);

  //for toggol status
  const toggleStatus = (id) => {
    setToggleStatusLoading(id);
    SuperAdminService.toggleStatus(id)
      .then((res) => {
        setAdmins((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: res.status,
                }
              : item
          )
        );
      })
      .catch((e) => console.log)
      .finally(() => {
        setToggleStatusLoading(null);
      });
  };

  // for access the token and admin list
  useEffect(() => {
    if (admins.length > 0) return;
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

  // update and edit finction
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedAdmin) return;

    SuperAdminService.updateAdmin(selectedAdmin.id, selectedAdmin)
      .then(() => {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin.id === selectedAdmin.id ? selectedAdmin : admin
          )
        );
        alert("Admin updated successfully.");
        document.getElementById("my_modal_4").close();
      })
      .catch((error) => {
        console.error("Error updating admin:", error);
        alert("Failed to update admin. Please try again.");
      });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between p-6 bg-white shadow-md rounded-lg mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Admins</h2>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          title="Add New Admin"
          onClick={() => adminUpdateForm("/dashboard/adminupdateform")}
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
            {admins.map((admin) => {
              const isActive = admin.status == "1";
              return (
                <tr
                  key={admin.id}
                  className="bg-gray-100 border-b hover:bg-gray-200 transition duration-300"
                >
                  <td className="px-4 py-2">{admin.id}</td>
                  <td className="px-4 py-2">
                    <img
                      src={`https://sunny.napver.com/public/storage/${admin.admin_image}`}
                      alt={admin.name}
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
                      disabled={toggleStatusLoading}
                      onClick={() => toggleStatus(admin.id)}
                      className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${
                        isActive
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-black"
                      }`}
                    >
                      {toggleStatusLoading === admin.id
                        ? "Loaidng...."
                        : isActive
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 pt-3 flex items-center justify-center space-x-3">
                    {/* Update Button */}
                    <button
                      className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                      title="Update"
                      onClick={() => {
                        setSelectedAdmin(admin); // Set the selected admin data for editing
                        document.getElementById("my_modal_4").showModal();
                      }}
                    >
                      <GrUpdate className="text-xl" />
                    </button>

                    {/* Update Admin Dialog */}
                    <dialog id="my_modal_4" className="modal bg-transparent">
                      <div className="modal-box w-full max-w-4xl bg-Zinc-300 shadow-lg rounded-lg">
                        <h3 className="font-bold text-2xl mb-4 text-center text-white">
                          Update Admin Details
                        </h3>
                        <form
                          onSubmit={handleUpdateSubmit}
                          className="space-y-4"
                        >
                          {/* Name and Email Fields */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full">
                              <label className="block text-sm font-medium text-white">
                                Name
                              </label>
                              <input
                                type="text"
                                value={selectedAdmin?.name || ""}
                                onChange={(e) =>
                                  setSelectedAdmin({
                                    ...selectedAdmin,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="Enter name"
                                className="input input-bordered w-full text-gray-800 bg-white bg-opacity-80"
                              />
                            </div>
                            <div className="w-full">
                              <label className="block text-sm font-medium text-white">
                                Email
                              </label>
                              <input
                                type="email"
                                value={selectedAdmin?.email || ""}
                                onChange={(e) =>
                                  setSelectedAdmin({
                                    ...selectedAdmin,
                                    email: e.target.value,
                                  })
                                }
                                placeholder="Enter email"
                                className="input input-bordered w-full text-gray-800 bg-white bg-opacity-80"
                              />
                            </div>
                          </div>

                          {/* Password and Phone Fields */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full">
                              <label className="block text-sm font-medium text-white">
                                Password
                              </label>
                              <input
                                type="password"
                                value={selectedAdmin?.password || ""}
                                onChange={(e) =>
                                  setSelectedAdmin({
                                    ...selectedAdmin,
                                    password: e.target.value,
                                  })
                                }
                                placeholder="Enter password"
                                className="input input-bordered w-full text-gray-800 bg-white bg-opacity-80"
                              />
                            </div>
                            <div className="w-full">
                              <label className="block text-sm font-medium text-white">
                                Phone
                              </label>
                              <input
                                type="tel"
                                value={selectedAdmin?.phone || ""}
                                onChange={(e) =>
                                  setSelectedAdmin({
                                    ...selectedAdmin,
                                    phone: e.target.value,
                                  })
                                }
                                placeholder="Enter phone number"
                                className="input input-bordered w-full text-gray-800 bg-white bg-opacity-80"
                              />
                            </div>
                          </div>

                          {/* NID and Address Fields */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full">
                              <label className="block text-sm font-medium text-white">
                                NID
                              </label>
                              <input
                                type="text"
                                value={selectedAdmin?.nid || ""}
                                onChange={(e) =>
                                  setSelectedAdmin({
                                    ...selectedAdmin,
                                    nid: e.target.value,
                                  })
                                }
                                placeholder="Enter NID"
                                className="input input-bordered w-full text-gray-800 bg-white bg-opacity-80"
                              />
                            </div>
                            <div className="w-full">
                              <label className="block text-sm font-medium text-white">
                                Address
                              </label>
                              <textarea
                                value={selectedAdmin?.address || ""}
                                onChange={(e) =>
                                  setSelectedAdmin({
                                    ...selectedAdmin,
                                    address: e.target.value,
                                  })
                                }
                                placeholder="Enter address"
                                className="textarea textarea-bordered w-full text-gray-800 bg-white bg-opacity-80"
                              ></textarea>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary w-full sm:w-auto px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 transition duration-200 rounded-md"
                            >
                              Update
                            </button>
                          </div>
                        </form>

                        {/* Close Modal */}
                        <div className="modal-action">
                          <button
                            className="btn text-gray-200"
                            onClick={() =>
                              document.getElementById("my_modal_4").close()
                            }
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </dialog>

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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuperDashboard;
