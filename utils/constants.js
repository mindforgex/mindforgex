export const STORAGE = {
  ACCESS_TOKEN: 'access_token',
  USER_INFO: 'user_info'
}

export const NAV_BAR_ITEM = [
  {
    label: "menu.channel",
    path: "",
  },
  {
    label: "menu.my_inventory",
    path: "my-inventory",
    children: [
      {
        label: "menu.collection",
        path: "/collection",    
      },
      {
        label: "menu.reward",
        path: "/reward",
      }
    ]
  },
  {
    label: "menu.profile",
    path: "profile"
  },
  {
    label: "menu.marketplace",
    path: "marketplace"
  }
]


export const TASK_TYPE = {
  SUBSCRIBE_WEB3_CHANNEL: 'SUBSCRIBE_WEB3_CHANNEL',
  JOIN_DISCORD: 'JOIN_DISCORD',
  SUBSCRIBE_TWITCH: 'SUBSCRIBE_TWITCH',
  SUBSCRIBE_YOUTUBE: 'SUBSCRIBE_YOUTUBE',
}

export const PAGINATION = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 10,
};

export const USER_TYPE = {
  KOL: "1",
  USER: "2",
};

export const KEY_GET_CHANNELS = "channels";
export const KEY_GET_CHANNEL = "channel";
export const KEY_GET_SCHEDULES = "schedules";
export const KEY_GET_SCHEDULE = "schedule";
export const KEY_GET_TASKS = "tasks";
export const KEY_GET_TASK = "task";
export const KEY_GET_POSTS = "posts";
export const KEY_GET_POST = "post";