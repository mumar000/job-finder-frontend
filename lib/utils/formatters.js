/**
 * Format currency with proper locale
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date to human-readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  if (!date) return ''

  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) return ''

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj)
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
  if (!date) return ''

  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) return ''

  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  }
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  }
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  }
  const years = Math.floor(diffInSeconds / 31536000)
  return `${years} ${years === 1 ? 'year' : 'years'} ago`
}

/**
 * Format number with abbreviation (e.g., 1.5K, 2.3M)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0'

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

/**
 * Format match score with color indicator
 * @param {number} score - Match score (0-100)
 * @returns {Object} Object with formatted score and color class
 */
export function formatMatchScore(score) {
  if (typeof score !== 'number' || isNaN(score)) {
    return { score: 0, label: 'N/A', color: 'text-muted-foreground' }
  }

  const roundedScore = Math.round(score)

  let label = 'Low'
  let color = 'text-destructive'

  if (roundedScore >= 90) {
    label = 'Excellent'
    color = 'text-green-600 dark:text-green-500'
  } else if (roundedScore >= 70) {
    label = 'Good'
    color = 'text-blue-600 dark:text-blue-500'
  } else if (roundedScore >= 50) {
    label = 'Decent'
    color = 'text-yellow-600 dark:text-yellow-500'
  }

  return { score: roundedScore, label, color }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Format job budget range
 * @param {Object} job - Job object
 * @returns {string} Formatted budget string
 */
export function formatBudget(job) {
  if (!job) return 'N/A'

  const { budget_type, budget_min, budget_max } = job

  if (budget_type === 'hourly') {
    if (budget_min && budget_max) {
      return `${formatCurrency(budget_min)} - ${formatCurrency(budget_max)}/hr`
    }
    if (budget_min) {
      return `${formatCurrency(budget_min)}/hr`
    }
    return 'Hourly'
  }

  if (budget_min && budget_max) {
    return `${formatCurrency(budget_min)} - ${formatCurrency(budget_max)}`
  }
  if (budget_min) {
    return `${formatCurrency(budget_min)}`
  }
  return 'Fixed Price'
}
