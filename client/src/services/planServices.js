import axios from 'axios';

const plansServiceURL = 'http://localhost:1111/api/plans/';

const getAllPlans = async (token) => {
    const res = await axios.get(plansServiceURL, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

const getPlanById = async (id, token) => {
    const res = await axios.get(`${plansServiceURL}${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

const createPlan = async (data, token) => {
    const res = await axios.post(plansServiceURL, data, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

const updatePlan = async (data, token) => {
    console.log("data", data);
    console.log("token", token);
    const res = await axios.put(plansServiceURL, data, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

const updateupNumberOfParticipants = async (_id, token) => {
    const res = await axios.put(`${plansServiceURL}up`, { _id }, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

const updatedownNumberOfParticipants = async (_id, token) => {
    const res = await axios.put(`${plansServiceURL}down`, { _id }, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

const deletePlan = async (id, token) => {
    const res = await axios.delete(`${plansServiceURL}${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};

export default {
    getAllPlans,
    getPlanById,
    createPlan,
    updatePlan,
    updateupNumberOfParticipants,
    updatedownNumberOfParticipants,
    deletePlan,
};