"use server";
import DashboardLayout from "@/components/dashboard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // TODO: change font to jost?
    <main className="bg-zinc-100">
      <DashboardLayout>{children}</DashboardLayout>
    </main>
  );
}
