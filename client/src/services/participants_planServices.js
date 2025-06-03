import axios from 'axios';

const participantsServiceURL = 'http://localhost:1111/api/participants/';

// קבלת כל ההשתתפויות של סטודנט לפי userId
const getAllByStudentId = async (userId, token) => {
    const res = await axios.get(`${participantsServiceURL}${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// קבלת כל ההשתתפויות של תכנית לפי planId
const getAllByPlanId = async (planId, token) => {
    const res = await axios.get(`${participantsServiceURL}getbyplan/${planId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// יצירת משתתף חדש
const createParticipant = async (data, token) => {
    const res = await axios.post(participantsServiceURL, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// העלאת ניקוד
const updateUpScore = async (data, token) => {
    const res = await axios.put(`${participantsServiceURL}up/`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// הורדת ניקוד
const updateDownScore = async (data, token) => {
    const res = await axios.put(`${participantsServiceURL}down/`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// מחיקת משתתף לפי _id
const deleteParticipant = async (_id, token) => {
    const res = await axios.delete(`${participantsServiceURL}${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export default {
    getAllByStudentId,
    getAllByPlanId,
    createParticipant,
    updateUpScore,
    updateDownScore,
    deleteParticipant,
};