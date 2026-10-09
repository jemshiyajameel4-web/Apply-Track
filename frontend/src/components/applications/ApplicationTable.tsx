"use client";

import React from "react";
import Link from "next/link";
import { Application } from "@/types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { formatDate, formatSalary } from "@/lib/utils";
import {
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";

interface ApplicationTableProps {
  applications: Application[];
  onDeleteClick: (app: Application) => void;
}

export function ApplicationTable({
  applications,
  onDeleteClick,
}: ApplicationTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] bg-white shadow-xs">
      <table className="w-full text-left text-sm text-[#111827]">
        <thead className="bg-[#F9FAFB] text-xs uppercase tracking-wider text-[#6B7280] border-b border-[#E5E7EB]">
          <tr>
            <th scope="col" className="py-3.5 px-4 font-semibold">Company</th>
            <th scope="col" className="py-3.5 px-4 font-semibold">Position</th>
            <th scope="col" className="py-3.5 px-4 font-semibold">Location</th>
            <th scope="col" className="py-3.5 px-4 font-semibold">Status</th>
            <th scope="col" className="py-3.5 px-4 font-semibold">Applied Date</th>
            <th scope="col" className="py-3.5 px-4 font-semibold">Interview Date</th>
            <th scope="col" className="py-3.5 px-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {applications.map((app) => {
            const initials = app.company_name.slice(0, 2).toUpperCase();

            return (
              <tr
                key={app.id}
                className="hover:bg-gray-50/80 transition-colors group"
              >
                {/* Company */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F3F3] text-[#0E6162] font-bold text-xs flex-shrink-0 border border-[#CCE7E8]">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-1.5 max-w-full">
                        <Link
                          href={`/applications/${app.id}`}
                          className="font-semibold text-[#111827] hover:text-[#0E6162] transition-colors truncate"
                        >
                          {app.company_name}
                        </Link>
                        {app.job_url && (
                          <a
                            href={app.job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#0E6162] flex-shrink-0"
                            title="Open external job link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {app.salary && (
                        <p className="text-[11px] text-[#5A646E]">
                          {formatSalary(app.salary, app.currency, app.salary_period)}
                        </p>
                      )}
                    </div>

                  </div>
                </td>

                {/* Position */}
                <td className="py-3.5 px-4 font-medium text-[#111827]">
                  {app.position}
                </td>

                {/* Location */}
                <td className="py-3.5 px-4 text-xs text-[#5A646E]">
                  {app.location ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {app.location}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <ApplicationStatusBadge status={app.status} size="sm" />
                </td>

                {/* Applied Date */}
                <td className="py-3.5 px-4 text-xs text-[#5A646E]">
                  {formatDate(app.application_date)}
                </td>

                {/* Interview Date */}
                <td className="py-3.5 px-4 text-xs text-[#5A646E]">
                  {app.interview_date ? (
                    <span className="inline-flex items-center gap-1 text-[#0E6162] font-medium bg-[#E7F3F3] px-2 py-0.5 rounded">
                      <Calendar className="w-3 h-3" />
                      {formatDate(app.interview_date)}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/applications/${app.id}`}
                      className="p-1.5 text-gray-400 hover:text-[#0E6162] hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/applications/${app.id}/edit`}
                      className="p-1.5 text-gray-400 hover:text-[#0E6162] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit Application"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDeleteClick(app)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
