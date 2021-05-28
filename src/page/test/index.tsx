import * as React from "react";
import { useState, useEffect } from "react";
import "./index.less";
import { Button, Typography } from "antd";
import { useHistory } from "react-router-dom";

export interface Props {}
const { Paragraph } = Typography;

const Test: React.FC<Props> = () => {
  const history = useHistory();

  const Restart = () => {};

  const Next = () => {};

  const Back = () => {};

  return (
    <div className="App">
      <div className="banner">测试</div>
      <div className="stepButton">
        <Button size={"large"} onClick={Restart} type="primary">
          {"RESTART"}
        </Button>
        <Button size={"large"} onClick={Back} type="primary">
          {"BACK"}
        </Button>
        <Button size={"large"} onClick={Next} type="primary">
          {"NEXT"}
        </Button>
        <Button
          shape={"circle"}
          onClick={() => history.push("/menu/music/lovepome")}
        >
          go
        </Button>
      </div>
      <Paragraph
        ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
      ></Paragraph>
    </div>
  );
};

export default Test;
