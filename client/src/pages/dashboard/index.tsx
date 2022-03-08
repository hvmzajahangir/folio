import type { NextPage } from "next";
import Image from "next/image";
import logo from "../../../public/logo.png";
import DashboardLayout from "../../components/DashboardLayout";
import PortfolioHighlights from "../../components/PortfolioHighlights";
import PortfolioList from "../../components/PortfolioList/";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <PortfolioHighlights />
      <PortfolioList />
    </DashboardLayout>
  );
};

export default Dashboard;
