import { Suspense } from "react";
import { CompareContent } from "./compare-content";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
