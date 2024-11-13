import requests from "./httpRequest";

const Superadminservice = {
    getAllAdmins: async()=> requests.get("/admin/list"),
    toggleStatus:async(id)=>requests.put(`/admin/${id}/toggle-status`)   
}


export default Superadminservice;