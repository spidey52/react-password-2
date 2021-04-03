import React from "react";
// import loading from "../images/loading-arrow.svg";

const Loading = () => {
  return (
    <div style={{ width: "100%", paddingTop: "3rem", textAlign: "center" }}>
      {/* <img width="100px" src={loading} className="rotate" alt="" /> */}

      <svg
        className="rotate"
        version="1.1"
        id="Ebene_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 300 300"
        style={{ enableBackground: "new 0 0 300 300" }}
        // xml:space="preserve"
      >
        <path
          className="st0"
          d="M150,35c63.5,0,115,51.5,115,115s-51.5,115-115,115S35,213.5,35,150c0-27.9,10-53.6,26.5-73.5L34.7,54
    C13.1,80,0,113.5,0,150c0,82.8,67.2,150,150,150s150-67.2,150-150S232.8,0,150,0V35z"
        />
        <path
          className="st1"
          d="M150,0C103.7,0,62.3,21,34.7,54l26.8,22.5C82.6,51.2,114.4,35,150,35V0z"
        />
      </svg>
    </div>
  );
};

export default Loading;
