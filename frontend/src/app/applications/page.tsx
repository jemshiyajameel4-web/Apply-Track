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
      subtitle="Manage and track your job applications pipeline."
    >
      <div className="space-y-5">
        {/* Controls Toolbar: Search & Filters (Sections 18, 19) */}
        <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <ApplicationSearch
              value={search}
              onChange={handleSearchChange}
              placeholder="Search companies or positions..."
            />

            <Link href="/applications/new" className="sm:hidden">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Application
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
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 shadow-xs">
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
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        ) : applications.length === 0 ? (
          <EmptyState
            icon={<Layers className="w-6 h-6 text-[#0E6162]" />}
            title={
              search || status !== "All"
                ? "No matching applications found"
                : "No applications yet"
            }
            description={
              search || status !== "All"
                ? "Try adjusting your search keywords or clearing filters to see more results."
                : "Start tracking your job applications to keep your search organized."
            }
            actionLabel={
              search || status !== "All" ? "Clear Filters" : "Add your first application"
            }
            onAction={() => {
              if (search || status !== "All") {
                setSearch("");
                setStatus("All");
                setPage(1);
              } else {
                window.location.href = "/applications/new";
              }
            }}
          />
        ) : (
          <>
            {/* Desktop Table (Section 20) */}
            <div className="hidden md:block">
              <ApplicationTable
                applications={applications}
                onDeleteClick={(app) => setAppToDelete(app)}
              />
            </div>

            {/* Mobile Cards (Section 21) */}
            <div className="md:hidden space-y-3">
              {applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onDeleteClick={(a) => setAppToDelete(a)}
                />
              ))}
            </div>

            {/* Server-Side Pagination Bar (Section 47) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs text-xs text-[#6B7280]">
              <div>
                Showing{" "}
                <span className="font-semibold text-[#111827]">
                  {Math.min((page - 1) * limit + 1, total)}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#111827]">
                  {Math.min(page * limit, total)}
                </span>{" "}
                of <span className="font-semibold text-[#111827]">{total}</span>{" "}
                applications
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1 px-2">
                  <span className="font-semibold text-[#111827]">{page}</span>
                  <span>/</span>
                  <span>{totalPages}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
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
