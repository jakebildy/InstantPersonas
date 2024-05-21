"use client"; // Error components must be Client Components

import LandingPage from "@/components/page-specific/landing-page";
import ErrorState from "@/components/page-specific/error-state";
import DashboardLayout from "@/components/page-specific/dashboard/dashboard";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isSubscribed } = useInstantPersonasUser();

  return (
    <section>
      {isSubscribed ? (
        <DashboardLayout>
          <div className="grid place-items-center w-full h-full">
            <ErrorState error={error} onRetry={reset} />
          </div>
        </DashboardLayout>
      ) : (
        <>
          <LandingPage.header />
          <div className="grid place-items-center w-full h-full">
            <ErrorState error={error} onRetry={reset} />
          </div>
        </>
      )}
    </section>
  );
}
