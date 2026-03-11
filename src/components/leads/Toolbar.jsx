import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Toolbar({ isFormOpen, onToggleForm }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          All Leads
        </h2>
      </div>
      <Button
        onClick={onToggleForm}
        className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Manual Lead
      </Button>
    </div>
  );
}