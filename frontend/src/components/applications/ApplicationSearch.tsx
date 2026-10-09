"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface ApplicationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ApplicationSearch({
  value,
  onChange,
  placeholder = "Search companies or positions...",
}: ApplicationSearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounce search input (Section 18 & 83)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== value) {
        onChange(searchTerm);
      }
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm, onChange, value]);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <Search className="h-4 w-4" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E7DEDF] bg-white py-2 pl-9 pr-8 text-sm text-[#19332F] placeholder-[#98A5A1] transition-colors focus:border-[#006764] focus:outline-none focus:ring-2 focus:ring-[#006764]/15"
      />

      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm("");
            onChange("");
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#687873] hover:text-[#19332F]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
