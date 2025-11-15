import { z } from 'zod'

/**
 * Email validation schema
 */
export const emailSchema = z.string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')

/**
 * Password validation schema
 * Requirements: min 8 chars, 1 uppercase, 1 lowercase, 1 number
 */
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

/**
 * Login validation schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

/**
 * Registration validation schema
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

/**
 * Profile update validation schema
 */
export const profileSchema = z.object({
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  hourly_rate: z.number().min(0, 'Hourly rate must be positive').optional(),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
})

/**
 * Job filter validation schema
 */
export const jobFilterSchema = z.object({
  status: z.enum(['new', 'interested', 'applied', 'interviewing', 'hired', 'declined', 'archived']).optional(),
  min_score: z.number().min(0).max(100).optional(),
  max_score: z.number().min(0).max(100).optional(),
  budget_type: z.enum(['fixed', 'hourly']).optional(),
  min_budget: z.number().min(0).optional(),
  max_budget: z.number().min(0).optional(),
  category: z.string().optional(),
  skills: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sort_by: z.enum(['match_score', 'posted_at', 'created_at']).default('match_score'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
})

/**
 * Proposal validation schema
 */
export const proposalSchema = z.object({
  content: z.string().min(50, 'Proposal must be at least 50 characters').max(5000, 'Proposal must be less than 5000 characters'),
  rate_proposed: z.number().min(0).optional(),
})

/**
 * Notification preferences validation schema
 */
export const notificationPreferencesSchema = z.object({
  email: z.boolean().default(true),
  push: z.boolean().default(true),
  immediate_score_threshold: z.number().min(0).max(100).default(90),
  hourly_digest: z.boolean().default(true),
  daily_summary: z.boolean().default(true),
})

/**
 * User preferences validation schema
 */
export const userPreferencesSchema = z.object({
  filters: z.object({
    min_budget: z.number().min(0).optional(),
    min_hire_rate: z.number().min(0).max(100).default(50),
    excluded_keywords: z.array(z.string()).default([]),
    preferred_categories: z.array(z.string()).default([]),
    blacklisted_clients: z.array(z.string()).default([]),
  }).optional(),
  notifications: notificationPreferencesSchema.optional(),
})

/**
 * Sanitize HTML string to prevent XSS
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHtml(html) {
  if (typeof window === 'undefined') return html

  // Basic sanitization - in production, use DOMPurify
  const temp = document.createElement('div')
  temp.textContent = html
  return temp.innerHTML
}

/**
 * Validate and sanitize user input
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''

  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
}

/**
 * Check if value is a valid URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if value is a valid email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validateFile(file, options = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  } = options

  const errors = []

  if (!file) {
    errors.push('No file provided')
    return { valid: false, errors }
  }

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`)
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
