import { ReactElement } from "react";
import { ChildrenProps } from "../../types";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";

const DashboardLayout = ({ children }: ChildrenProps): ReactElement => {
  return (
    <div className="flex h-screen bg-gradient-to-t from-black to-gray-900 text-white">
      <Sidebar />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default DashboardLayout;
