// "use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { RecentPersonasSkeleton } from "./(components)/_server-ui/recent-personas-skeleton";
import { RecentPersonas } from "./(components)/_server-ui/recent-personas";
import { PersonaHistoryListSkeleton } from "./(components)/_server-ui/persona-history-list-skeleton";
import { PersonaHistoryList } from "./(components)/_server-ui/persona-history-list";

export default function HistoryPage() {
  // const [personas, setPersonas] = useState<PersonaHistory[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [showUserFeedbackDialog, setShowUserFeedbackDialog] =
  //   useState<boolean>(false);
  // const personaRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await api.userPersona.getPersonaHistory();
  //     if (!data) {
  //       setLoading(false);
  //       return;
  //     }
  //     setPersonas(data);
  //     setLoading(false);
  //     console.log(data);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   console.log("user, ", user);
  //   console.log("user onboarded", user?.onboarded);
  //   if (
  //     personas.length >= 1 &&
  //     user !== null &&
  //     (user?.onboarded === false || user?.onboarded === undefined)
  //   ) {
  //     setShowUserFeedbackDialog(true);
  //   }
  // }, [user, personas]);

  // const onSubmit = () => {
  //   setShowUserFeedbackDialog(false);
  // };

  return (
    <main>
      {/* <Dialog
          open={showUserFeedbackDialog}
          onOpenChange={setShowUserFeedbackDialog}
        >
          <UserFeedbackDialog
            onCloseAutoFocus={() => personaRef.current?.focus()}
            onFeedbackSubmit={onSubmit}
          />
        </Dialog> */}
      <Suspense fallback={<RecentPersonasSkeleton />}>
        {/*! Typescript Error with async RSC - Reference:
        https://github.com/vercel/next.js/issues/42292#issuecomment-1298459024 */}
        {/* @ts-expect-error Server Component */}
        <RecentPersonas />
      </Suspense>
      <div className="mt-10">
        <Suspense fallback={<PersonaHistoryListSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <PersonaHistoryList />
        </Suspense>
      </div>
    </main>
  );
}
