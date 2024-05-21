"use client";
import LandingPage from "@/components/page-specific/landing-page";
import ErrorState from "@/components/page-specific/error-state";
import DashboardLayout from "@/components/page-specific/dashboard/dashboard";
import { useRouter } from "next/navigation";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

export default function NotFound() {
  const { isSubscribed } = useInstantPersonasUser();
  const router = useRouter();

  return (
    <section>
      {isSubscribed ? (
        <DashboardLayout>
          <div className="grid place-items-center w-full h-full">
            <ErrorState onRetry={() => router.push("/")} />
          </div>
        </DashboardLayout>
      ) : (
        <>
          <LandingPage.header />
          <div className="grid place-items-center w-full h-full">
            <ErrorState onRetry={() => router.push("/")} />
          </div>
        </>
      )}
    </section>
  );
}
