import requests from "./httpRequest";

const Adminservice = {
    categorystore: async () => requests.post("/admin/categories"), // API to create category
    categorystore: async () => requests.get("/admin/categories"), // API to show category

};

export default Adminservice;
