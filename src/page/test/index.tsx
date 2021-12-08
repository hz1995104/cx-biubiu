import * as React from "react";
import "@/page/test/index.less";
import { Button, Descriptions, Statistic } from "antd";
import { useHistory } from "react-router-dom";

export interface Props {}

const Test: React.FC<Props> = () => {
  const history = useHistory();

  const Restart = () => {};

  const Next = () => {};

  const Back = () => {};

  return (
    <div className="App">
      <div className="banner">
        BIUBIU
        <Button
          shape={"circle"}
          onClick={() => history.push("/menu/template/baseTable")}
        >
          GO
        </Button>
      </div>
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
      </div>
      <Statistic value={22222.878732} precision={2} />
    </div>
  );
};

export default Test;
