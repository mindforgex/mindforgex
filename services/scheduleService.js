import { del, get, post, put } from './apiService';

export const getSchedules = async(params)=> await get(`/schedules`, params);
export const getSchedule = async(scheduleId)=> await get(`/schedules/${scheduleId}`);
export const createSchedule = async(payload) => await post('/schedules', payload);
export const updateSchedule = async(scheduleId, payload) => await put(`/schedules/${scheduleId}`, payload);
export const deleteSchedule = async(scheduleId)=> await del(`/schedules/${scheduleId}`);