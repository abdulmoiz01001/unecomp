import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
import DashboardComp from '@/components/adminComponents/DashboardComp'

const Dashboard = () => {
  return <DashboardComp />;
}

export default Dashboard;