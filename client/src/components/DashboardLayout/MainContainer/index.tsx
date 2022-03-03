import { ReactElement } from "react";
import { ChildrenProps } from "../../../types";
import Navbar from "../Navbar";
import MainSection from "../MainSection";

const MainContainer = ({ children }: ChildrenProps): ReactElement => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Navbar />
      <MainSection children={children} />
    </div>
  );
};

export default MainContainer;
