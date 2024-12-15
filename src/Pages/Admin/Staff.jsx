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
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {staff.length > 0 ? (
              staff.map((member) => (
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
                </tr>
              ))
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
