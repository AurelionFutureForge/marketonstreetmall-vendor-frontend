import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Navbar } from "@/components/admin-panel/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      <Navbar title="Dashboard" />
      <div className="m-6">
        {children}
      </div>
    </AdminPanelLayout>
  );
} 