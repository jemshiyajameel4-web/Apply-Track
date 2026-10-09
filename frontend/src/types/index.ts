export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Technical Round"
  | "Offer"
  | "Rejected";

export type InterviewType =
  | "Phone Screen"
  | "HR Interview"
  | "Technical Interview"
  | "Managerial Interview"
  | "Final Interview"
  | "Other";

export type SalaryPeriod = "Annual" | "Monthly" | "Hourly";

export type Currency = "INR" | "USD" | "EUR" | "GBP";

export interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface StatusHistory {
  id: number;
  from_status: ApplicationStatus | null;
  to_status: ApplicationStatus;
  notes: string | null;
  changed_at: string;
}

export interface Application {
  id: number;
  user_id: number;
  company_name: string;
  position: string;
  location: string | null;
  job_url: string | null;
  salary: number | null;
  salary_period: SalaryPeriod | null;
  currency: Currency;
  application_date: string;
  status: ApplicationStatus;
  interview_date: string | null;
  interview_type: InterviewType | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  status_history: StatusHistory[];
}

export interface ApplicationFormData {
  company_name: string;
  position: string;
  location?: string;
  job_url?: string;
  salary?: number | "";
  salary_period?: SalaryPeriod;
  currency?: Currency;
  application_date: string;
  status: ApplicationStatus;
  interview_date?: string;
  interview_type?: InterviewType | "";
  notes?: string;
}

export interface PaginatedApplications {
  items: Application[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface DashboardStats {
  total_applications: number;
  applied_count: number;
  interview_count: number;
  technical_round_count: number;
  offer_count: number;
  rejected_count: number;
  upcoming_interviews_count: number;
  interview_rate: number;
  offer_rate: number;
}


export interface StatusDistributionItem {
  name: string;
  status: ApplicationStatus;
  count: number;
  color: string;
}

export interface UpcomingInterviewItem {
  id: number;
  company_name: string;
  position: string;
  location: string | null;
  interview_date: string;
  interview_type: InterviewType | null;
  status: ApplicationStatus;
}
