import { del, get, post, put } from './apiService';

export const getComments = async(params)=> await get(`/comments`, params);
export const getComment = async(commentId)=> await get(`/comments/${commentId}`);
export const createComment = async(payload) => await post('/comments', payload);
export const updateComment = async(commentId, payload) => await put(`/comments/${commentId}`, payload);
export const deleteComment = async(commentId)=> await del(`/comments/${commentId}`);