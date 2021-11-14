import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.input-box {
  padding: 0 33px;
}

.modal-title {
  padding: 41px 35px 20px 45px !important;
  font-size: 3rem !important;
  font-weight: 700 !important;
}

.input-email,
.input-password,
.input-fullname,
.input-gender,
.input-phone,
.input-address {
  margin-bottom: 20px;
}

.input-email input,
.input-password input,
.input-fullname input,
.input-phone input,
.input-address input {
  width: 400px;
  height: 7vh;
  border-radius: 5px;
  font-size: 1.5rem;
  outline: none;
  border: 2px solid #5e5e5e40;
  background-color: #b4b4b440;
  padding-left: 5px;
}

.modal-button {
  margin: 11px 0;
  width: 400px;
  height: 7vh;
  background-color: #FF9F00 !important;
  border: none !important;
  font-weight: 700 !important;
  font-size: 1.2rem !important;
  border-radius: 10px;
}

.already-account {
  font-size: 1.4rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.already-account a {
  font-weight: 700;
  color: black;
  text-decoration: none !important;
}

.home-body{
  img{
    width: 30%;
  }
}

/* Framework css */
.flex-mid-justify{
  display: flex;
  justify-content: center;
}
.flex-mid-align{
  display: flex;
  align-items: center;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.header-title{
  font-size: 2rem;
  font-weight: 700;
}
.input-label{
  font-size: 1.5rem;
  color: #7E7A7A;
  margin-bottom: 50px;
}
input,textarea{
  margin-top: 20px;
}

.yellow-btn{
    background-color: #ff9f00;
    border: none;
    color: white;
    min-width: 100px;
    padding: 0 20px;
    font-weight: 700;
    border-radius: 10px;
}

`;

export default GlobalStyle;
