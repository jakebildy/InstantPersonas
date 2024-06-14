"use client"; // Error components must be Client Components

import LandingPage from "@/components/page-specific/landing-page";
import ErrorState from "@/components/page-specific/error-state";
import DashboardLayout from "@/components/page-specific/dashboard/dashboard";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { isSubscribed } = useInstantPersonasUser();

  return (
    <section className="h-screen">
      {isSubscribed ? (
        <DashboardLayout>
          <div className="grid h-full w-full flex-1 place-items-center">
            <ErrorState error={error} onRetry={reset} />
          </div>
        </DashboardLayout>
      ) : (
        <>
          <LandingPage.header />
          <div className="grid h-full w-full place-items-center">
            <ErrorState error={error} onRetry={reset} />
          </div>
        </>
      )}
    </section>
  );
}
