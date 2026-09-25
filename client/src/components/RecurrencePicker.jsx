import { FREQUENCIES, WEEKDAY_LABELS, describeRecurrence } from '../utils.js'

// A toggleable set of day buttons. Used both for the weekday row (weekly)
// and the 1-31 calendar grid (monthly).
function DayPicker({ days, selected, onChange, className, buttonClassName, label }) {
  function toggle(day) {
    onChange(selected.includes(day) ? selected.filter((d) => d !== day) : [...selected, day])
  }

  return (
    <div className={className} role="group" aria-label={label}>
      {days.map(({ value, text }) => {
        const isSelected = selected.includes(value)
        return (
          <button
            key={value}
            type="button"
            className={`${buttonClassName}${isSelected ? ' selected' : ''}`}
            aria-pressed={isSelected}
            onClick={() => toggle(value)}
          >
            {text}
          </button>
        )
      })}
    </div>
  )
}

const WEEKDAYS = WEEKDAY_LABELS.map((text, value) => ({ value, text }))
const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, text: i + 1 }))

// Controlled editor for { frequency, daysOfWeek, daysOfMonth }.
export default function RecurrencePicker({ value, onChange }) {
  const { frequency, daysOfWeek, daysOfMonth } = value
  const summary = describeRecurrence({ frequency, daysOfWeek, daysOfMonth })
  const needsDays =
    (frequency === 'weekly' && daysOfWeek.length === 0) ||
    (frequency === 'monthly' && daysOfMonth.length === 0)

  return (
    <div className="border rounded p-3 mb-3">
      <fieldset className="mb-3">
        <legend className="form-label h6">Repeats</legend>
        {FREQUENCIES.map((f) => (
          <div className="form-check form-check-inline" key={f}>
            <input
              className="form-check-input"
              type="radio"
              name="frequency"
              id={`freq-${f}`}
              value={f}
              checked={frequency === f}
              onChange={() => onChange({ ...value, frequency: f })}
            />
            <label className="form-check-label" htmlFor={`freq-${f}`}>
              {f[0].toUpperCase() + f.slice(1)}
            </label>
          </div>
        ))}
      </fieldset>

      {frequency === 'weekly' && (
        <div className="mb-3">
          <p className="form-label h6 mb-2">Repeat on</p>
          <DayPicker
            days={WEEKDAYS}
            selected={daysOfWeek}
            onChange={(days) => onChange({ ...value, daysOfWeek: days })}
            className="d-flex flex-wrap gap-2"
            buttonClassName="weekday-btn"
            label="Days of the week"
          />
        </div>
      )}

      {frequency === 'monthly' && (
        <div className="mb-3">
          <p className="form-label h6 mb-2">Repeat on day(s) of the month</p>
          <DayPicker
            days={MONTH_DAYS}
            selected={daysOfMonth}
            onChange={(days) => onChange({ ...value, daysOfMonth: days })}
            className="calendar-grid"
            buttonClassName=""
            label="Days of the month"
          />
        </div>
      )}

      <p className="text-muted small mb-0" aria-live="polite">
        {needsDays ? 'Pick at least one day above.' : summary}
      </p>
    </div>
  )
}
