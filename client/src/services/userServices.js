import axios from 'axios';

const usersServiceURL = 'http://localhost:1111/api/user/';


const getUsersByType = async (type,token) => {
    console.log(type)
    const users=await axios.get(`${usersServiceURL}${type}`,{headers:{Authorization:`Bearer ${token}`}})
    console.log(users.data);   
    return users.data;
};

const createUser = async (token,Data,role) => {
    console.log(Data)
    console.log(token)
    console.log(role)
    const create=await axios.post('http://localhost:1111/api/auth/register',Data,{headers:{Authorization:`Bearer ${token}`}})
    return create.data;
};


const updateUser = async (token,updatedUserData) => { 
    console.log(`updatedUserData`, updatedUserData, token);
    const user=await axios.put (`${usersServiceURL}`,updatedUserData,{headers:{Authorization:`Bearer ${token}`}})
    return user
};

const deleteUser = async (_id,token) => {
    const user=await axios.delete (`${usersServiceURL}${_id}`,{headers:{Authorization:`Bearer ${token}`}})
    return user
};


export default {
    getUsersByType,
    createUser,
    updateUser,
    deleteUser,
};