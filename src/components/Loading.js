import React from "react";
import loading from "../images/loading-arrow.svg";

const Loading = () => {
  return (
    <div style={{ width: "100%", paddingTop: "3rem", textAlign: "center"  }}>
      <img width="100px" src={loading} className="rotate" alt="" />
    </div>
  );
};

export default Loading;
