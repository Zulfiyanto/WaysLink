import { Button, Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/User";
import { API, setAuthToken } from "../config/Api";

export const ModalLogin = ({ show, close }) => {
  // State
  const [login, setLogin] = useState({ email: "", password: "" });

  //   Onchange
  const OnChangeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  let history = useHistory();

  const [state, dispatch] = useContext(UserContext);
  //   Function
  const LoginSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Data body
      const body = JSON.stringify(login);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      console.log(response);

      // Checking process

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

      localStorage.setItem("token", response.data.data.user.token);
      setAuthToken(response.data.data.user.token);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Title>Login</Modal.Title>
        <Modal.Body>
          <form onSubmit={LoginSubmit}>
            <div className="input-box">
              <div className="input-email">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={login.email}
                  onChange={OnChangeLogin}
                />
              </div>
              <div className="input-password">
                <input
                  type="password"
                  name="password"
                  id="pass"
                  placeholder="Password"
                  value={login.password}
                  onChange={OnChangeLogin}
                />
              </div>
              <Button className="modal-button" variant="primary" type="submit" onClick={close}>
                Login
              </Button>
              <div className="already-account">
                Already have an account ? Klik
                <span>Here</span>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const ModalRegist = ({ show, close }) => {
  const [regist, setRegist] = useState({ email: "", fullname: "", password: "" });
  const { email, fullname, password } = regist;

  const OnChangeRegist = (e) => {
    setRegist({ ...regist, [e.target.name]: e.target.value });
  };

  const RegisterSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(regist);

      // Insert data user to database
      await API.post("/register", body, config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Title className="modal-signup">Register</Modal.Title>
      <Modal.Body>
        <form onSubmit={RegisterSubmit}>
          <div className="input-box">
            <div className="input-email">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={OnChangeRegist}
              />
            </div>
            <div className="input-password">
              <input
                type="password"
                name="password"
                id="pass"
                placeholder="Password"
                value={password}
                onChange={OnChangeRegist}
              />
            </div>
            <div className="input-fullname">
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={fullname}
                onChange={OnChangeRegist}
              />
            </div>
            <Button className="modal-button" variant="primary" type="submit" onClick={close}>
              Register
            </Button>
            <div className="already-account">
              Already have an account ? Klik
              <span>Here</span>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
