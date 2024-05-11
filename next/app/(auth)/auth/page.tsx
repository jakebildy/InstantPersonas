import Authenticate, {
  AuthFallback,
} from "@/components/context/auth/stytch-auth";
import { Suspense } from "react";

export default function AuthenticatePage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <Authenticate />
    </Suspense>
  );
}
