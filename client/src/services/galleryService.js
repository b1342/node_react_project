import axios from "axios";
const BASE_URL = 'http://localhost:1111/api/gallery'; 
// פונקציה לקבלת כל התמונות מהגלריה
const getAllGallery = async (token) => {
        const gallery=await axios.get(`${BASE_URL}/`,{headers:{Authorization:`Bearer ${token}`}})
        return gallery.data;
};

// פונקציה לקבלת תמונות גלריה מסוג מסוים
const getSpecificGallery = async (type, token) => {
        console.log("dsfff");
        const gallery=await axios.get(`${BASE_URL}/${type}`,{headers:{Authorization:`Bearer ${token}`}})
        console.log("dsfff");
        console.log(gallery.data);
        return gallery.data;
};

const getSpecificPublicGallery = async (type) => {
        const gallery=await axios.get(`${BASE_URL}/public/${type}`)
        return gallery.data;
};

const createNewGalleryItem = async (Data, token) => {
    const create=await axios.post(`${BASE_URL}/`,Data,{headers:{Authorization:`Bearer ${token}`}})
    return create.data;
};

const changeImageStatus = async (_id, status, token) => {

     const image = await axios.put(`${BASE_URL}/status`,{_id,status},{headers:{Authorization:`Bearer ${token}`}})
};

const changeImagePublicStatus = async (_id, ispublic, token) => {
    
         const image = await axios.put(`${BASE_URL}/public/`,{_id,ispublic},{headers:{Authorization:`Bearer ${token}`}})
};

// פונקציה למחיקת תמונה מהגלריה
const deleteImageFromGallery = async (_id, token) => {
    const image = await axios.delete(`${BASE_URL}/`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { _id }
    });
    return image.data;
};

// ייצוא כל הפונקציות כ-Named Exports
 export default {
    getSpecificPublicGallery,
    getAllGallery,
    getSpecificGallery,
    createNewGalleryItem,
    changeImageStatus,
    changeImagePublicStatus,
    deleteImageFromGallery,
};