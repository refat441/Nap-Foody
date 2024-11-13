import requests from "./httpRequest";


const Superadminservice = {
    getAllAdmins: async()=> requests.get("/admin/list"),
    toggleStatus:async(id)=>requests.put(`/admin/${id}/toggle-status`),
    registerAdmin: async (adminData) => requests.post("/admin/register", adminData), // Correct function name
}


export default Superadminservice;