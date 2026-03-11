import React from "react";
import { Button } from "@/components/ui/button";
import { Archive, Mail, Phone, User } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileLeadCard({ lead, onArchive, isArchiving }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="font-medium text-slate-800">{lead.full_name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onArchive(lead.id)}
          disabled={isArchiving}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          <Archive className="w-3.5 h-3.5 mr-1.5" />
          Archive
        </Button>
      </div>
      <div className="space-y-1.5 pl-11.5">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          {lead.email}
        </div>
        {lead.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {lead.phone}
          </div>
        )}
      </div>
    </motion.div>
  );
}