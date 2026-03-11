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
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [archivingId, setArchivingId] = useState(null);

    useEffect(() => {
        const loadLeads = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();

                const formattedLeads = data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    archived: false,
                    source: "api",
                }));

                setLeads(formattedLeads);
            } catch (error) {
                console.error("Failed to fetch leads:", error);
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
            name: data.name,
            email: data.email,
            phone: data.phone,
            archived: false,
            source: "manual",
        };

        console.log("Webhook payload:", newLead);

        setLeads((prevLeads) => [newLead, ...prevLeads]);
        setIsFormOpen(false);
    };

    const activeLeads = leads.filter((lead) => !lead.archived);

    return (
        <div className="min-h-screen bg-slate-50/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <PageHeader />

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 sm:p-7">
                    <Toolbar
                        isFormOpen={isFormOpen}
                        onToggleForm={() => setIsFormOpen(!isFormOpen)}
                    />

                    <LeadForm
                        isOpen={isFormOpen}
                        onSave={handleSaveLead}
                        onCancel={() => setIsFormOpen(false)}
                        isSaving={false}
                    />

                    {isLoading ? (
                        <LoadingState />
                    ) : activeLeads.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            <div className="hidden md:block">
                                <LeadTable
                                    leads={activeLeads}
                                    onArchive={handleArchive}
                                    archivingId={archivingId}
                                />
                            </div>

                            <div className="md:hidden">
                                <MobileLeadList
                                    leads={activeLeads}
                                    onArchive={handleArchive}
                                    archivingId={archivingId}
                                />
                            </div>
                        </>
                    )}

                    <div className="mt-5 text-center">
                        <p className="text-xs text-slate-400">
                            {activeLeads.length} {activeLeads.length === 1 ? "lead" : "leads"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}