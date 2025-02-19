import DashboardLayout from "@/sections/dashboard/layout";
import OnboardingView from "@/sections/onboarding/views/onboarding-view";

export const metadata = {
  title: "Onboarding",
};

export default function Page() {
  return (
    <DashboardLayout>
      <OnboardingView />
    </DashboardLayout>
  );
}
