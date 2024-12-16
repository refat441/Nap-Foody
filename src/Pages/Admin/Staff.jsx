import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Adminservice from "../../services/AdminService";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleStatusLoading, setToggleStatusLoading] = useState(null);

  // Fetch staff via API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await Adminservice.showAllStaff();
        if (response.success) {
          setStaff(response.staff);
        } else {
          toast.error("Failed to fetch staff.");
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast.error("Error fetching staff.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // for toggle button
  const toggleStaffStatus = async (id, currentStatus) => {
    try {
      setToggleStatusLoading(id); // Start loading indicator

      // Send API request to toggle status
      const response = await Adminservice.toggleStaffStatus(id);
      if (response.success) {
        setStaff((prevStaff) =>
          prevStaff.map((staff) =>
            staff.id === id
              ? { ...staff, status: currentStatus === "1" ? "0" : "1" } // Toggle status
              : staff
          )
        );
        toast.success(
          `Staff is now ${
            currentStatus === "1" ? "Inactive" : "Active"
          } successfully!`
        );
      } else {
        toast.error("Failed to toggle staff status.");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Error toggling status.");
    } finally {
      setToggleStatusLoading(null); // Stop loading indicator
    }
  };

  // for disply loding ui.....
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="mb-4 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-violet-700">
          Staff
        </h1>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-violet-700 text-white">
            <tr>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                ID
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Image
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Name
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Status
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Role
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Branch ID
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Phone
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                NID
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Address
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Email
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Password
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {staff.length > 0 ? (
              staff.map((member) => {
                const isActive = member.status === "1"; // Correct isActive logic
                return (
                  <tr
                    key={member.id}
                    className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                  >
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.id}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      <img
                        src={`https://sunny.napver.com/storage/${member.staff_image}`}
                        alt={member.name}
                        className="w-20 h-20 object-cover rounded shadow"
                      />
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.name}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {isActive ? (
                        <span className="text-green-500 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.role}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.branch_id}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.phone}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.nid}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.address}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.email}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {member.password}
                    </td>
                    <td className="px-3 py-4 text-xs md:text-sm flex items-center space-x-2 sm:space-x-3">
                      <button
                        disabled={toggleStatusLoading === member.id}
                        onClick={() =>
                          toggleStaffStatus(member.id, member.status)
                        }
                        className={`flex items-center justify-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
                          isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {toggleStatusLoading === member.id ? (
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                        ) : (
                          <>
                            <span
                              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                                isActive ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></span>
                            {isActive ? "Active" : "Inactive"}
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No staff available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;
