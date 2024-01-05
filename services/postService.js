import { del, get, post, put } from './apiService';

export const getPosts = async (params) => await get(`/posts`, params);
export const getPost = async(postId)=> await get(`/posts/${postId}`);
export const createPost = async(payload) => await post('/posts', payload);
export const updatePost = async(postId, payload) => await put(`/posts/${postId}`, payload);
export const deletePost = async(postId)=> await del(`/posts/${postId}`);
export const react = async(postId) => await post(`/posts/${postId}/react`);
export const claimNFT = async (postId, params) => await post(`/posts/${postId}/nft/claim`, params);