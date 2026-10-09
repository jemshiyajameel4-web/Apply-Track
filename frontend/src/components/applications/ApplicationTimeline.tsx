import React from "react";
import { StatusHistory } from "@/types";
import { formatDate } from "@/lib/utils";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { CircleDot, Clock } from "lucide-react";

interface ApplicationTimelineProps {
  history: StatusHistory[];
  createdAt: string;
}

export function ApplicationTimeline({
  history,
  createdAt,
}: ApplicationTimelineProps) {
  if (!history || history.length === 0) {
    return (
      <div className="flex items-center gap-2 text-xs text-[#687873]">
        <Clock className="w-4 h-4 text-[#98A5A1]" />
        <span>Application created on {formatDate(createdAt)}</span>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {history.map((event, eventIdx) => {
          const isLast = eventIdx === history.length - 1;

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-[#E7DEDF]"
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex items-start space-x-3">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F3F2] text-[#006764] ring-8 ring-white border border-[#B2DCDA]">
                    <CircleDot className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-[#19332F]">
                          {event.from_status
                            ? `Status updated to`
                            : `Application created with status`}
                        </span>
                        <ApplicationStatusBadge status={event.to_status} size="sm" />
                      </div>
                      <time className="text-[#98A5A1] text-[11px] sm:text-xs">
                        {formatDate(event.changed_at)}
                      </time>
                    </div>

                    {event.notes && (
                      <p className="mt-1 text-xs text-[#687873] break-words">{event.notes}</p>
                    )}
                  </div>

                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
