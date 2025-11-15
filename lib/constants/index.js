/**
 * Application Constants
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
export const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || '/api'
export const API_URL = `${API_BASE_URL}${API_PREFIX}`

// Authentication
export const JWT_COOKIE_NAME = process.env.NEXT_PUBLIC_JWT_COOKIE_NAME || 'job_finder_token'
export const TOKEN_EXPIRY_DAYS = 7

// Job Status
export const JOB_STATUS = {
  NEW: 'new',
  INTERESTED: 'interested',
  APPLIED: 'applied',
  INTERVIEWING: 'interviewing',
  HIRED: 'hired',
  DECLINED: 'declined',
  ARCHIVED: 'archived',
}

export const JOB_STATUS_LABELS = {
  [JOB_STATUS.NEW]: 'New',
  [JOB_STATUS.INTERESTED]: 'Interested',
  [JOB_STATUS.APPLIED]: 'Applied',
  [JOB_STATUS.INTERVIEWING]: 'Interviewing',
  [JOB_STATUS.HIRED]: 'Hired',
  [JOB_STATUS.DECLINED]: 'Declined',
  [JOB_STATUS.ARCHIVED]: 'Archived',
}

export const JOB_STATUS_COLORS = {
  [JOB_STATUS.NEW]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [JOB_STATUS.INTERESTED]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [JOB_STATUS.APPLIED]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [JOB_STATUS.INTERVIEWING]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  [JOB_STATUS.HIRED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [JOB_STATUS.DECLINED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [JOB_STATUS.ARCHIVED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
}

// Budget Types
export const BUDGET_TYPE = {
  FIXED: 'fixed',
  HOURLY: 'hourly',
}

export const BUDGET_TYPE_LABELS = {
  [BUDGET_TYPE.FIXED]: 'Fixed Price',
  [BUDGET_TYPE.HOURLY]: 'Hourly',
}

// Proposal Status
export const PROPOSAL_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  RESPONDED: 'responded',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
}

export const PROPOSAL_STATUS_LABELS = {
  [PROPOSAL_STATUS.DRAFT]: 'Draft',
  [PROPOSAL_STATUS.SUBMITTED]: 'Submitted',
  [PROPOSAL_STATUS.RESPONDED]: 'Responded',
  [PROPOSAL_STATUS.ACCEPTED]: 'Accepted',
  [PROPOSAL_STATUS.REJECTED]: 'Rejected',
}

// Notification Types
export const NOTIFICATION_TYPE = {
  NEW_JOB: 'new_job',
  HIGH_MATCH: 'high_match',
  CLIENT_RESPONSE: 'client_response',
  REMINDER: 'reminder',
  SYSTEM: 'system',
}

// Match Score Thresholds
export const MATCH_SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 70,
  DECENT: 50,
  LOW: 0,
}

export const MATCH_SCORE_LABELS = {
  EXCELLENT: 'Excellent Match',
  GOOD: 'Good Match',
  DECENT: 'Decent Match',
  LOW: 'Low Match',
}

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// Sort Options
export const SORT_OPTIONS = [
  { value: 'match_score', label: 'Match Score' },
  { value: 'posted_at', label: 'Posted Date' },
  { value: 'created_at', label: 'Created Date' },
]

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  JOBS: '/dashboard/jobs',
  JOB_DETAIL: (id) => `/dashboard/jobs/${id}`,
  ANALYTICS: '/dashboard/analytics',
  PROPOSALS: '/dashboard/proposals',
  SETTINGS: '/dashboard/settings',
  NOTIFICATIONS: '/dashboard/notifications',
}

// Navigation Items
export const NAVIGATION_ITEMS = [
  {
    name: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    name: 'Jobs',
    href: ROUTES.JOBS,
    icon: 'Briefcase',
  },
  {
    name: 'Proposals',
    href: ROUTES.PROPOSALS,
    icon: 'FileText',
  },
  {
    name: 'Analytics',
    href: ROUTES.ANALYTICS,
    icon: 'BarChart',
  },
  {
    name: 'Settings',
    href: ROUTES.SETTINGS,
    icon: 'Settings',
  },
]

// Feature Flags
export const FEATURES = {
  ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  NOTIFICATIONS: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
}

// Validation Limits
export const LIMITS = {
  BIO_MAX_LENGTH: 500,
  PROPOSAL_MIN_LENGTH: 50,
  PROPOSAL_MAX_LENGTH: 5000,
  SKILLS_MIN_COUNT: 1,
  SKILLS_MAX_COUNT: 50,
  FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You must be logged in to access this resource.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  REGISTER: 'Account created successfully!',
  LOGOUT: 'Successfully logged out!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  JOB_UPDATED: 'Job status updated successfully!',
  PROPOSAL_SUBMITTED: 'Proposal submitted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
}
