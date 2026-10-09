"use client";

import React from "react";
import Link from "next/link";
import { Application } from "@/types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { formatDate, formatSalary } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

interface ApplicationCardProps {
  application: Application;
  onDeleteClick: (app: Application) => void;
}

export function ApplicationCard({
  application: app,
  onDeleteClick,
}: ApplicationCardProps) {
  const initials = app.company_name.slice(0, 2).toUpperCase();

  return (
    <div className="rounded-2xl border border-[#E7DEDF] bg-white p-4 shadow-sm space-y-3">
      {/* Top Header: Company + Status */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#006764] font-bold text-xs flex-shrink-0 border border-[#B2DCDA]">
            {initials}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-[#19332F] truncate">
              {app.company_name}
            </h4>
            <p className="text-xs font-medium text-[#687873] truncate">
              {app.position}
            </p>
          </div>
        </div>

        <ApplicationStatusBadge status={app.status} size="sm" />
      </div>

      {/* Meta details */}
      <div className="grid grid-cols-2 gap-2 text-xs text-[#687873] pt-2 border-t border-[#E7DEDF]/50">
        <div>
          <span className="text-[11px] text-[#98A5A1] block">Applied Date</span>
          <span className="font-medium text-[#19332F]">
            {formatDate(app.application_date)}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[#98A5A1] block">Location</span>
          <span className="font-medium text-[#19332F] truncate block">
            {app.location || "—"}
          </span>
        </div>

        {app.interview_date && (
          <div className="col-span-2 bg-[#F5EEF2] p-2.5 rounded-xl text-[#925775] flex flex-col sm:flex-row sm:items-center justify-between gap-1 border border-[#DCC5D1]">
            <span className="text-xs font-medium flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-[#925775]" />
              <span>Interview: {formatDate(app.interview_date)}</span>
            </span>
            {app.interview_type && (
              <span className="text-[11px] font-semibold bg-white px-2 py-0.5 rounded-md text-[#925775] self-start sm:self-auto border border-[#DCC5D1]">
                {app.interview_type}
              </span>
            )}
          </div>
        )}

        {app.salary && (
          <div className="col-span-2 text-xs">
            <span className="text-[11px] text-[#98A5A1]">Salary: </span>
            <span className="font-semibold text-[#19332F]">
              {formatSalary(app.salary, app.currency, app.salary_period)}
            </span>
          </div>
        )}
      </div>

      {/* Actions footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E7DEDF]/50">
        <div>
          {app.job_url && (
            <a
              href={app.job_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#006764] hover:underline font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Job Post</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Link
            href={`/applications/${app.id}`}
            className="p-1.5 text-[#687873] hover:text-[#006764] hover:bg-[#E6F3F2] rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/applications/${app.id}/edit`}
            className="p-1.5 text-[#687873] hover:text-[#006764] hover:bg-[#E6F3F2] rounded-lg transition-colors"
            title="Edit Application"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDeleteClick(app)}
            className="p-1.5 text-[#687873] hover:text-[#C96582] hover:bg-[#FDF1F4] rounded-lg transition-colors"
            title="Delete Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
