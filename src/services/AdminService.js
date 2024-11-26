import requests from "./httpRequest";
const Adminservice = {
  showAllCategories: async () => requests.get("/admin/categories"), // API for showing category list
  categorystore: async (categoryData) => requests.post("/admin/categories", categoryData), // API for 
  toggleCategoryStatus: async (id) => requests.put(`/admin/categories/${id}/status`), // API for toggling admin status
};

export default Adminservice;
