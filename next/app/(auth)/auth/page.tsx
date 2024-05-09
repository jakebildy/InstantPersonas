import Authenticate, { AuthFallback } from "@/components/auth/stytch-auth";
import { Suspense } from "react";
import BarLoader from "react-spinners/BarLoader";

export default function AuthenticatePage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <Authenticate />
    </Suspense>
  );
}
