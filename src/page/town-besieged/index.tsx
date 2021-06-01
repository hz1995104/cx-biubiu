import React, { useEffect } from "react";

export interface TownBesiegedProps {}

const TownBesieged: React.FC<TownBesiegedProps> = () => {
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
      围城
    </div>
  );
};

export default TownBesieged;
