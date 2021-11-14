import { HomeComp } from "../components/HomeComponent";
import { PWide } from "../components/ProfileComponent";
import { SideBar } from "../components/SideBar";
import { Wide } from "./CreateLink";

export const Home = () => {
  return (
    <Wide>
      <SideBar />
      <HomeComp />
    </Wide>
  );
};
