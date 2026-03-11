import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatePresence } from "framer-motion";
import LeadRow from "./LeadRow";

export default function LeadTable({ leads, onArchive, archivingId }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 border-b border-slate-200 hover:bg-slate-50/80">
            <TableHead className="pl-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Phone
            </TableHead>
            <TableHead className="pr-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {leads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                onArchive={onArchive}
                isArchiving={archivingId === lead.id}
              />
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}