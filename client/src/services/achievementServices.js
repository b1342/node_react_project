import axios from 'axios';

const achievementsServiceURL = 'http://localhost:1111/api/achievements/';


const getAchivementsById = async (userId, token) => {
    const achivmentsById = await axios.get(`${achievementsServiceURL}${userId}`, { headers: { Authorization: `Bearer ${token}` } })
    return achivmentsById.data;
};

const createAchivement = async (Data, token) => {
    const create = await axios.post(`${achievementsServiceURL}`, Data, { headers: { Authorization: `Bearer ${token}` } })
    return create.data;
};

const updateAchivement = async (updatedAchivementData, token) => {
    const achivment = await axios.put(`${achievementsServiceURL}`, updatedAchivementData, { headers: { Authorization: `Bearer ${token}` } })
    return achivment
};

const deleteAchivement = async (id, token) => {
    const achivment = await axios.delete(`${achievementsServiceURL}${id}`, { headers: { Authorization: `Bearer ${token}` } })
    return achivment
};

export default {
    getAchivementsById,
    createAchivement,
    updateAchivement,
    deleteAchivement,
};
