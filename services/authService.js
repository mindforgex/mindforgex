import axios from "axios";
import { post } from "./apiService";

export const connectToDiscord = (data) => post('/users/sns/discord/connect', data)
export const connectToTwitch = (data) => post('/users/sns/twitch/connect', data)

export const getTwitchUserProfile = async (accessToken) => {
  const { data: { data: users } } = await axios.get(`https://api.twitch.tv/helix/users`, {
    headers: {
      'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
    }
  });
  const [user] = users;
  return user;
}

export const disconnectSNS = (sns) => post(`/users/sns/disconnect`, { sns });