import { get, post } from './apiService';

export const getInventory = async (walletAddress, params) => await get(`/nfts/users/${walletAddress}`, params);
export const getUserCollection = async (walletAddress, params) => await get(`/nfts/users/${walletAddress}`, params);
export const getChannelCollection = async (channelId) => await get(`/nfts/channel/${channelId}`);
export const requestExchangeCollection = async (data) => await post(`/nfts/users/request-exchange`, data);
export const confirmExchangeCollection = async (data) => await post(`/nfts/users/confirm-exchange`, data);

export const getRewardHistory = async () => await get(`/rewards/history/users`);