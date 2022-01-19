import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/private/Home";
import Signup from "./pages/public/Signup";
import Login from "./pages/public/Login";
import AuthProvider from "./context/auth";
import PrivateRoute from "./layout/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
