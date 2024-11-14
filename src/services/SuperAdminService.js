import requests from "./httpRequest";

const Superadminservice = {
    getAllAdmins: async () => requests.get("/admin/list"), // API to list admins
    toggleStatus: async (id) => requests.put(`/admin/${id}/toggle-status`), // API for toggling admin status
    registerAdmin: async (adminData) => requests.post("/admin/register", adminData), // API for Create Admin

    // Alternative code for Create Admin
    // registerAdmin: async (data) => {
    //     return requests.post("/admin/register", data);
    // },

    deleteAdmin: async (id) => requests.delete(`/admin/${id}`), // Delete Admin API

    updateAdmin: async (id, data) => requests.put(`/admin/${id}`, data) // Update Admin API
};

export default Superadminservice;
