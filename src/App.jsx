import NavBar from "./components/NavBar";
import "./App.scss";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PasswordContextProvider from "./context/PasswordContext";
import LoginRequired from "./middleware/LoginRequired";
import Edit from "./components/Passes/EditPass";
import Delete from "./components/Passes/DeletePass";
import PasswordList from "./components/Passes/PasswordList";
import AddPass from "./components/Passes/AddPass";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Router>
      <NavBar />
      <PasswordContextProvider>
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
      </PasswordContextProvider>

      {/* https://stackoverflow.com/questions/50155909/how-to-use-context-api-with-react-router-v4 */}

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
  );
}

export default App;
