// daveningTimesService.js
import axios from 'axios';
import { baseURL } from '../App';

const davening_times_URL = `${baseURL}davening-times`;

const getDaveningTimes = async () => {
  try {
    const response = await axios.get(davening_times_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching davening times:', error);
    throw error;
  }
};

const addDaveningTime = async (newTime) => {
  try {
    const response = await axios.post(davening_times_URL, newTime);
    return response.data;
  } catch (error) {
    console.error('Error adding davening time:', error);
    throw error;
  }
};

const updateDaveningTime = async (id, updatedTime) => {
  try {
    const response = await axios.put(`${davening_times_URL}/${id}`, updatedTime);
    return response.data;
  } catch (error) {
    console.error('Error updating davening time:', error);
    throw error;
  }
};

const deleteDaveningTime = async (id) => {
  try {
    const response = await axios.delete(`${davening_times_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting davening time:', error);
    throw error;
  }
};

export default {
  get: getDaveningTimes,
  post: addDaveningTime,
  put: updateDaveningTime,
  delete: deleteDaveningTime,
};
   