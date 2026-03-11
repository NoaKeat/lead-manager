import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-16 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <Inbox className="w-6 h-6 text-slate-400" />
      </div>
      <p className="text-slate-500 font-medium">No leads available</p>
      <p className="text-sm text-slate-400 mt-1">
        Click "Add Manual Lead" to get started
      </p>
    </div>
  );
}