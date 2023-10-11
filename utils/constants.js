export const STORAGE = {
  ACCESS_TOKEN: 'access_token',
  USER_INFO: 'user_info'
}

export const NAV_BAR_ITEM = [
  {
    label: "Channel",
    path: "",
  },
  {
    label: "My Inventory",
    path: "my-inventory",
    children: [
      {
        label: "Collection",
        path: "/collection",    
      },
      {
        label: "Reward",
        path: "/reward",
      }
    ]
  },
  {
    label: "menu.profile",
    path: "profile"
  }
]
