import React, { useEffect, useState } from "react";
import Adminservice from "../../../services/AdminService"; // Adjust the path as needed
import { toast } from "react-hot-toast"; // For notifications (optional)

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleStatusLoading, setToggleStatusLoading] = useState(null); // Track which category is

  // Fetch categories via API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Adminservice.showAllCategories();
        if (response.success) {
          setCategories(response.categories);
        } else {
          toast.error("Failed to fetch categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  //toogle btton
  const toggleCategoryStatus = async (id, currentStatus) => {
    setToggleStatusLoading(id); // Show loading for the specific category
    try {
      // Send API request to toggle status
      const response = await Adminservice.toggleCategoryStatus(id);
      if (response.success) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === id
              ? { ...category, status: currentStatus === "1" ? "0" : "1" } // Toggle status
              : category
          )
        );
        toast.success(
          `Category is now ${
            currentStatus === "1" ? "Inactive" : "Active"
          } successfully!`
        );
      } else {
        toast.error("Failed to toggle category status.");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Error toggling status.");
    } finally {
      setToggleStatusLoading(null); // Stop loading indicator
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
            {categories.map((category) => {
              const isActive = category.status === "1"; // Check if the category is active
              return (
                <tr
                  key={category.id}
                  className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-6 py-4 text-sm">{category.id}</td>
                  <td className="px-6 py-4 text-sm">{category.name}</td>
                  <td className="px-6 py-4 text-sm">
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
                      disabled={toggleStatusLoading === category.id}
                      onClick={() =>
                        toggleCategoryStatus(category.id, category.status)
                      }
                      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
                        category.status === "1"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {toggleStatusLoading === category.id ? (
                        <svg
                          className="w-5 h-5 animate-spin"
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
                            className={`w-2.5 h-2.5 rounded-full ${
                              category.status === "1"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {category.status === "1" ? "Active" : "Inactive"}
                        </>
                      )}
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
};

export default Category;
