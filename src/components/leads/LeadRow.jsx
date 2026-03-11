import React from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Archive } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadRow({ lead, onArchive, isArchiving }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors"
    >
      <TableCell className="py-4 pl-6">
        <span className="font-medium text-slate-800">{lead.full_name}</span>
      </TableCell>
      <TableCell className="py-4 text-slate-600">{lead.email}</TableCell>
      <TableCell className="py-4 text-slate-600">{lead.phone || "—"}</TableCell>
      <TableCell className="py-4 pr-6 text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onArchive(lead.id)}
          disabled={isArchiving}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Archive className="w-3.5 h-3.5 mr-1.5" />
          Archive
        </Button>
      </TableCell>
    </motion.tr>
  );
}