import React from "react";
import { AnimatePresence } from "framer-motion";
import MobileLeadCard from "./MobileLeadCard";

export default function MobileLeadList({ leads, onArchive, archivingId }) {
  return (
    <div className="mt-6 space-y-3 md:hidden">
      <AnimatePresence>
        {leads.map((lead) => (
          <MobileLeadCard
            key={lead.id}
            lead={lead}
            onArchive={onArchive}
            isArchiving={archivingId === lead.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}