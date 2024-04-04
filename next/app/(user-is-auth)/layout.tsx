"use client";
import DashboardLayout from "@/components/dashboard";
import router from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-zinc-100">
      <DashboardLayout>{children}</DashboardLayout>
    </main>
  );
}
