import NavBar from "./components/NavBar";
import "./App.scss";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginRequired from "./middleware/LoginRequired";
import Edit from "./components/Passes/EditPass";
import Delete from "./components/Passes/DeletePass";
import PasswordList from "./components/Passes/PasswordList";
import AddPass from "./components/Passes/AddPass";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

const queryClient = new QueryClient()

function App() {

  const { theme } = useSelector(state => state.ui);

  const mytheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: theme,
      }
    });
  }, [theme])

  return (

    <ThemeProvider theme={mytheme}>
      <CssBaseline />


      <QueryClientProvider client={queryClient}>
        <ToastContainer theme="colored" />

        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <LoginRequired>
                <PasswordList />
              </LoginRequired>
            </Route>

            <Route exact path="/passes">
              <LoginRequired>
                <PasswordList />
              </LoginRequired>
            </Route>

            <Route path="/passes/add">
              <LoginRequired>
                <AddPass />
              </LoginRequired>
            </Route>

            <Route
              exact
              path="/passes/edit/:id"
              render={(props) => (
                <LoginRequired>
                  <Edit {...props} />
                </LoginRequired>
              )}
            />

            <Route
              exact
              path="/passes/delete/:id"
              render={(props) => (
                <LoginRequired>
                  <Delete {...props} />
                </LoginRequired>
              )}
            />
          </Switch>

          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/forget-password">
              <ForgotPassword />
            </Route>



            <Route path="/some">
              <h1>dekho kya hota hai </h1>
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
