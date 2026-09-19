import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { getAuthSession } from "../../features/auth/auth.storage";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const session = getAuthSession();

    if (!session?.access_token) {
      throw redirect({
        to: "/",
      });
    }
  },

  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
