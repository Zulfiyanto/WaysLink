import { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/img/Logo.svg";
import { ModalLogin, ModalRegist } from "./Modal";

export const LandingNavbars = () => {
  // modal state
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  // Modal handler
  const handleShowRegist = () => setShowRegister(true);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);
  return (
    <>
      <LandingNavbar>
        <div className="logo-section">
          <img src={Logo} alt="" />
        </div>
        <div className="button-section">
          <button className="login-btn" onClick={handleShowLogin}>
            Login
          </button>
          <button className="regist-btn" onClick={handleShowRegist}>
            Register
          </button>
        </div>
      </LandingNavbar>
      <ModalLogin show={showLogin} close={handleCloseLogin} />
      <ModalRegist show={showRegister} close={handleCloseRegister} />
    </>
  );
};

const LandingNavbar = styled.div`
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 7rem;
  .logo-section {
    img {
      width: 140%;
    }
  }
  .button-section {
    width: 300px;
    display: flex;
    justify-content: space-around;
    .login-btn {
      border: none;
      font-size: 1.3rem;
      font-weight: 600;
      background-color: none;
    }
    .regist-btn {
      border: none;
      font-size: 1.3rem;
      font-weight: 600;
      background-color: #ff9f00;
      border-radius: 10px;
      color: white;
      height: 6vh;
      width: 50%;
    }
  }
`;
