import { post } from "./apiService";

export const connectToDiscord = (data) => post('/users/sns/discord/connect', data)