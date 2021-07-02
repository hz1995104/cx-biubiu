import React, {
  useState,
  useEffect,
  Fragment,
  Suspense,
  useCallback,
} from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { RouteConfig } from "react-router-config";
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

  const onCollapse = useCallback(
    (collapsed: boolean) => {
      setcollapsed(collapsed);
    },
    [collapsed]
  );

  const getPath = () => {
    let pathSnippets: string[] = history.location.pathname
      .split("/")
      .filter((i) => i);
    let extraBreadcrumbRouteArr: any = pathSnippets
      .map((_: any, index: any) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        let arr = route?.routes?.filter((item) => item.path === url);
        if (!arr?.length) {
          return null;
        }
        return arr[0];
      })
      .filter((i) => i);

    let extraBreadcrumbItems = extraBreadcrumbRouteArr.map((v: RouteConfig) => (
      <Breadcrumb.Item key={v.path as string}>
        {v.navigate === false ? (
          v.name
        ) : (
          <Link to={v.path as string}>{v.name}</Link>
        )}
      </Breadcrumb.Item>
    ));
    setextraBreadcrumbItems(extraBreadcrumbItems);
  };

  useEffect(() => {
    getPath();
  }, [pathname]);

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
