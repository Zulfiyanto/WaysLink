import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PWide } from "./ProfileComponent";
// Image NAvigation
import viewIcon from "../assets/icon/View.png";
import editIcon from "../assets/icon/Edit.png";
import deleteIcon from "../assets/icon/Delete.png";
import { API } from "../config/Api";
import { UserContext } from "../context/User";
import { useHistory } from "react-router";

export const MyLinkComp = () => {
  let history = useHistory();
  const [states] = useContext(UserContext);
  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    try {
      const response = await API.get("/brands");
      console.log(response);
      setBrands(response.data.datas);
    } catch (error) {}
  };

  const OnDelete = async (id) => {
    try {
      await API.delete("/brand/" + id);
      getBrands();
    } catch (error) {}
  };

  const OnView = (uniqe) => {
    history.push(`/mockup/${uniqe}`, "_blank");
  };

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <PWide>
      <div className="body-navbar flex-mid-align header-title">My Links</div>
      <MyLinkBody>
        <div className="search-section flex-mid-align header-title">
          All Links
          <div className="notif-round mx-4">{brands.length}</div>
          <input className="mr-5" type="text" />
          <button className="yellow-btn">Search</button>
        </div>
        {brands.map((state) => (
          <div className="body-brands">
            <img className="mr-5" src={state.image_brand} alt="" />
            <div className="title-link ">
              <div className="title-brand">{state.title_brand}</div>
              <div className="link-brand">localhost:3000/waysfood</div>
            </div>
            <div className="visit">
              <div className="number-visit">{state.view_count}</div>
              visit
            </div>
            <div className="icon-brands">
              <img
                onClick={() =>
                  OnView(`${states.user.fullname.split(" ").join("-")}/${state.unique_link}`)
                }
                src={viewIcon}
                alt=""
              />
              <img src={editIcon} alt="" />
              <img onClick={() => OnDelete(state.id)} src={deleteIcon} alt="" />
            </div>
          </div>
        ))}
      </MyLinkBody>
    </PWide>
  );
};

const MyLinkBody = styled.div`
  padding: 70px 50px;
  .search-section {
    input {
      width: 70%;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
      font-size: 2rem;
      font-weight: 600;
      background-color: #e5e5e5;
    }
    .notif-round {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      border-radius: 50%;
      background-color: #ff9f00;
    }
  }
  .body-brands {
    display: flex;
    align-items: center;
    margin-top: 60px;
    img {
      width: 10%;
    }
    .title-link {
      margin-right: 300px;
    }
    .title-brand,
    .number-visit {
      font-size: 2rem;
      font-weight: 700;
      color: black !important;
    }
    .link-brand,
    .visit {
      color: #7e7a7a;
    }
    .icon-brands {
      display: flex;
      justify-content: space-between;
      width: 15%;
      margin-left: 300px;
      img {
        width: 50px;
        height: 5vh;
      }
    }
  }
`;
