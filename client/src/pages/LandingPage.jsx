import styled from "styled-components";
import { LandingNavbars } from "../components/Navbar";
import bodyImg from "../assets/img/Body-Image.png";
import bg from "../assets/img/Bg.svg";
export const LandingPage = () => {
  return (
    <MainPage>
      <LandingNavbars />
      <BodyPage>
        <div className="left-section">
          <div className="text-header">
            The Only Link <br /> You’ll Ever Need
          </div>
          <div className="text-paragraf">
            Add a link for your Social Bio and optimize your
            <br /> social media traffic.
            <br />
            <br /> safe, fast and easy to use
          </div>

          <button>Get Started For Free</button>
        </div>
        <div className="right-section">
          <img src={bodyImg} alt="" />
        </div>
      </BodyPage>
    </MainPage>
  );
};

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ff9f00;
`;
const BodyPage = styled.div`
  height: 90.5vh;
  display: flex;
  background-image: url("../assets/img/Bg.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1000;
  .left-section {
    width: 50%;
    padding: 8rem 0 5rem 7rem;
    .text-header {
      font-size: 7rem;
      font-weight: 600;
      color: white;
      margin-bottom: 20px;
      line-height: 140px;
    }
    .text-paragraf {
      color: white;
      font-size: 2.2rem;
      margin-bottom: 70px;
    }
    button {
      border: none;
      background-color: black;
      color: white;
      width: 50%;
      font-size: 2rem;
      border-radius: 10px;
      height: 7vh;
    }
  }
  .right-section {
    width: 50%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
    }
  }
`;
