import { ProfileComp } from "../components/ProfileComponent";
import { SideBar } from "../components/SideBar";
import { Wide } from "./CreateLink";

export const Profile = () => {
  return (
    <Wide>
      <SideBar />
      <ProfileComp />
    </Wide>
  );
};
