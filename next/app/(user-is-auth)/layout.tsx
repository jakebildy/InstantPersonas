"use server";
import DashboardLayout from "@/components/page-specific/dashboard/dashboard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-zinc-100">
      <DashboardLayout>{children}</DashboardLayout>
    </main>
  );
}
