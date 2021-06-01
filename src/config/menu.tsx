import { SoundOutlined, ReadOutlined } from "@ant-design/icons";

export default [
  {
    name: "书籍",
    path: "/menu/book",
    icon: <ReadOutlined />,
    children: [
      {
        name: "活着",
        path: "/menu/book/live",
      },
      {
        name: "围城",
        path: "/menu/book/town",
      },
    ],
  },
  {
    name: "音乐",
    path: "/menu/music",
    icon: <SoundOutlined />,
    children: [
      {
        name: "意外",
        path: "/menu/music/accident",
      },
      {
        name: "爱的诗",
        path: "/menu/music/lovepome",
      },
    ],
  },
];
