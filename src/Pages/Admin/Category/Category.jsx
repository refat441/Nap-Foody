import React, { useEffect, useState } from "react";
import Adminservice from "../../../services/AdminService"; // Adjust the path as needed
import { toast } from "react-hot-toast"; // For notifications (optional)
import { FiEdit } from "react-icons/fi";

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
  //togol status end

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const formData = new FormData();
    formData.append("name", selectedCategory.name);
    if (selectedCategory.img instanceof File) {
      formData.append("img", selectedCategory.img); // Append file only if it's a new file
    }

    Adminservice.updateCategory(selectedCategory.id, formData)
      .then(() => {
        alert("Category updated successfully.");
        document.getElementById("category_modal").close();
        setImagePreview(null);
        // Reload categories here if needed
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        alert("Failed to update category. Please try again.");
      });
  };

  if (loading) return <p>refat...</p>;

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="mb-4 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-violet-700">
          Category List
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
                Status
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Image
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Created At
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {categories.map((category) => {
              const isActive = category.status === "1";
              return (
                <tr
                  key={category.id}
                  className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {category.id}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {category.name}
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
                    <img
                      src={`https://sunny.napver.com/public/storage/${category.category_image}`}
                      alt={category.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {new Date(category.created_at).toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-xs md:text-sm flex items-center space-x-2 sm:space-x-3">
                    <button
                      disabled={toggleStatusLoading === category.id}
                      onClick={() =>
                        toggleCategoryStatus(category.id, category.status)
                      }
                      className={`flex items-center justify-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
                        category.status === "1"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {toggleStatusLoading === category.id ? (
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
                              category.status === "1"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {category.status === "1" ? "Active" : "Inactive"}
                        </>
                      )}
                    </button>
                    <button
                      className="p-1 sm:p-2 rounded-full bg-violet-600 text-white hover:bg-violet-900 transition duration-200"
                      title="Update Category"
                      onClick={() => {
                        setSelectedCategory(category);
                        setImagePreview(category.img);
                        document.getElementById("category_modal").showModal();
                      }}
                    >
                      <FiEdit className="text-sm sm:text-xl" />
                    </button>
                    <dialog
                      id="category_modal"
                      className="modal bg-transparent"
                    >
                      <div className="modal-box w-full max-w-xs sm:max-w-md lg:max-w-4xl bg-zinc-300 shadow-lg rounded-lg">
                        <h3 className="font-bold text-lg sm:text-2xl mb-4 text-center text-black">
                          Update Category
                        </h3>
                        <form
                          onSubmit={handleUpdateSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-black">
                              Category Name
                            </label>
                            <input
                              type="text"
                              value={selectedCategory?.name || ""}
                              onChange={(e) =>
                                setSelectedCategory({
                                  ...selectedCategory,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Enter category name"
                              className="input input-bordered w-full text-gray-800 bg-white bg-opacity-80"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-black">
                              Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                setSelectedCategory({
                                  ...selectedCategory,
                                  img: file,
                                });
                                setImagePreview(URL.createObjectURL(file));
                              }}
                              className="file-input file-input-bordered w-full text-gray-800 bg-white bg-opacity-80"
                            />
                            {imagePreview && (
                              <img
                                src={imagePreview}
                                alt="Category Preview"
                                className="mt-4 h-24 sm:h-32 w-24 sm:w-32 object-cover rounded-lg border border-gray-300"
                              />
                            )}
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary w-full sm:w-auto px-4 sm:px-6 py-2 text-white bg-violet-600 hover:bg-violet-800 transition duration-200 rounded-md"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                        <div className="modal-action">
                          <button
                            className="btn text-gray-200"
                            onClick={() => {
                              document.getElementById("category_modal").close();
                              setImagePreview(null);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </dialog>
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
