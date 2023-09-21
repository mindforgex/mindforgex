import { get } from './apiService';

export const getChannels = async(params)=> await get(`/channels`, params);
export const getDetailChannel = async(channelId)=> await get(`/channels/${channelId}`);
