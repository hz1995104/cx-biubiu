import React, { useEffect } from "react";

export interface AccidentProps {}

const Accident: React.FC<AccidentProps> = () => {
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
      意外
    </div>
  );
};

export default Accident;
