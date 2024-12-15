import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Adminservice from "../../services/AdminService";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch branches via API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await Adminservice.showAllBranches();
        if (response.success) {
          setBranches(response.branches);
        } else {
          toast.error("Failed to fetch branches.");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("Error fetching branches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Show spinner while loading
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
          Branches
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
                Name
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Branch Code
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Branch Phone
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Branch Address
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {branches.length > 0 ? (
              branches.map((branch, index) => (
                <tr
                  key={branch.id}
                  className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {index + 1}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {branch.name}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {branch.branch_code}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {branch.branch_phone}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {branch.branch_address}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No branches available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Branches;
