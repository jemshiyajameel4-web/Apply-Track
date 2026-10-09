import {
  User,
  Application,
  PaginatedApplications,
  DashboardStats,
  StatusDistributionItem,
  UpcomingInterviewItem,
  ApplicationFormData,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("applytrack_token");
}

async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("applytrack_token");
        localStorage.removeItem("applytrack_user");
        if (
          !window.location.pathname.startsWith("/login") &&
          !window.location.pathname.startsWith("/register") &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/login?session_expired=true";
        }
      }
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        data?.detail ||
        (Array.isArray(data?.detail)
          ? data.detail.map((e: any) => e.msg).join(", ")
          : null) ||
        "An unexpected error occurred. Please try again.";
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error. Please check your backend connection.", 0);
  }
}

// ==========================================
// Authentication API
// ==========================================
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    return fetchClient<{ access_token: string; token_type: string; user: User }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );
  },

  register: async (userData: {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    return fetchClient<{ access_token: string; token_type: string; user: User }>(
      "/api/auth/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      }
    );
  },

  getMe: async () => {
    return fetchClient<User>("/api/auth/me");
  },

  logout: async () => {
    return fetchClient<{ detail: string }>("/api/auth/logout", {
      method: "POST",
    });
  },
};

// ==========================================
// Users API
// ==========================================
export const usersApi = {
  updateProfile: async (data: { full_name?: string; email?: string }) => {
    return fetchClient<User>("/api/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  changePassword: async (data: {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  }) => {
    return fetchClient<{ detail: string }>("/api/users/me/password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

// ==========================================
// Applications API
// ==========================================
export const applicationsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sort?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.search) query.append("search", params.search);
    if (params?.status && params.status !== "All")
      query.append("status", params.status);
    if (params?.sort) query.append("sort", params.sort);

    const queryString = query.toString();
    return fetchClient<PaginatedApplications>(
      `/api/applications${queryString ? `?${queryString}` : ""}`
    );
  },

  getById: async (id: number | string) => {
    return fetchClient<Application>(`/api/applications/${id}`);
  },

  create: async (data: ApplicationFormData) => {
    return fetchClient<Application>("/api/applications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id: number | string, data: Partial<ApplicationFormData>) => {
    return fetchClient<Application>(`/api/applications/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number | string) => {
    return fetchClient<{ detail: string }>(`/api/applications/${id}`, {
      method: "DELETE",
    });
  },
};

// ==========================================
// Dashboard API
// ==========================================
export const dashboardApi = {
  getStats: async () => {
    return fetchClient<DashboardStats>("/api/dashboard/stats");
  },

  getStatusDistribution: async () => {
    return fetchClient<StatusDistributionItem[]>(
      "/api/dashboard/status-distribution"
    );
  },

  getRecentApplications: async (limit: number = 5) => {
    return fetchClient<Application[]>(
      `/api/dashboard/recent-applications?limit=${limit}`
    );
  },

  getUpcomingInterviews: async (limit: number = 5) => {
    return fetchClient<UpcomingInterviewItem[]>(
      `/api/dashboard/upcoming-interviews?limit=${limit}`
    );
  },
};
