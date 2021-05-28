import React, { useState, useEffect } from 'react'
import { RouteConfigComponentProps,RouteConfig } from "react-router-config";
import { Menu, Dropdown, Avatar } from 'antd';
import { Switch,Link } from "react-router-dom";
import './index.less'

export interface GlobalHeaderProps extends RouteConfigComponentProps{
    collapsed:boolean
    onCollapse:(collapsed:boolean)=>void
}
 
const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {


    const toggle = () => {
        const { collapsed, onCollapse } = props;
        onCollapse(!collapsed);
      }

      const menu = (
        <Menu selectedKeys={[]} >
          <Menu.Item key="logout"
          >
            <Link to={'/home/test'}>返回首页</Link>
          </Menu.Item>
        </Menu>
      );
    return ( 
        <div className="global-header">
        {/* <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        /> */}
        <div className="global-header-right">
          <Dropdown overlay={menu}>
            <span className={'action account'}>
              <Avatar
                className={'avatar'}
                size="small"
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              />
              <span>cx</span>
            </span>
          </Dropdown>
        </div>

      </div>

     );
}
 
export default GlobalHeader;