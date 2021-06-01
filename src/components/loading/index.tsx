import { Spin } from "antd";
import { useMemo } from "react";
import "./index.less";

export function Loading() {
  return useMemo(
    () => (
      <div style={{ textAlign: "center", margin: "200px auto" }}>
        <Spin size="large" />
      </div>
    ),
    []
  );
}
