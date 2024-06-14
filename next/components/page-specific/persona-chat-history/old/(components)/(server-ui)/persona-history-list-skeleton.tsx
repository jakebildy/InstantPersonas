import { Skeleton } from "@/components/ui/skeleton";

export function PersonaHistoryListSkeleton({}: {}) {
  return (
    <div className="flex flex-col gap-2 px-2">
      {[...Array(9)].map((_, index) => (
        <div
          className="group ml-5 flex cursor-pointer items-center gap-2 transition-all duration-500 hover:animate-pulse hover:py-4"
          key={index}
        >
          <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
          <Skeleton className="h-14 w-full rounded-lg bg-gray-300 p-2 px-4" />
          <div className="ml-5 mr-5 h-5 w-8" />
        </div>
      ))}
    </div>
  );
}
