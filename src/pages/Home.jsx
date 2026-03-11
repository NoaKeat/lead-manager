import React, { useEffect, useState } from "react";

import PageHeader from "../components/leads/PageHeader";
import Toolbar from "../components/leads/Toolbar";
import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";
import MobileLeadList from "../components/leads/MobileLeadList";
import EmptyState from "../components/leads/EmptyState";
import LoadingState from "../components/leads/LoadingState";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [archivingId, setArchivingId] = useState(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await response.json();

        const formattedLeads = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          source: "api",
        }));

        setLeads(formattedLeads);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
        setError("Failed to load leads. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadLeads();
  }, []);

  const handleArchive = (id) => {
    setArchivingId(id);

    setTimeout(() => {
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
      setArchivingId(null);
    }, 250);
  };

  const handleSaveLead = (data) => {
    const newLead = {
      id: Date.now(),
      name: data.full_name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      source: "manual",
    };

    console.log("Webhook payload:", newLead);

    setLeads((prevLeads) => [newLead, ...prevLeads]);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <PageHeader />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <Toolbar
            isFormOpen={isFormOpen}
            onToggleForm={() => setIsFormOpen((prev) => !prev)}
          />

          <LeadForm
            isOpen={isFormOpen}
            onSave={handleSaveLead}
            onCancel={() => setIsFormOpen(false)}
            isSaving={false}
          />

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          ) : leads.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="hidden md:block">
                <LeadTable
                  leads={leads}
                  onArchive={handleArchive}
                  archivingId={archivingId}
                />
              </div>

              <div className="md:hidden">
                <MobileLeadList
                  leads={leads}
                  onArchive={handleArchive}
                  archivingId={archivingId}
                />
              </div>
            </>
          )}

          <div className="mt-5 text-center">
            <p className="text-xs text-slate-400">
              {leads.length} {leads.length === 1 ? "lead" : "leads"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}