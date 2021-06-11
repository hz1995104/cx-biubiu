import { lazy } from "react";
import { RouteConfig } from "react-router-config";

export const music: RouteConfig[] = [
  {
    path: "/menu/music",
    name: "音乐",
    navigate: false,
    exact: true,
  },
  {
    path: "/menu/music/accident",
    name: "意外",
    exact: true,
    component: lazy(() => import("../page/accident/index")),
  },
  {
    path: "/menu/music/lovepome",
    name: "爱的诗",
    exact: true,
    component: lazy(() => import("../page/love-poem/index")),
  },
];
