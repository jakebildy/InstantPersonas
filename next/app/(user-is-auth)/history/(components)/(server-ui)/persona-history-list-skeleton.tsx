import { Skeleton } from "@/components/ui/skeleton";

export function PersonaHistoryListSkeleton({}: {}) {
  return (
    <div className="flex flex-col gap-2 px-2">
      {[...Array(9)].map((_, index) => (
        <div
          className="ml-5 flex items-center gap-2 group cursor-pointer hover:animate-pulse hover:py-4 transition-all duration-500"
          key={index}
        >
          <Skeleton className="bg-gray-300 rounded-full h-8 w-8" />
          <Skeleton className="bg-gray-300 p-2 px-4 rounded-lg h-14 w-full" />
          <div className="h-5 w-8 ml-5 mr-5" />
        </div>
      ))}
    </div>
  );
}
