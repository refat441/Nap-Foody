import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Adminservice from "../../services/AdminService";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleStatusLoading, setToggleStatusLoading] = useState(null);
  // Fetch products via API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Adminservice.showAllProducts();
        if (response.success) {
          setProducts(response.products);
        } else {
          toast.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //for toggle button
  const toggleProductStatus = async (id, currentStatus) => {
    try {
      setToggleStatusLoading(id); // Start loading indicator

      // Send API request to toggle status
      const response = await Adminservice.toggleProductStatus(id);
      if (response.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id
              ? { ...product, status: currentStatus === "1" ? "0" : "1" } // Toggle status
              : product
          )
        );
        toast.success(
          `Product is now ${
            currentStatus === "1" ? "Inactive" : "Active"
          } successfully!`
        );
      } else {
        toast.error("Failed to toggle product status.");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Error toggling status.");
    } finally {
      setToggleStatusLoading(null); // Stop loading indicator
    }
  };

  // for page loding...
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
          Product
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
                Price
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Image
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.length > 0 ? (
              products.map((product) => {
                const isActive = product.status === "1"; // Determine if product is active
                return (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                  >
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {product.id}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      {product.name}
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
                      {product.price}
                    </td>
                    <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                      <img
                        src={`https://sunny.napver.com/storage/${product.product_image}`}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded shadow"
                      />
                    </td>
                    <td className="px-3 py-4 text-xs md:text-sm flex items-center space-x-2 sm:space-x-3">
                      <button
                        disabled={toggleStatusLoading === product.id}
                        onClick={() =>
                          toggleProductStatus(product.id, product.status)
                        }
                        className={`flex items-center justify-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full shadow-md transition-all duration-300 ${
                          product.status === "1"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {toggleStatusLoading === product.id ? (
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
                                product.status === "1"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            ></span>
                            {product.status === "1" ? "Active" : "Inactive"}
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
