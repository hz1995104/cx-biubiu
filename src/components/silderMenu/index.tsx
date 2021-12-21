import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { RouteConfigComponentProps } from 'react-router-config'
import './index.less'
import 'antd/es/menu/style/css'

export interface SilderProps extends RouteConfigComponentProps {
  collapsed: boolean
  menuData: any
}

const { Sider } = Layout
const { SubMenu } = Menu

export const SilderMenu: React.FC<SilderProps> = (props) => {
  const [openKeys, setopenKeys] = useState<string[]>([])
  const [dom, setdom] = useState()

  const {
    collapsed,
    menuData,
    route,
    location: { pathname }
  } = props

  const urlToList = useCallback((url: string) => {
    const urllist = url.split('/').filter((i) => i)
    return urllist.map((_, index) => {
      return `/${urllist.slice(0, index + 1).join('/')}`
    })
  }, [])

  const getSelectedMenuKeys = (pathname: string) => {
    let pathSnippets = urlToList(pathname)
    let res: string[] = []
    pathSnippets.forEach((_url: string) => {
      const url = _url
      let arr: any = route?.routes?.filter((item) => item.path === url)
      if (!arr?.length) {
        return
      }
      res.push(arr[0].path)
    })
    return res
  }

  // 获得菜单节点
  const getNavMenuItems = (menusData: any) => {
    if (!menusData) {
      return []
    }
    return menusData.map((item: any) => {
      const ItemDom = getSubMenuOrItem(item)
      return ItemDom
    })
  }

  // 获取子菜单
  const getSubMenuOrItem = (item: any) => {
    if (item.children && item.children.some((child: any) => child.name)) {
      const childrenItems = getNavMenuItems(item.children)
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            key={item.path}
            icon={item.icon ? React.createElement(item.icon) : null}
            title={item.name}
          >
            {childrenItems}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>
    } else {
      return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>
    }
  }

  useEffect(() => {
    setopenKeys(getSelectedMenuKeys(pathname))
  }, [pathname])

  useEffect(() => {
    setdom(getNavMenuItems(menuData))
  }, [menuData])

  // 获得菜单路径
  const getMenuItemPath = (item: any) => {
    const { path, name } = item
    return (
      <Link to={path}>
        <span>{name}</span>
      </Link>
    )
  }

  const handleOpenChange = (openKeys: any) => {
    if (openKeys.length === 0 || collapsed) return
    const lastOpenKey: any = [openKeys[openKeys.length - 1]]
    setopenKeys(lastOpenKey)
  }

  const menuProps = collapsed ? {} : { openKeys: openKeys }

  return (
    <Sider
      key={'sider'}
      collapsed={collapsed}
      collapsible
      breakpoint="lg"
      className="component-slide-menu"
    >
      <div className={'logo'} key="logo">
        {collapsed ? 'biu' : 'BIU'}
      </div>
      <Menu
        key="Menu"
        mode="inline"
        {...menuProps}
        onOpenChange={handleOpenChange}
        selectedKeys={openKeys}
        theme={'dark'}
      >
        {dom}
      </Menu>
    </Sider>
  )
}
