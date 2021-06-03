import { lazy } from "react";
import { RouteConfig } from "react-router-config";

export const templateRoutes: RouteConfig[] = [
  {
    path: "/menu/template",
    exact: true,
    navigate: false,
    name: "模版",
  },
  {
    path: "/menu/template/baseTable",
    name: "基础表格",
    exact: true,
    component: lazy(() => import("../page/baseTable/index")),
  },
  
];
