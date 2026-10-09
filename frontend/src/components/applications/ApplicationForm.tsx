"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ApplicationFormData,
  ApplicationStatus,
  InterviewType,
  SalaryPeriod,
  Currency,
} from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  Building2,
  Briefcase,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Save,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface ApplicationFormProps {
  initialData?: Partial<ApplicationFormData>;
  isEdit?: boolean;
  applicationId?: number | string;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
}

export function ApplicationForm({
  initialData,
  isEdit = false,
  applicationId,
  onSubmit,
}: ApplicationFormProps) {
  const router = useRouter();
  const { error: toastError, success: toastSuccess } = useToast();

  const [formData, setFormData] = useState<ApplicationFormData>({
    company_name: initialData?.company_name || "",
    position: initialData?.position || "",
    location: initialData?.location || "",
    job_url: initialData?.job_url || "",
    salary: initialData?.salary ?? "",
    salary_period: initialData?.salary_period || "Annual",
    currency: initialData?.currency || "INR",
    application_date:
      initialData?.application_date || new Date().toISOString().split("T")[0],
    status: initialData?.status || "Applied",
    interview_date: initialData?.interview_date || "",
    interview_type: initialData?.interview_type || "",
    notes: initialData?.notes || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status options (Section 23)
  const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Interview", label: "Interview" },
    { value: "Technical Round", label: "Technical Round" },
    { value: "Offer", label: "Offer" },
    { value: "Rejected", label: "Rejected" },
  ];

  // Interview type options (Section 24)
  const interviewTypeOptions = [
    { value: "", label: "Select interview stage..." },
    { value: "Phone Screen", label: "Phone Screen" },
    { value: "HR Interview", label: "HR Interview" },
    { value: "Technical Interview", label: "Technical Interview" },
    { value: "Managerial Interview", label: "Managerial Interview" },
    { value: "Final Interview", label: "Final Interview" },
    { value: "Other", label: "Other" },
  ];

  const salaryPeriodOptions = [
    { value: "Annual", label: "Annual" },
    { value: "Monthly", label: "Monthly" },
    { value: "Hourly", label: "Hourly" },
  ];

  const currencyOptions = [
    { value: "INR", label: "INR (₹)" },
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
  ];

  const isInterviewActive =
    formData.status === "Interview" || formData.status === "Technical Round";

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position title is required";
    }

    if (!formData.application_date) {
      newErrors.application_date = "Application date is required";
    }

    if (formData.job_url && formData.job_url.trim()) {
      const url = formData.job_url.trim();
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        newErrors.job_url = "Job URL must start with http:// or https://";
      }
    }

    if (isInterviewActive && !formData.interview_date) {
      // Prompt section 24: If status is Interview or Technical round, encourage setting interview date
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload: ApplicationFormData = {
        ...formData,
        company_name: formData.company_name.trim(),
        position: formData.position.trim(),
        location: formData.location?.trim() || undefined,
        job_url: formData.job_url?.trim() || undefined,
        salary: formData.salary === "" ? undefined : Number(formData.salary),
        interview_date: formData.interview_date || undefined,
        interview_type: formData.interview_type || undefined,
        notes: formData.notes?.trim() || undefined,
      };

      await onSubmit(payload);
    } catch (err: any) {
      toastError(err.message || "Unable to save application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Primary Job Details Card */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-[#111827] pb-3 border-b border-gray-100 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#4F46E5]" />
          <span>Job & Company Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            required
            placeholder="e.g. Google, Stripe, Microsoft"
            value={formData.company_name}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
            error={errors.company_name}
            leftIcon={<Building2 className="w-4 h-4" />}
          />

          <Input
            label="Position Title"
            required
            placeholder="e.g. Frontend Engineer, Product Designer"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            error={errors.position}
            leftIcon={<Briefcase className="w-4 h-4" />}
          />

          <Input
            label="Location"
            placeholder="e.g. Remote, San Francisco, CA, Hybrid"
            value={formData.location || ""}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            leftIcon={<MapPin className="w-4 h-4" />}
          />

          <Input
            label="Job Posting URL"
            type="url"
            placeholder="https://company.com/careers/job-123"
            value={formData.job_url || ""}
            onChange={(e) =>
              setFormData({ ...formData, job_url: e.target.value })
            }
            error={errors.job_url}
            leftIcon={<LinkIcon className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Compensation Card */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-[#111827] pb-3 border-b border-gray-100">
          Compensation (Optional)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Expected / Offered Salary"
            type="number"
            min="0"
            step="1000"
            placeholder="e.g. 120000"
            value={formData.salary ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
          />

          <Select
            label="Salary Period"
            value={formData.salary_period || "Annual"}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary_period: e.target.value as SalaryPeriod,
              })
            }
            options={salaryPeriodOptions}
          />

          <Select
            label="Currency"
            value={formData.currency || "INR"}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value as Currency })
            }
            options={currencyOptions}
          />
        </div>
      </div>

      {/* Status & Pipeline Stage Card */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-[#111827] pb-3 border-b border-gray-100">
          Pipeline Status & Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Application Status"
            required
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as ApplicationStatus,
              })
            }
            options={statusOptions}
          />

          <Input
            label="Application Date"
            type="date"
            required
            value={formData.application_date}
            onChange={(e) =>
              setFormData({ ...formData, application_date: e.target.value })
            }
            error={errors.application_date}
            leftIcon={<Calendar className="w-4 h-4" />}
          />
        </div>

        {/* Dynamic Interview Stage Details (Section 24) */}
        {isInterviewActive && (
          <div className="p-4 rounded-xl bg-[#EEF2FF]/60 border border-[#C7D2FE] space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4F46E5] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Interview Schedule Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Interview Date"
                type="date"
                value={formData.interview_date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, interview_date: e.target.value })
                }
                helperText="Date of next upcoming round"
              />

              <Select
                label="Interview Round Type"
                value={formData.interview_type || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interview_type: e.target.value as InterviewType,
                  })
                }
                options={interviewTypeOptions}
              />
            </div>
          </div>
        )}
      </div>

      {/* Notes Card */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-[#111827] pb-3 border-b border-gray-100">
          Preparation & Notes
        </h3>

        <Textarea
          label="Application Notes"
          placeholder="Add recruiter contact info, interview prep details, questions to ask, or referral notes..."
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          maxLength={2000}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <Link href="/applications">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Cancel
          </Button>
        </Link>

        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          leftIcon={<Save className="w-4 h-4" />}
        >
          {isEdit ? "Update Application" : "Save Application"}
        </Button>
      </div>
    </form>
  );
}
