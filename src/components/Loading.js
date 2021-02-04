import React from "react";
import loading from "../images/loading-arrow.gif";

const Loading = () => {
  return (
    <div style={{ width: "100%", paddingTop: "3rem", textAlign: "center" }}>
      <img src={loading} alt="" />
    </div>
  );
};

export default Loading;
