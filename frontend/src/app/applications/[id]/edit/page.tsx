"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";


import { AppLayout } from "@/components/layout/AppLayout";
import { ApplicationForm } from "@/components/applications/ApplicationForm";
import { applicationsApi } from "@/lib/api";
import { Application, ApplicationFormData } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Skeleton } from "@/components/ui/Skeleton";

export default function EditApplicationPage() {
  const params = useParams();
  const applicationId = params?.id as string;

  const router = useRouter();
  const { error: toastError, success: toastSuccess } = useToast();


  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApp() {
      try {
        setLoading(true);
        const data = await applicationsApi.getById(applicationId);
        setApplication(data);
      } catch (err: any) {
        toastError(err.message || "Failed to load application data.");
        router.push("/applications");
      } finally {
        setLoading(false);
      }
    }
    loadApp();
  }, [applicationId, router, toastError]);

  const handleUpdate = async (formData: ApplicationFormData) => {
    await applicationsApi.update(applicationId, formData);
    toastSuccess("Application updated successfully.");
    router.push(`/applications/${applicationId}`);
  };

  return (
    <AppLayout
      title="Edit Application"
      subtitle="Update role details, compensation, interview dates, or notes."
      showAddButton={false}
    >
      {loading ? (
        <div className="space-y-4 max-w-3xl">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      ) : application ? (
        <ApplicationForm
          isEdit={true}
          applicationId={application.id}
          initialData={{
            company_name: application.company_name,
            position: application.position,
            location: application.location || "",
            job_url: application.job_url || "",
            salary: application.salary ?? "",
            salary_period: application.salary_period || "Annual",
            currency: application.currency || "INR",
            application_date: application.application_date,
            status: application.status,
            interview_date: application.interview_date || "",
            interview_type: application.interview_type || "",
            notes: application.notes || "",
          }}
          onSubmit={handleUpdate}
        />
      ) : null}
    </AppLayout>
  );
}
