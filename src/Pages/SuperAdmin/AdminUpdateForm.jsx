import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Superadminservice from "../../services/SuperadminService";
import { toast } from "react-toastify";

function AdminUpdateForm() {
  const navigate = useNavigate();

  // Initial state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    nid: "",
    admin_image: null, // Image file will be stored here
    address: "",
    status: "0",
    sms_count: "0",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change for image
  const handleImageChange = (e) => {
    setFormData({ ...formData, admin_image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await Superadminservice.registerAdmin(data); // Submit the form data
      if (response && response.message === "Admin registered successfully") {
        toast.success("Admin added successfully!");
        navigate("/"); // Redirect back to SuperDashboard
      }
    } catch (error) {
      toast.error("Error adding admin.");
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Admin</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">NID</label>
          <input
            type="text"
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">
            Admin Image
          </label>
          <input
            type="file"
            name="admin_image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="0">Inactive</option>
            <option value="1">Active</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">SMS Count</label>
          <input
            type="number"
            name="sms_count"
            value={formData.sms_count}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminUpdateForm;

// altarnative code
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Superadminservice from "../../services/SuperadminService";
// import { toast } from "react-toastify";

// function AdminUpdateForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     nid: "",
//     admin_image: null, // This will store the file
//     address: "",
//     status: "0",
//     sms_count: "0",
//     updated_at: new Date().toISOString(),
//     created_at: new Date().toISOString(),
//   });

//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle file input for admin_image
//   const handleFileChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       admin_image: e.target.files[0], // Set file directly
//     }));
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Use FormData to include the file
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("password", formData.password);
//     data.append("phone", formData.phone);
//     data.append("nid", formData.nid);
//     data.append("admin_image", formData.admin_image); // File field
//     data.append("address", formData.address);
//     data.append("status", formData.status);
//     data.append("sms_count", formData.sms_count);
//     data.append("updated_at", formData.updated_at);
//     data.append("created_at", formData.created_at);

//     try {
//       const response = await Superadminservice.registerAdmin(data);
//       if (response && response.message === "Admin registered successfully") {
//         toast.success("Admin added successfully!");
//         navigate("/"); // Redirect to the main page
//       }
//     } catch (error) {
//       toast.error("Error adding admin.");
//       console.error("Error adding admin:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-4">Add New Admin</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//         <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
//         <input type="text" name="nid" placeholder="NID" value={formData.nid} onChange={handleChange} />
//         <input type="file" name="admin_image" onChange={handleFileChange} />
//         <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default AdminUpdateForm;
