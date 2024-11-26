import React, { useEffect, useState } from "react";
import Adminservice from "../../../services/AdminService"; // Adjust the path as needed
import { toast } from "react-hot-toast"; // For notifications (optional)

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // State to handle UI during status update

  // Get token from localStorage (for manual access or debugging)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (token) {
          console.log("Token:", token); // Logging the token for debugging purposes

          // Call your Adminservice API to fetch categories
          const response = await Adminservice.showAllCategories();
          if (response.success) {
            setCategories(response.categories); // Save categories data
          }
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]); // Dependency array includes token, so it re-fetches if token changes

  // Function to toggle category status
  const toggleStatus = async (categoryId, currentStatus) => {
    try {
      setUpdating(true); // Start loading
      const newStatus = currentStatus === "1" ? "0" : "1"; // Toggle status (1 -> 0 or 0 -> 1)

      // Update status in the backend
      const response = await Adminservice.toggleStatus(categoryId, newStatus);
      if (response.success) {
        // Update local state with the new status
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId
              ? { ...category, status: newStatus }
              : category
          )
        );
        toast.success("Category status updated!");
      } else {
        toast.error("Failed to update category status.");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Something went wrong.");
    } finally {
      setUpdating(false); // Stop loading
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-violet-700">
          Category List
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-violet-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="px-6 py-4 text-sm">{category.id}</td>
                <td className="px-6 py-4 text-sm">{category.name}</td>
                <td className="px-6 py-4 text-sm">
                  {category.status === "1" ? (
                    <span className="text-green-500 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <img
                    src={`https://sunny.napver.com/storage/${category.category_image}`}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(category.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => toggleStatus(category.id, category.status)}
                    disabled={updating} // Disable button while updating
                    className={`${
                      category.status === "1"
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-green-500 hover:bg-green-700"
                    } text-white py-2 px-4 rounded-full transition duration-300 ease-in-out`}
                  >
                    {updating ? (
                      <span>Loading...</span> // Show loading text during update
                    ) : category.status === "1" ? (
                      "Deactivate"
                    ) : (
                      "Activate"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
