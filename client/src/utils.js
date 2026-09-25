// Income and expenses get their own category lists - swapped in whenever
// the Type toggle changes.
export const CATEGORIES = {
  expense: ['Food', 'Transportation', 'Housing', 'Entertainment', 'Utilities', 'Other'],
  income: ['Salary', 'Freelance', 'Gift', 'Investment', 'Other']
}

export const CATEGORY_ICONS = {
  Food: '🍔',
  Transportation: '🚗',
  Housing: '🏠',
  Entertainment: '🎬',
  Utilities: '💡',
  Salary: '💼',
  Freelance: '🧑‍💻',
  Gift: '🎁',
  Investment: '📈',
  Other: '📦'
}

export const PAYMENT_METHODS = ['Cash', 'Card', 'Other']
export const FREQUENCIES = ['daily', 'weekly', 'monthly']
export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(dateString) {
  const d = new Date(dateString)
  // Dates are stored as UTC midnight, so format in UTC to avoid showing the day before
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`
}

export function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

// Turns a recurrence object into a readable sentence, e.g.
// "Repeats weekly on Mon, Wed" - shared by the live form summary and the
// results table.
export function describeRecurrence(recurrence) {
  if (!recurrence || !recurrence.frequency) return ''

  if (recurrence.frequency === 'daily') return 'Repeats daily'

  if (recurrence.frequency === 'weekly') {
    const days = (recurrence.daysOfWeek || []).slice().sort((a, b) => a - b).map((d) => WEEKDAY_LABELS[d])
    return days.length ? `Repeats weekly on ${days.join(', ')}` : 'Repeats weekly'
  }

  if (recurrence.frequency === 'monthly') {
    const days = (recurrence.daysOfMonth || []).slice().sort((a, b) => a - b).map(ordinal)
    return days.length ? `Repeats monthly on the ${days.join(', ')}` : 'Repeats monthly'
  }

  return ''
}

// Wraps fetch so every component handles an expired session the same way:
// bounce back to the (non-React) login page.
export async function api(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: options.body ? { 'Content-Type': 'application/json' } : undefined
  })
  if (res.status === 401) {
    window.location.href = '/login.html'
    throw new Error('Not logged in')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed.')
  return data
}
