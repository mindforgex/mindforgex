import { get, post } from './apiService';

export const getChannels = async(params)=> await get(`/channels`, params);
export const getDetailChannel = async(channelId)=> await get(`/channels/${channelId}`);
export const userVerifyTask = async(taskId, params) => await post(`/tasks/${taskId}/verify`, params);
export const subscribeChannel = async(channelId) => await post(`/channels/${channelId}/subscribe`);
