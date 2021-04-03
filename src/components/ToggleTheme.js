import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ToggleTheme = () => {
  const context = useContext(ThemeContext);
  return <button onClick={context.toggleTheme}>Toggle Theme</button>;
};

export default ToggleTheme;
