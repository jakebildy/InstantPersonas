import { Skeleton } from "@/components/ui/skeleton";

export function RecentPersonasSkeleton({}: {}) {
  return (
    <div id="recent-personas">
      <div className="mt-20 flex w-full flex-row items-center justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <Skeleton
            className="-mr-4 h-14 w-14 rounded-full border-2 border-white bg-gray-300 group-hover:z-30 group-hover:scale-105"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
