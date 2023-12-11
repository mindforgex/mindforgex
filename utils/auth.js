import { getUserInfo, saveUserInfo } from "./helpers";
import { get } from "../services/apiService";

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

export const getAndSaveUser = async (publicKey) => {
  const data = getUserInfo();
  const dataStatusUser = await get(`/users/${publicKey}/status`);

  if (!dataStatusUser) return data;

  const updateStatusUser = {
    ...data,
    user: {
      ...data?.user,
      status: dataStatusUser.status,
    },
  };
  saveUserInfo(updateStatusUser);

  return updateStatusUser;
};
