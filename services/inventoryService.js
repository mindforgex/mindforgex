import { get } from './apiService';

export const getInventory = async (walletAddress, params) => await get(`/nfts/users/${walletAddress}`, params);