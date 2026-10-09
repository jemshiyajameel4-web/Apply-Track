"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { ApplicationForm } from "@/components/applications/ApplicationForm";
import { applicationsApi } from "@/lib/api";
import { ApplicationFormData } from "@/types";
import { useToast } from "@/components/ui/Toast";

export default function NewApplicationPage() {
  const router = useRouter();
  const { success: toastSuccess } = useToast();

  const handleCreate = async (formData: ApplicationFormData) => {
    await applicationsApi.create(formData);
    toastSuccess("Application added successfully.");
    router.push("/applications");
  };

  return (
    <AppLayout
      title="Add Application"
      subtitle="Log a new job application to your tracking pipeline."
      showAddButton={false}
    >
      <ApplicationForm onSubmit={handleCreate} />
    </AppLayout>
  );
}
