import { get, post } from "./apiService";

export const getMe = async () => await get(`/users/me`);
