"use client";

import { useEffect, useState } from "react";
import {
  getAllSubscribersAction,
  updateSubscriberStatusAction,
  deleteSubscriberAction,
} from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Filter } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Subscriber = {
  id: string;
  email: string;
  source?: string | null;
  status: string;
  createdAt: Date;
};

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadSubscribers();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredSubscribers(subscribers);
    } else {
      setFilteredSubscribers(subscribers.filter((s) => s.status === statusFilter));
    }
  }, [statusFilter, subscribers]);

  const loadSubscribers = async () => {
    setIsLoading(true);
    const result = await getAllSubscribersAction();
    if (result.success && result.data) {
      setSubscribers(result.data);
      setFilteredSubscribers(result.data);
    } else {
      toast.error("Failed to load subscribers");
    }
    setIsLoading(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const result = await updateSubscriberStatusAction(id, status as any);
    if (result.success) {
      toast.success("Status updated");
      loadSubscribers();
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) {
      return;
    }

    const result = await deleteSubscriberAction(id);
    if (result.success) {
      toast.success("Subscriber deleted");
      loadSubscribers();
    } else {
      toast.error(result.error || "Failed to delete subscriber");
    }
  };

  const exportToCSV = () => {
    const headers = ["Email", "Source", "Status", "Subscribed Date"];
    const rows = filteredSubscribers.map((sub) => [
      sub.email,
      sub.source || "",
      sub.status,
      new Date(sub.createdAt).toISOString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `subscribers-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exported successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "UNSUBSCRIBED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      case "BOUNCED":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Loading subscribers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscribers</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage newsletter subscribers
          </p>
        </div>
        <Button onClick={exportToCSV} disabled={filteredSubscribers.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subscribers</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="UNSUBSCRIBED">Unsubscribed</SelectItem>
            <SelectItem value="BOUNCED">Bounced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          <p className="mt-1 text-2xl font-bold">{subscribers.length}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          <p className="mt-1 text-2xl font-bold">
            {subscribers.filter((s) => s.status === "ACTIVE").length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <p className="text-sm text-gray-600 dark:text-gray-400">Unsubscribed</p>
          <p className="mt-1 text-2xl font-bold">
            {subscribers.filter((s) => s.status === "UNSUBSCRIBED").length}
          </p>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Subscribed
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-6 py-4 font-medium">{subscriber.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {subscriber.source || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Select
                        value={subscriber.status}
                        onValueChange={(value) =>
                          handleStatusChange(subscriber.id, value)
                        }
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(subscriber.status)}`}
                            >
                              {subscriber.status}
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="UNSUBSCRIBED">Unsubscribed</SelectItem>
                          <SelectItem value="BOUNCED">Bounced</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(subscriber.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
