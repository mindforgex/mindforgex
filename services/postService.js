import { get } from './apiService';

export const getPosts = async (params) => await get(`/posts`, params);
