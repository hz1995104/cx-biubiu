import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { RouteConfigComponentProps, RouteConfig } from "react-router-config";
import "./index.less";
import {
  MailOutlined,
} from "@ant-design/icons";

export interface SilderProps extends RouteConfigComponentProps {
  collapsed: boolean;
  menuData: any;
  onCollapse?: () => void;
}

const { Sider } = Layout;
const { SubMenu } = Menu;

const SilderMenu: React.FC<SilderProps> = (props) => {
  const [openKey, setopenKey] = useState<string[]>();
  const {
    collapsed,
    menuData,
    onCollapse = () => {},
    route,
    location: { pathname },
  } = props;

  const urlToList = (url: string) => {
    const urllist = url.split("/").filter((i) => i);
    return urllist.map((_, index) => {
      return `/${urllist.slice(0, index + 1).join("/")}`;
    });
  };

  const getSelectedMenuKeys = (pathname: string) => {
    let pathSnippets = urlToList(pathname);

    let res: string[]= [];
    pathSnippets.map((_url: string) => {
      const url = _url;

      let arr:any = route?.routes?.filter((item) => item.path == url);
      if (!arr?.length) {
        return null;
      }
      res.push(arr[0]?.path?.toString());
    });
    return res;
  };

  // 获得菜单节点
  const getNavMenuItems = (menusData: any) => {
    if (!menusData) {
      return [];
    }
    return menusData.map((item: any) => {
      const ItemDom = getSubMenuOrItem(item);
      return ItemDom;
    });
  };
  // 获取子菜单
  const getSubMenuOrItem = (item: any) => {
    if (item.children && item.children.some((child: any) => child.name)) {
      const childrenItems = getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            key={item.path}
            icon={<MailOutlined />}
            title={
              item.icon ? (
                <span>
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>;
    } else {
      return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>;
    }
  };

  // 获得菜单路径
  const getMenuItemPath = (item: any) => {
    const itemPath = item.path;
    if (!itemPath) {
      return item.name;
    }

    const { target, name, icon } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          <span>{name}</span>
        </a>
      );
    }

    return (
      <Link target={target} to={itemPath}>
        <span>{collapsed && icon === "home" ? null : name}</span>
      </Link>
    );
  };

  const handleOpenChange = (openKeys: any) => {
    const lastOpenKey: any = [openKeys[openKeys.length - 1]];

    setopenKey(lastOpenKey);
  };

  let selectedKeys: any = getSelectedMenuKeys(pathname);

  useEffect(() => {
    setopenKey(getSelectedMenuKeys(pathname));
  }, [pathname]);

  return (
    <Sider
      collapsed={collapsed}
      collapsible
      onCollapse={onCollapse}
      breakpoint="lg"
      className="component-slide-menu"
    >
      <div className={"logo"} key="logo">
        {collapsed ? "" : "CX"}
      </div>
      <Menu
        key="Menu"
        mode="inline"
        openKeys={openKey}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={{ padding: "0", width: "100%" }}
        theme={"dark"}
      >
        {getNavMenuItems(menuData)}
      </Menu>
    </Sider>
  );
};

export default SilderMenu;
