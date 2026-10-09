"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";


import { AppLayout } from "@/components/layout/AppLayout";
import { ApplicationSearch } from "@/components/applications/ApplicationSearch";
import { ApplicationFilters } from "@/components/applications/ApplicationFilters";
import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { TableRowSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { applicationsApi } from "@/lib/api";
import { Application, PaginatedApplications } from "@/types";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Layers,
} from "lucide-react";
import Link from "next/link";

import { EmptyApplicationsIllustration } from "@/components/illustrations/EmptyApplicationsIllustration";

export default function ApplicationsPage() {
  const { error: toastError, success: toastSuccess } = useToast();

  const [data, setData] = useState<PaginatedApplications | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter & Pagination States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  // Deletion Modal State
  const [appToDelete, setAppToDelete] = useState<Application | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await applicationsApi.getAll({
        page,
        limit,
        search: search.trim() || undefined,
        status: status === "All" ? undefined : status,
        sort,
      });
      setData(res);
    } catch (err: any) {
      toastError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status, sort, toastError]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Reset to page 1 on filter or search change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
    setPage(1);
  };

  const handleDeleteConfirm = async () => {
    if (!appToDelete) return;
    setIsDeleting(true);
    try {
      await applicationsApi.delete(appToDelete.id);
      toastSuccess("Application deleted successfully.");
      setAppToDelete(null);
      fetchApplications();
    } catch (err: any) {
      toastError(err.message || "Unable to delete application.");
    } finally {
      setIsDeleting(false);
    }
  };

  const applications = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.total_pages || 1;

  return (
    <AppLayout
      title="My Applications"
      subtitle="Keep every opportunity organized, from your first application to your final offer."
    >
      <div className="space-y-6">
        {/* Controls Toolbar: Search & Filters (Section 7) */}
        <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E7DEDF] shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <ApplicationSearch
              value={search}
              onChange={handleSearchChange}
              placeholder="Search companies, job titles, or keywords..."
            />

            <Link href="/applications/new" className="sm:hidden">
              <Button
                variant="primary"
                size="sm"
                className="w-full bg-[#006764] hover:bg-[#005250] text-white"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                + Add Application
              </Button>
            </Link>
          </div>

          <ApplicationFilters
            selectedStatus={status}
            onStatusChange={handleStatusChange}
            selectedSort={sort}
            onSortChange={handleSortChange}
          />
        </div>

        {/* List Content */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-[#E7DEDF] p-4 shadow-sm">
            <div className="hidden md:block">
              <table className="w-full">
                <tbody>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-3">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E7DEDF] p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-sm">
            <EmptyApplicationsIllustration className="w-44 h-44 mb-4" />
            <h3 className="text-lg font-bold text-[#19332F] mb-1 font-serif">
              {search || status !== "All"
                ? "No matching applications found"
                : "No applications yet"}
            </h3>
            <p className="text-sm text-[#687873] max-w-md mx-auto mb-6">
              {search || status !== "All"
                ? "Try adjusting your search keywords or clearing status filters to find your opportunities."
                : "Start tracking your job applications to monitor interviews, notes, and milestones."}
            </p>
            {search || status !== "All" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setStatus("All");
                  setPage(1);
                }}
                className="border-[#E7DEDF] text-[#19332F] hover:bg-[#FAF7F5]"
              >
                Clear Filters
              </Button>
            ) : (
              <Link href="/applications/new">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-[#006764] hover:bg-[#005250] text-white"
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  + Add Application
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <ApplicationTable
                applications={applications}
                onDeleteClick={(app) => setAppToDelete(app)}
              />
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onDeleteClick={(a) => setAppToDelete(a)}
                />
              ))}
            </div>

            {/* Server-Side Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E7DEDF] shadow-sm text-xs text-[#687873]">
              <div>
                Showing{" "}
                <span className="font-semibold text-[#19332F]">
                  {Math.min((page - 1) * limit + 1, total)}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#19332F]">
                  {Math.min(page * limit, total)}
                </span>{" "}
                of <span className="font-semibold text-[#19332F]">{total}</span>{" "}
                applications
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                  className="border-[#E7DEDF] text-[#19332F] hover:bg-[#FAF7F5]"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1 px-2 font-medium">
                  <span className="font-semibold text-[#006764]">{page}</span>
                  <span>/</span>
                  <span>{totalPages}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  className="border-[#E7DEDF] text-[#19332F] hover:bg-[#FAF7F5]"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal (Section 32) */}
      <ConfirmDialog
        isOpen={!!appToDelete}
        onClose={() => setAppToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete application?"
        message={`Are you sure you want to delete your application for ${appToDelete?.company_name} - ${appToDelete?.position}? This action cannot be undone.`}
        confirmLabel="Delete Application"
        variant="danger"
        isLoading={isDeleting}
      />
    </AppLayout>
  );
}
