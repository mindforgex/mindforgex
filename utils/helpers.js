import cookie from 'react-cookies'
import { STORAGE } from './constants';

export const numberFormatter = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const getUserInfo = () => {
  const userInfo = cookie.load(STORAGE.USER_INFO)
  const accessToken = cookie.load(STORAGE.ACCESS_TOKEN)
  if (userInfo && accessToken) {
    return {
      user: cookie.load(STORAGE.USER_INFO),
      accessToken: cookie.load(STORAGE.ACCESS_TOKEN)
    };
  }

  return undefined;
}

export const saveUserInfo = (data) => {
  cookie.save(STORAGE.USER_INFO, JSON.stringify(data.user))
  cookie.save(STORAGE.ACCESS_TOKEN, data.accessToken)
}

export const clearUserInfo = () => {
  cookie.remove(STORAGE.USER_INFO)
  cookie.remove(STORAGE.ACCESS_TOKEN)
}