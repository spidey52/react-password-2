import React from "react";
import "./toast.css";

const Toast = ({ visible, message }) => {
  return (
    <>
      <div className={visible ? "hello" : "hello hidden"}>
        <h2>{message}</h2>
      </div>
    </>
  );
};

export default Toast;
