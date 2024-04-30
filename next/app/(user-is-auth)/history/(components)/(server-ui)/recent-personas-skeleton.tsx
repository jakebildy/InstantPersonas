import { Skeleton } from "@/components/ui/skeleton";

export function RecentPersonasSkeleton({}: {}) {
  return (
    <div id="recent-personas">
      <div className="flex flex-row items-center justify-center mt-20 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <Skeleton
            className="bg-gray-300 rounded-full -mr-4 h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
