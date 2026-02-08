import axios from 'axios';
import type { Job, ApplicationData } from '../types';

const API = axios.create({
    baseURL: 'http://localhost:8000/api', // Your Django API URL
});

export const fetchJobs = (params: Record<string, string | number>) => API.get<Job[]>('/jobs/', { params });
export const applyForJob = (data: ApplicationData) => API.post('/applications/', data);