"use client";
import dynamic from "next/dynamic";

const Authenticate = dynamic(
  () => import("@/components/context/auth/stytch-auth"),
  {
    ssr: false,
  },
);

export default function AuthenticatePage() {
  return <Authenticate />;
}
