import * as React from "react";
import "@/page/test/index.less";
import { Button, Pagination, Steps, Checkbox, DatePicker } from "antd";
import { useHistory } from "react-router-dom";

export interface Props {}

const Test: React.FC<Props> = () => {
  const history = useHistory();

  const Restart = () => {
    var name = "a";

    const sayHi = () => {
      const name = 'b'
  
      //@ts-ignore
      console.log("Hello,", this.name);
    };
    
    const person = {
      name: "YvetteLau",
      sayHi: sayHi,
    };
    
    person.sayHi();
  };

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
      <DatePicker renderExtraFooter={() => <div>1</div>} mode={"date"} />
    </div>
  );
};

export default Test;
