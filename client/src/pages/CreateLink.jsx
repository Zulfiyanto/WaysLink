import styled from "styled-components";
import { CreateLinkBody } from "../components/CreateLinkComponent";
import { SideBar } from "../components/SideBar";

export const CreateLink = () => {
  return (
    <Wide>
      <SideBar />
      <CreateLinkBody />
    </Wide>
  );
};

export const Wide = styled.div`
  display: flex;
`;
