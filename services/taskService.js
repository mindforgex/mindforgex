import { del, get, post, put } from './apiService';

export const getTasks = async(params)=> await get(`/tasks`, params);
export const getTask = async(taskId)=> await get(`/tasks/${taskId}`);
export const createTask = async(payload) => await post('/tasks', payload);
export const updateTask = async(taskId, payload) => await put(`/tasks/${taskId}`, payload);
export const deleteTask = async(taskId)=> await del(`/tasks/${taskId}`);