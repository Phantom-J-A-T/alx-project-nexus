import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api', // Your Django API URL
});

export const fetchJobs = (params: any) => API.get('/jobs/', { params });
export const applyForJob = (data: any) => API.post('/applications/', data);