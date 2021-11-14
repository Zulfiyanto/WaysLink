import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { API } from "../config/Api";
import { UserContext } from "../context/User";

export const ProfileComp = () => {
  const [form, setForm] = useState({
    email: "",
    fullname: "",
  });
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const OnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const GetData = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      console.log(response);
      setForm({
        ...form,
        fullname: response.data.data.user.fullname,
        email: response.data.data.user.email,
      });
    } catch (error) {}
  };

  const OnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      await API.patch("/user/" + state.user.id, body, config);
      GetData();
    } catch (error) {
      console.log(error);
    }
  };

  const OnDelete = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await API.delete("/user/" + state.user.id, config);

      dispatch({
        type: "LOGOUT",
      });
      history.push("/");
    } catch (error) {}
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <PWide>
      <div className="body-navbar flex-mid-align header-title">Profile</div>
      <ProfileBody>
        <div className="header-title mb-5">My Information</div>
        <div className="input-body">
          <div className="input-name flex-column input-label">
            Name
            <input type="text" onChange={OnChange} name="fullname" value={form.fullname} />
          </div>
          <div className="input-emails flex-column input-label">
            Email
            <input type="email" name="" id="" onChange={OnChange} name="email" value={form.email} />
          </div>
        </div>
        <div className="btn-profile mt-5">
          <button onClick={OnSubmit} className="save-btn" style={{ backgroundColor: "#FF9F00" }}>
            Save Account
          </button>
          <button
            onClick={OnDelete}
            className="delete-btn ml-5"
            style={{ backgroundColor: "#FF0000" }}
          >
            Delete Account
          </button>
        </div>
      </ProfileBody>
    </PWide>
  );
};

export const PWide = styled.div`
  background-color: #e5e5e5;
  width: 80%;
  height: 100vh;
  .body-navbar {
    background-color: white;
    padding: 0 50px;
    height: 13vh;
  }
`;

const ProfileBody = styled.div`
  padding: 70px 50px;
  .input-body {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
  }
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    font-size: 2rem;
    font-weight: 600;
  }
  .btn-profile {
    display: flex;
    justify-content: flex-end;
    button {
      width: 15%;
      font-size: 1.2rem;
      font-weight: 700;
      height: 5vh;
      border: none;
      border-radius: 10px;
      color: white;
    }
  }
`;
