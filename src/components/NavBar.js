import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(UserContext);

  return (
    <nav>
      <div className="nav-brand">PassManager</div>
      <ul>
        <Link to="/">
          <li> Home </li>
        </Link>
        <Link to="/passes">
          <li> passes </li>
        </Link>

        <Link to="/passes/add">
          <li>add </li>
        </Link>

        {isAuthenticated ? (
          <li onClick={logout}>logout</li>
        ) : (
          <Link to="/login">
            <li> login </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

// const NavBar = () => {
//   const themeContext = useContext(ThemeContext);
//   const authContext = useContext(UserContext);

//   const { isLightTheme, light, dark } = themeContext;
//   const theme = isLightTheme ? light : dark;

//   const { isAuthenticated, logout, loading } = authContext;

//   return (
//     <nav style={{ background: theme.ui, color: theme.syntax }}>
//       <h1>Context App</h1>

//       <button onClick={logout}>
//         {isAuthenticated ? loading ? "logging out" : "Logged In" : "Logged out"}
//       </button>
//       <ul>
//         <li>Home</li>
//         <li>About</li>
//         <li>Contact</li>
//       </ul>
//     </nav>
//   );
// };

export default NavBar;
