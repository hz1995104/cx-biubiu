import React, { Fragment } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

interface Props extends RouteConfigComponentProps {}

const HomeLayout: React.FC<Props> = (props) => {
  const { route } = props;

  return <Fragment>{renderRoutes(route?.routes)}</Fragment>;
};

export default HomeLayout;
