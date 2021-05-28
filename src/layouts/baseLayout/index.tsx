import React, { useState, useEffect, Fragment } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { useHistory } from "react-router-dom";

interface Props extends RouteConfigComponentProps {}

const BaseLayout: React.FC<Props> = (props) => {
  const { route, location } = props;
  const history = useHistory();

  if (location.pathname === "/") {
    history.push("/home/test");
  }
  return <Fragment>{renderRoutes(route?.routes)}</Fragment>;
};

export default BaseLayout;
