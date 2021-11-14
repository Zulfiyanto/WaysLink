import { MyLinkComp } from "../components/MyLinkComponent";
import { SideBar } from "../components/SideBar";
import { Wide } from "./CreateLink";

export const MyLink = () => {
  return (
    <Wide>
      <SideBar />
      <MyLinkComp />
    </Wide>
  );
};
