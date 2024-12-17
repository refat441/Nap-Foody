import requests from "./httpRequest";
const Adminservice = {
  //routs for category
  showAllCategories: async () => requests.get("/admin/categories"), 
  categorystore: async (categoryData) => requests.post("/admin/categories", categoryData), 
  toggleCategoryStatus: async (id) => requests.put(`/admin/categories/${id}/status`), 
  updateCategory: async (id, formData) =>
    requests.put(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteCategory: async (id) => requests.delete(`/admin/categories/${id}`),

  //routs for product
  showAllProducts: async () => requests.get("/admin/products"), 
  toggleProductStatus: async (id) => requests.put(`/admin/products/${id}/status`), 

  //routs for branches
  showAllBranches: async () => requests.get("/admin/branches"), 

  //routs for Satff
  showAllStaff: async () => requests.get("/admin/staff"), 
  toggleStaffStatus: async (id) => requests.put(`/admin/staff/status/${id}`), 
    
};

export default Adminservice;
