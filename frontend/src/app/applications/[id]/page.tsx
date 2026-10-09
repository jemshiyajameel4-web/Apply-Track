"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";


import { AppLayout } from "@/components/layout/AppLayout";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import { ApplicationTimeline } from "@/components/applications/ApplicationTimeline";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { applicationsApi } from "@/lib/api";
import { Application } from "@/types";
import { formatDate, formatSalary } from "@/lib/utils";
import {
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  Edit,
  Trash2,
  Clock,
  FileText,
  DollarSign,
  ArrowLeft,
  Video,
} from "lucide-react";

export default function ApplicationDetailPage() {
  const params = useParams();
  const applicationId = params?.id as string;

  const router = useRouter();
  const { error: toastError, success: toastSuccess } = useToast();


  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function loadApp() {
      try {
        setLoading(true);
        const data = await applicationsApi.getById(applicationId);
        setApplication(data);
      } catch (err: any) {
        toastError(err.message || "Failed to load application details.");
        router.push("/applications");
      } finally {
        setLoading(false);
      }
    }
    loadApp();
  }, [applicationId, router, toastError]);

  const handleDelete = async () => {
    if (!application) return;
    setIsDeleting(true);
    try {
      await applicationsApi.delete(application.id);
      toastSuccess("Application deleted successfully.");
      router.push("/applications");
    } catch (err: any) {
      toastError(err.message || "Unable to delete application.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <AppLayout title="Application Details" showAddButton={false}>
        <div className="space-y-6 max-w-4xl">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </AppLayout>
    );
  }

  if (!application) return null;

  return (
    <AppLayout title="Application Details" showAddButton={false}>
      <div className="space-y-5 max-w-4xl w-full min-w-0">
        {/* Back Link */}
        <div>
          <Link
            href="/applications"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#687873] hover:text-[#006764] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all applications</span>
          </Link>
        </div>

        {/* Top Header Card (Section 29) */}
        <div className="rounded-2xl border border-[#E7DEDF] bg-white p-4 sm:p-6 shadow-sm w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full min-w-0">
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#006764] font-bold text-sm sm:text-base flex-shrink-0 border border-[#B2DCDA]">
                {application.company_name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h2 className="text-lg sm:text-2xl font-bold font-serif text-[#19332F] break-words">
                    {application.company_name}
                  </h2>
                  <ApplicationStatusBadge status={application.status} size="sm" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#687873] mt-0.5 sm:mt-1 break-words">
                  {application.position}
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7DEDF]/50">
              {application.job_url && (
                <a
                  href={application.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E7DEDF] text-xs font-semibold text-[#19332F] hover:bg-[#FAF7F5] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#006764]" />
                  <span>Job Link</span>
                </a>
              )}

              <Link href={`/applications/${application.id}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit className="w-3.5 h-3.5" />}
                  className="border-[#E7DEDF] text-[#19332F] hover:bg-[#FAF7F5]"
                >
                  Edit
                </Button>
              </Link>

              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                className="bg-[#FDF1F4] border border-[#F7C9D6] text-[#C96582] hover:bg-[#fce5eb]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Main Details Grid (Section 64) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full min-w-0">
          {/* Left 2 Cols: Details & Notes */}
          <div className="lg:col-span-2 space-y-5 w-full min-w-0">
            {/* Overview Details */}
            <Card className="w-full min-w-0 border-[#E7DEDF] rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#006764]" />
                  <CardTitle className="text-base font-bold text-[#19332F]">Role Information</CardTitle>
                </div>
              </CardHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF7F5] border border-[#E7DEDF]">
                  <span className="text-[#687873] block mb-1 font-medium text-[11px]">
                    Applied Date
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#19332F]">
                    {formatDate(application.application_date)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F5] border border-[#E7DEDF]">
                  <span className="text-[#687873] block mb-1 font-medium text-[11px]">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#19332F] break-words">
                    {application.location || "Remote / Unspecified"}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F5] border border-[#E7DEDF]">
                  <span className="text-[#687873] block mb-1 font-medium text-[11px]">
                    Target Compensation
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#19332F]">
                    {formatSalary(
                      application.salary,
                      application.currency,
                      application.salary_period
                    )}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F5] border border-[#E7DEDF]">
                  <span className="text-[#687873] block mb-1 font-medium text-[11px]">
                    Last Updated
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#19332F]">
                    {formatDate(application.updated_at)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Interview Information (Section 24) */}
            {(application.interview_date ||
              application.interview_type ||
              application.status === "Interview" ||
              application.status === "Technical Round") && (
              <Card className="w-full min-w-0 border-[#E7DEDF] rounded-2xl shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#925775]" />
                    <CardTitle className="text-base font-bold text-[#19332F]">Interview Schedule</CardTitle>
                  </div>
                </CardHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F5EEF2] border border-[#DCC5D1]">
                    <span className="text-[#925775] block mb-1 font-semibold text-[11px]">
                      Scheduled Date
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#19332F]">
                      {application.interview_date
                        ? formatDate(application.interview_date)
                        : "To be scheduled"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F5EEF2] border border-[#DCC5D1]">
                    <span className="text-[#925775] block mb-1 font-semibold text-[11px]">
                      Interview Stage
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#19332F] break-words">
                      {application.interview_type || "General Interview"}
                    </span>
                  </div>
                </div>
              </Card>
            )}

            {/* Notes Section (Section 27) */}
            <Card className="w-full min-w-0 border-[#E7DEDF] rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#006764]" />
                  <CardTitle className="text-base font-bold text-[#19332F]">Notes & Preparation</CardTitle>
                </div>
              </CardHeader>

              {application.notes ? (
                <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#E7DEDF] text-xs sm:text-sm text-[#19332F] whitespace-pre-wrap break-words leading-relaxed">
                  {application.notes}
                </div>
              ) : (
                <p className="text-xs text-[#98A5A1] italic">
                  No notes added for this application yet. Click Edit to add interview notes or recruiter contacts.
                </p>
              )}
            </Card>
          </div>

          {/* Right 1 Col: Application Timeline (Section 30) */}
          <div className="w-full min-w-0">
            <Card className="h-full w-full min-w-0 border-[#E7DEDF] rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#006764]" />
                  <CardTitle className="text-base font-bold text-[#19332F]">Timeline</CardTitle>
                </div>
              </CardHeader>

              <div className="pt-2">
                <ApplicationTimeline
                  history={application.status_history}
                  createdAt={application.created_at}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>


      {/* Delete Confirmation Modal (Section 32) */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete application?"
        message="This action cannot be undone and will permanently remove all associated interview history and notes."
        confirmLabel="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
    </AppLayout>
  );
}
