import Authenticate, { AuthFallback } from "@/components/auth/stytch-auth";
import { Suspense } from "react";

export default function AuthenticatePage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <Authenticate />
    </Suspense>
  );
}
