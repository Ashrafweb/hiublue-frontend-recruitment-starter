import DashboardLayout from "@/sections/dashboard/layout";
import DashboardView from "@/sections/dashboard/views/dashboard-view";

export const metadata = {
  title: "Dashbord",
};

export default function Page() {
  return (
    <DashboardLayout>
      <DashboardView />
    </DashboardLayout>
  );
}
