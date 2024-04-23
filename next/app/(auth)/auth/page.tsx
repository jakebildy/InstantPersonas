import Authenticate from "@/components/auth/stytch-auth";
import { Suspense } from "react";

export default function AuthenticatePage() {
  return (
    <Suspense fallback={null}>
      <Authenticate />
    </Suspense>
  );
}
