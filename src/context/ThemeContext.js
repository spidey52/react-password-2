import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();
const ThemeContextProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [light] = useState({ syntax: "#555", ui: "#ddd", bg: "#eee" });
  const [dark] = useState({ syntax: "#ddd", ui: "#333", bg: "#555" });

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    localStorage.setItem("theme", JSON.stringify(!isLightTheme));
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsLightTheme(JSON.parse(theme));
  }, []);

  return (
    <ThemeContext.Provider value={{ isLightTheme, light, dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

// class ThemeContextProvider extends Component {
//   state = {
//     isLightTheme: true,
//     light: {
//       syntax: "#555",
//       ui: "#ddd",
//       bg: "#eee",
//     },
//     dark: {
//       syntax: "#ddd",
//       ui: "#333",
//       bg: "#555",
//     },
//   };

//   toggleTheme = () => {
//     this.setState({ isLightTheme: !this.state.isLightTheme });
//   };

//   render() {
//     return (
//       <ThemeContext.Provider
//         value={{ ...this.state, toggleTheme: this.toggleTheme }}
//       >
//         {this.props.children}
//       </ThemeContext.Provider>
//     );
//   }
// }
