import { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/img/Logo.svg";
import { UserContext } from "../context/User";

// Icon Import
import templateIcon from "../assets/icon/template.svg";
import profileIcon from "../assets/icon/profile.svg";
import mylinkIcon from "../assets/icon/MyLink.svg";
export const SideBar = () => {
  const [state, dispatch] = useContext(UserContext);
  const location = useLocation();
  let history = useHistory();
  const OnLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };
  return (
    <WideBar>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="navigation">
        {location.pathname === "/home" ? (
          <div className="template-nav" style={{ color: "#FF9F00" }}>
            <Link to="/home">
              <img src={templateIcon} style={{ color: "#FF9F00" }} alt="template" />
              Template
            </Link>
          </div>
        ) : (
          <div className="template-nav">
            <Link to="/home">
              <img src={templateIcon} alt="template" />
              Template
            </Link>
          </div>
        )}
        {location.pathname === "/profile" ? (
          <div className="profile-nav" style={{ color: "#FF9F00" }}>
            <Link to="/profile">
              <img src={profileIcon} style={{ color: "#FF9F00" }} alt="profile" />
              Profile
            </Link>
          </div>
        ) : (
          <div className="profile-nav">
            <Link to="/profile">
              <img src={profileIcon} style={{ color: "black" }} alt="profile" />
              Profile
            </Link>
          </div>
        )}
        {location.pathname === "/mylink" ? (
          <div className="mylink-nav " style={{ color: "#FF9F00" }}>
            <Link to="/mylink">
              <img src={mylinkIcon} style={{ color: "#FF9F00" }} alt="myLink" />
              MyLink
            </Link>
          </div>
        ) : (
          <div className="mylink-nav">
            <Link to="/mylink">
              <img src={mylinkIcon} alt="myLink" />
              MyLink
            </Link>
          </div>
        )}
        <div className="logout-nav">
          <Link onClick={OnLogout}>
            <img src={templateIcon} alt="template" />
            Logout
          </Link>
        </div>
      </div>
    </WideBar>
  );
};
const WideBar = styled.div`
  background-color: #ffffff;
  width: 20%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin-top: 30px;
    margin-bottom: 150px;
    img {
      width: 200px;
    }
  }
  .navigation {
    .template-nav,
    .profile-nav,
    .mylink-nav {
      font-size: 2rem;
      margin-bottom: 70px;
      font-weight: 600;
      display: flex;
      align-items: center;
      img {
        margin-right: 20px;
      }
    }
    .logout-nav {
      margin-top: 300px;
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;
