import { PWide } from "./ProfileComponent";
import Phone1 from "../assets/img/Phone-1.png";
import Phone2 from "../assets/img/Phone-2.png";
import Phone3 from "../assets/img/Phone-3.png";
import Phone4 from "../assets/img/Phone.png";
import { useState } from "react";
import { CreateLinkBody } from "./CreateLinkComponent";

export const HomeComp = () => {
  const [move, setMove] = useState(false);
  return (
    <PWide>
      <div className="body-navbar flex-mid-align header-title">Template</div>
      {move ? (
        <CreateLinkBody />
      ) : (
        <>
          <div className="home-body flex-mid-justify mt-5">
            <img onClick={() => setMove(true)} src={Phone1} alt="" />
            <img onClick={() => setMove(true)} src={Phone2} alt="" />
            <img onClick={() => setMove(true)} src={Phone3} alt="" />
            <img onClick={() => setMove(true)} src={Phone4} alt="" />
          </div>
        </>
      )}
    </PWide>
  );
};
