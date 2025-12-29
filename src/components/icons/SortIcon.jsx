import React from "react";

export const SortIcon = ({ direction = "none", className = "" }) => {
  // direction: "none", "asc", "desc"
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M6 9L12 3L18 9" stroke={direction === 'asc' ? '#2563eb' : '#9ca3af'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 15L12 21L6 15" stroke={direction === 'desc' ? '#2563eb' : '#9ca3af'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
