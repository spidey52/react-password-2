import React from "react";

const Input = ({ type, placeholder, id, label, value, setValue, required }) => {
  const labelStyle = {
    display: "block",
    textTransform: "capitalize",
    color: "#888",
    fontSize: "1.2rem",
    paddingBottom: "0.3rem",
  };

  const style = {
    paddingTop: "0.3rem",
    paddingBottom: "0.3rem",
    marginTop: "0.4rem",
    marginBottom: "0.4rem",
    width: "100%",
  };

  const inputStyle = {
    padding: "0.4rem",
    fontSize: "1.1rem",
    outline: "none",
    border: "1px solid #888",
    borderRadius: "2px",
    color: "#444",
    width: "100%",
  };

  return (
    <div style={style}>
      <label style={labelStyle} htmlFor="">
        {label}
      </label>
      <input
        style={inputStyle}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        placeholder={placeholder}
        id={id}
      />
    </div>
  );
};

export default Input;
