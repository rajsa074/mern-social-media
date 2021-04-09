import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";

import AdminDashboard from "./pages/adminDashboard";

function App() {
  const { auth, status, modal, userType } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);


  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
    }
  }, [dispatch, auth.token]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {userType === "user" && auth.token && <Header />}
          {status && <StatusModal />}
          <Route
            exact
            path="/"
            component={
              userType === "user"
                ? auth.token
                  ? Home
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />

          {userType === "user" && (
            <>
              <Route exact path="/register" component={Register} />
              <div className="wrap_page">
                <PrivateRouter exact path="/:page" component={PageRender} />
                <PrivateRouter exact path="/:page/:id" component={PageRender} />
              </div>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
