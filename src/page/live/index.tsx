import React, { useEffect } from "react";

export interface LiveProps {}

const Live: React.FC<LiveProps> = () => {
  return (
    <div
      style={{
        fontSize: 40,
        color: "#00E5EE",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        fontWeight: 700,
      }}
    >
      活着
    </div>
  );
};

export default Live;
