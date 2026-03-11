import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingState() {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-3 flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16 ml-auto" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="px-6 py-4 border-b border-slate-100 last:border-0 flex items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-20 rounded-md ml-auto" />
        </div>
      ))}
    </div>
  );
}