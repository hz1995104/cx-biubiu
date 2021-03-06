/* eslint-disable */
import { SoundOutlined, ReadOutlined, HeatMapOutlined } from '@ant-design/icons'

export const menuData = [
  {
    name: '书籍',
    path: '/menu/book',
    icon: ReadOutlined,
    children: [
      {
        name: '活着',
        path: '/menu/book/live'
      },
      {
        name: '围城',
        path: '/menu/book/town'
      }
    ]
  },
  {
    name: '音乐',
    path: '/menu/music',
    icon: SoundOutlined,
    children: [
      {
        name: '意外',
        path: '/menu/music/accident'
      },
      {
        name: '爱的诗',
        path: '/menu/music/lovepome'
      }
    ]
  },
  {
    name: '模版',
    path: '/menu/template',
    icon: HeatMapOutlined,
    children: [
      {
        name: '基础表格',
        path: '/menu/template/baseTable'
      }
    ]
  }
]
