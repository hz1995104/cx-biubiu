import { lazy } from "react";
import { RouteConfig } from "react-router-config";

export const book: RouteConfig[] = [
  {
    path: "/menu/book",
    exact: true,
    navigate: false,
    name: "书籍",
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
];
