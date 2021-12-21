import { lazy } from 'react'
import { RouteConfig } from 'react-router-config'
import { book } from './book'
import { music } from './music'
import { templateRoutes } from './template'

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('../layouts/baseLayout/index')),
    routes: [
      {
        path: '/home',
        navigate: false,
        component: lazy(() => import('../layouts/homeLayout/index')),
        routes: [
          {
            path: '/home/test',
            exact: true,
            component: lazy(() => import('../page/test/index'))
          },
          {
            path: '/*',
            name: '404',
            exact: true,
            component: lazy(() => import('../page/not-found/index'))
          }
        ]
      },
      {
        path: '/menu',
        component: lazy(() => import('../layouts/menuLayout/index')),
        routes: [
          ...music,
          ...book,
          ...templateRoutes,
          {
            path: '/*',
            name: '404',
            exact: true,
            component: lazy(() => import('../page/not-found/index'))
          }
        ]
      },
      {
        path: '/*',
        name: '404',
        exact: true,
        component: lazy(() => import('../page/not-found/index'))
      }
    ]
  }
]
