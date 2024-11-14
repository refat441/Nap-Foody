import requests from "./httpRequest";


const Superadminservice = {
    getAllAdmins: async()=> requests.get("/admin/list"),
    toggleStatus:async(id)=>requests.put(`/admin/${id}/toggle-status`),
    registerAdmin: async (adminData) => requests.post("/admin/register", adminData), // Correct function name
    // altarnative code for registerAdmin
    // registerAdmin: async (data) => {
    //     return requests.post("/admin/register", data);
    //   },
}


export default Superadminservice;