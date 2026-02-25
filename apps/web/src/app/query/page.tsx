import { Suspense } from "react";
import { QueryContent } from "./query-content";
import { Skeleton } from "@/components/ui/skeleton";

export default function QueryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-24 w-full max-w-2xl" />
          </div>
        </div>
      }
    >
      <QueryContent />
    </Suspense>
  );
}
