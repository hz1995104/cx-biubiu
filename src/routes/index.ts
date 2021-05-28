import { lazy } from "react";
import { RouteConfig } from "react-router-config";

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: lazy(() => import("../layouts/baseLayout/index")),
    routes: [
      {
        path: "/home",
        navigate: false,
        component: lazy(() => import("../layouts/homeLayout/index")),
        routes: [
          {
            path: "/home/test",
            exact: true,
            component: lazy(() => import("../page/test/index")),
          },
        ],
      },
      {
        path: "/menu",
        component: lazy(() => import("../layouts/menuLayout/index")),
        routes: [
          {
            path: "/menu/book",
            exact: true,
            navigate: false,
            name: "书籍",
            components: null,
          },
          {
            path: "/menu/book/live",
            name: "活着",
            exact: true,
            component: lazy(() => import("../page/live/index")),
          },
          {
            path: "/menu/book/town",
            name: "围城",
            exact: true,
            component: lazy(() => import("../page/town-besieged/index")),
          },
          {
            path: "/menu/music",
            name: "音乐",
            navigate: false,
            exact: true,
            components: null,
          },
          {
            path: "/menu/music/accident",
            name: "意外",
            exact: true,
            component: lazy(() => import("../page/accident/index")),
          },
          {
            path: "/menu/music/lovepome",
            name: "爱诗",
            exact: true,
            component: lazy(() => import("../page/love-poem/index")),
          },
        ],
      },
    ],
  },
];
