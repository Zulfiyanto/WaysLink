import { Switch, Route, useHistory } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import GlobalStyle from "./GlobalStyle";
import { Home } from "./pages/Home";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/User";
import { API, setAuthToken } from "./config/Api";
import { CreateLink } from "./pages/CreateLink";
import { Profile } from "./pages/Profile";
import { MyLink } from "./pages/MyLink";
import { Mockup } from "./pages/Mockup";

function App() {
  // init token on axios every time the app is refreshed
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    // Redirect Auth
    if (!state.isLogin) {
      history.push("/");
    } else {
      history.push("/home");
    }
  }, [state]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");

        // If the token incorrect
        if (response.status === 401) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }

        // Get user data
        let payload = response.data.data.user;

        // Get token from local storage
        payload.token = localStorage.token;

        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/mylink" component={MyLink} />
        <Route path="/home/create-link" component={Home} />
        <Route path="/mockup/:name/:unique" component={Mockup} />
      </Switch>
    </div>
  );
}

export default App;
