"use server";
import { AI } from "@/app/(server)/action";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AI>{children}</AI>;
}
