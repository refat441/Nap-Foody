import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Adminservice from "../../services/AdminService";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>; // Optional: show a loading indicator
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
                Price
              </th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-semibold">
                Image
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm ">
                    {product.id}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    {product.name}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm ">
                    {product.price}
                  </td>
                  <td className="px-3 md:px-6 py-2 text-xs md:text-sm">
                    <img
                      src={`https://sunny.napver.com/storage/${product.product_image}`}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded shadow"
                    />
                  </td>
                </tr>
              ))
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
