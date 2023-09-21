import { numberFormatter } from "./helpers";
import moment from 'moment'

export const MOCK_DETAIL_PROFILE_DATA = {
  id: 1,
  image: "/assets/team-wolves-300x300.png",
  name: "Wolves",
  href: "/channel/1",
  metadata: [
    {
      key: "Country",
      value: "Andorra",
    },
    {
      key: "Founded",
      value: moment().format("MMMM Do YYYY"),
    },
    {
      key: "Main Game",
      value: "PlayerUnknown's Battlegrounds",
    },
    {
      key: "Followers",
      value: numberFormatter(20000000),
    },
    {
      key: "Youtube followers",
      value: numberFormatter(200000000),
    },
    {
      key: "Twitch followers",
      value: numberFormatter(20000000),
    }
  ],
  description: `Saw fowl waters won’t, fruitful were blessed yielding Called
  created isn’t in evening, have multiply heaven under. Itself had
  us male face saw own, above land bearing bring after very were
  called female called him herb Our he greater that. Void spirit
  made make midst their saying form set whales firmament seas open,
  fill.\n\n\n
  From moved two moved open evening hath. Firmament midst green
  doesn’t great. So void sixth sixth days seasons a you’ll make one
  that us isn’t land after subdue open under shall unto gathering
  likeness over earth lesser place. Fill them they’re upon unto
  behold open. Gathered thing seasons own, so over may two from
  years is. Fifth, brought. Subdue over sixth blessed Divide midst.
  His. Lights moved. Whales yielding good given. Seed all give
  darkness creepeth divided, creeping. Creeping upon open let
  beginning.`
}

export const MOCK_PROFILE_DATA = [
  {
    id: 1,
    image: "/assets/team-wolves-300x300.png",
    name: "Wolves",
    href: "/channel/1",
    metadata: [
      {
        key: "Country",
        value: "Andorra",
      },
      {
        key: "Founded",
        value: moment().format("MMMM Do YYYY"),
      },
      {
        key: "Main Game",
        value: "PlayerUnknown's Battlegrounds",
      },
      {
        key: "Youtube followers",
        value: numberFormatter(200000000),
      },
      {
        key: "Twitch followers",
        value: numberFormatter(20000000),
      }
    ]
  },
  {
    image: "/assets/team-wolves-300x300.png",
    name: "Wolves",
    href: "/channel/1",
    metadata: [
      {
        key: "Country",
        value: "Andorra",
      },
      {
        key: "Founded",
        value: moment().format("MMMM Do YYYY"),
      },
      {
        key: "Main Game",
        value: "PlayerUnknown's Battlegrounds",
      },
      {
        key: "Youtube followers",
        value: numberFormatter(200000000),
      },
      {
        key: "Twitch followers",
        value: numberFormatter(20000000),
      }
    ]
  },
  {
    image: "/assets/team-wolves-300x300.png",
    name: "Wolves",
    href: "/channel/1",
    metadata: [
      {
        key: "Country",
        value: "Andorra",
      },
      {
        key: "Founded",
        value: moment().format("MMMM Do YYYY"),
      },
      {
        key: "Main Game",
        value: "PlayerUnknown's Battlegrounds",
      },
      {
        key: "Youtube followers",
        value: numberFormatter(200000000),
      },
      {
        key: "Twitch followers",
        value: numberFormatter(20000000),
      }
    ]
  },
  {
    image: "/assets/team-wolves-300x300.png",
    name: "Wolves",
    href: "/channel/1",
    metadata: [
      {
        key: "Country",
        value: "Andorra",
      },
      {
        key: "Founded",
        value: moment().format("MMMM Do YYYY"),
      },
      {
        key: "Main Game",
        value: "PlayerUnknown's Battlegrounds",
      },
      {
        key: "Youtube followers",
        value: numberFormatter(200000000),
      },
      {
        key: "Twitch followers",
        value: numberFormatter(20000000),
      }
    ]
  },
  {
    image: "/assets/team-wolves-300x300.png",
    name: "Wolves",
    href: "/channel/1",
    metadata: [
      {
        key: "Country",
        value: "Andorra",
      },
      {
        key: "Founded",
        value: moment().format("MMMM Do YYYY"),
      },
      {
        key: "Main Game",
        value: "PlayerUnknown's Battlegrounds",
      },
      {
        key: "Youtube followers",
        value: numberFormatter(200000000),
      },
      {
        key: "Twitch followers",
        value: numberFormatter(20000000),
      }
    ]
  },
  {
    image: "/assets/team-wolves-300x300.png",
    name: "Wolves",
    href: "/channel/1",
    metadata: [
      {
        key: "Country",
        value: "Andorra",
      },
      {
        key: "Founded",
        value: moment().format("MMMM Do YYYY"),
      },
      {
        key: "Main Game",
        value: "PlayerUnknown's Battlegrounds",
      },
      {
        key: "Youtube followers",
        value: numberFormatter(200000000),
      },
      {
        key: "Twitch followers",
        value: numberFormatter(20000000),
      }
    ]
  },
]

export const MOCK_NEW_DATA = [
  {
    id: Math.random().toString(),
    image: "/assets/post-41.jpg",
    title: "Lesser years third in you're rule",
    createdAt: "September 12, 2019",
    href: "/news/id"
  },
  {
    id: Math.random().toString(),
    image: "/assets/post-41.jpg",
    title: "Lesser years third in you're rule",
    createdAt: "September 12, 2019",
    href: "/news/id"
  },
  {
    id: Math.random().toString(),
    image: "/assets/post-41.jpg",
    title: "Lesser years third in you're rule",
    createdAt: "September 12, 2019",
    href: "/news/id"
  },
  {
    id: Math.random().toString(),
    image: "/assets/post-41.jpg",
    title: "Lesser years third in you're rule",
    createdAt: "September 12, 2019",
    href: "/news/id"
  },
  {
    id: Math.random().toString(),
    image: "/assets/post-41.jpg",
    title: "Lesser years third in you're rule",
    createdAt: "September 12, 2019",
    href: "/news/id"
  }
]

export const MOCK_COLLECTION_DATA = [
  {
    name: "COLLECTION 1",
    image: "/assets/game.svg"
  },
  {
    name: "COLLECTION 1",
    image: "/assets/game.svg"
  },
  {
    name: "COLLECTION 1",
    image: "/assets/game.svg"
  },
  {
    name: "COLLECTION 1",
    image: "/assets/game.svg"
  },
  {
    name: "COLLECTION 1",
    image: "/assets/game.svg"
  },
  {
    name: "COLLECTION 1",
    image: "/assets/game.svg"
  }
]

export const MOCK_DATA_POST = [
  {
    id: 1,
    image: "/assets/team-im-waiting-300x300.png",
    participants: "100",
    nftMinted: "123",
    createdAt: moment().format("DD/MM/YYYY")
  }
]