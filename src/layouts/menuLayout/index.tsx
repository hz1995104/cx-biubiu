import React, {
  useState,
  useEffect,
  Fragment,
  Suspense,
  useCallback,
} from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { Layout, Breadcrumb, BackTop } from "antd";
import { Link } from "react-router-dom";
import { menuData } from "@/config/menu";
import { SilderMenu } from "@/components";
import { GlobalHeader } from "@/components";
import { Loading } from "@/components";

interface Props extends RouteConfigComponentProps {}

const { Header, Footer, Content } = Layout;

const MenuLayout: React.FC<Props> = (props) => {
  const [collapsed, setcollapsed] = useState(false);
  const [extraBreadcrumbItems, setextraBreadcrumbItems] = useState();

  const {
    route,
    history,
    location: { pathname },
  } = props;

  const onCollapse = (collapsed: boolean) => {
    setcollapsed(collapsed);
  };

  const getPath = useCallback(() => {
    let pathSnippets: string[] = history.location.pathname
      .split("/")
      .filter((i) => i);
    //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
    let extraBreadcrumbItems = pathSnippets.map((_: any, index: any) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      let arr = route?.routes?.filter((item) => item.path === url);
      if (!arr?.length) {
        return null;
      }
      return (
        <Breadcrumb.Item key={url}>
          {arr[0].navigate === false ? (
            arr[0].name
          ) : (
            <Link to={url}>{arr[0].name}</Link>
          )}
        </Breadcrumb.Item>
      );
    }) as any;
    setextraBreadcrumbItems(extraBreadcrumbItems);
  }, [history.location.pathname, route]);

  useEffect(() => {
    getPath();
  }, [pathname, getPath]);

  return (
    <Fragment>
      <Layout style={{ height: "100vh" }}>
        <SilderMenu collapsed={collapsed} menuData={menuData} {...props} />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              collapsed={collapsed}
              onCollapse={onCollapse}
              {...props}
            />
          </Header>
          <Content
            style={{
              padding: "0 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Breadcrumb style={{ margin: "20px" }}>
              {extraBreadcrumbItems}
            </Breadcrumb>
            <div style={{ flex: 1 }}>
              <Suspense fallback={<Loading />}>
                {renderRoutes(route?.routes)}
              </Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }} />
        </Layout>
      </Layout>
      <BackTop />
    </Fragment>
  );
};

export default MenuLayout;
