import React, { useContext } from 'react'
import { RouteConfigComponentProps } from 'react-router-config'
import { Menu, Dropdown, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { UserContext } from '../../stores'
import './index.less'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import pic_one from '@/static/pic_one.jpg'
/* eslint-disable */
export interface GlobalHeaderProps extends RouteConfigComponentProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const { user } = useContext(UserContext)
  const { collapsed, onCollapse } = props

  const toggle = () => {
    onCollapse(!collapsed)
  }

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <Link to={'/home/test'}>返回首页</Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="global-header">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle
      })}
      <div className="global-header-right">
        <Dropdown overlay={menu}>
          <span className={'action account'}>
            <Avatar className={'avatar'} src={pic_one} />
            <span>{user.name}</span>
          </span>
        </Dropdown>
      </div>
    </div>
  )
}
