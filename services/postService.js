import { get, post } from './apiService';

export const getPosts = async (params) => await get(`/posts`, params);
export const claimNFT = async (postId, params) => await post(`/posts/${postId}/nft/claim`, params);