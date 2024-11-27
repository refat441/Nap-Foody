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
    
  
};

export default Adminservice;
