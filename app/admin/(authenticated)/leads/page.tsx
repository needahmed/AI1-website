"use client";

import { useEffect, useState } from "react";
import {
  getAllLeadsAction,
  updateLeadStatusAction,
  updateLeadNotesAction,
  deleteLeadAction,
} from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Trash2, Filter, Mail, Phone, Building } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  projectType: string;
  budgetRange: string;
  message: string;
  status: string;
  notes?: string | null;
  createdAt: Date;
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredLeads(leads);
    } else {
      setFilteredLeads(leads.filter((l) => l.status === statusFilter));
    }
  }, [statusFilter, leads]);

  const loadLeads = async () => {
    setIsLoading(true);
    const result = await getAllLeadsAction();
    if (result.success && result.data) {
      setLeads(result.data);
      setFilteredLeads(result.data);
    } else {
      toast.error("Failed to load leads");
    }
    setIsLoading(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const result = await updateLeadStatusAction(id, status);
    if (result.success) {
      toast.success("Status updated");
      loadLeads();
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;

    const result = await updateLeadNotesAction(selectedLead.id, notes);
    if (result.success) {
      toast.success("Notes saved");
      setSelectedLead(null);
      loadLeads();
    } else {
      toast.error(result.error || "Failed to save notes");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    const result = await deleteLeadAction(id);
    if (result.success) {
      toast.success("Lead deleted");
      loadLeads();
    } else {
      toast.error(result.error || "Failed to delete lead");
    }
  };

  const openNotesDialog = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes || "");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "CONTACTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Loading leads...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage contact submissions
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{lead.name}</h3>
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(lead.status)}`}
                  >
                    {lead.status.replace(/_/g, " ")}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(lead.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${lead.email}`} className="hover:underline">
                    {lead.email}
                  </a>
                </div>

                {lead.phone && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${lead.phone}`} className="hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                )}

                {lead.company && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Building className="h-4 w-4" />
                    {lead.company}
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Project Type:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lead.projectType.replace(/_/g, " ")}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Budget:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lead.budgetRange.replace(/_/g, " ")}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Message:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lead.message}
                </p>
              </div>

              {lead.notes && (
                <div className="mt-4 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-sm font-medium">Notes:</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {lead.notes}
                  </p>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <Label className="text-xs">Change Status</Label>
                <Select
                  value={lead.status}
                  onValueChange={(value) => handleStatusChange(lead.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONTACTED">Contacted</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openNotesDialog(lead)}
                  className="w-full"
                >
                  {lead.notes ? "Edit Notes" : "Add Notes"}
                </Button>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Submitted: {new Date(lead.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            No leads found
          </div>
        )}
      </div>

      {/* Notes Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Notes</DialogTitle>
            <DialogDescription>
              Add or update notes for {selectedLead?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
                placeholder="Add internal notes about this lead..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedLead(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
