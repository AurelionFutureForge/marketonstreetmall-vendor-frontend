import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      <div className="">{children}</div>
    </AdminPanelLayout>
  );
}
