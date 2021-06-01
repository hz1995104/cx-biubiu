import React from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { Switch, useHistory } from "react-router-dom";

interface Props extends RouteConfigComponentProps {}

const BaseLayout: React.FC<Props> = (props) => {
  const { route, location } = props;
  const history = useHistory();

  if (location.pathname === "/") {
    history.push("/home/test");
  }
  return <Switch>{renderRoutes(route?.routes)}</Switch>;
};

export default BaseLayout;
