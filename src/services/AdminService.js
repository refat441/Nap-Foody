import requests from "./httpRequest";
const Adminservice = {
  showAllCategories: async () => requests.get("/admin/categories"), // API for showing category list
  categorystore: async (categoryData) => requests.post("/admin/categories", categoryData), // API for 
};

export default Adminservice;
