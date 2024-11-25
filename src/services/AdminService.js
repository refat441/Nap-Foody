import requests from "./httpRequest";

const Adminservice = {
    getAllAdmins: async () => requests.get("/admin/list"), // API to list admins
};

export default Adminservice;
