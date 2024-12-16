import requests from "./httpRequest";
const Adminservice = {
  //routs for category
  showAllCategories: async () => requests.get("/admin/categories"), // API for showing category list
  categorystore: async (categoryData) => requests.post("/admin/categories", categoryData), // API for 
  toggleCategoryStatus: async (id) => requests.put(`/admin/categories/${id}/status`), // API for toggling admin status
  updateCategory: async (id, formData) =>
    requests.put(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  //routs for product
  showAllProducts: async () => requests.get("/admin/products"), // API for showing category list
  toggleProductStatus: async (id) => requests.put(`/admin/products/${id}/status`), // API for toggling admin status

  //routs for branches
  showAllBranches: async () => requests.get("/admin/branches"), // API for showing branches list

  //routs for Satff
  showAllStaff: async () => requests.get("/admin/staff"), // API for showing staff list
  toggleStaffStatus: async (id) => requests.put(`/admin/staff/status/${id}`), // API for toggling admin status
    
  
};

export default Adminservice;
