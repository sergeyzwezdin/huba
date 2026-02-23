/**
 * Date-time formatter using en-US locale
 */
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
})

/**
 * Format date-time using Intl
 * Returns format: MM/DD/YYYY, HH:MM
 */
export const formatDateTime = (date: Date): string => {
    return dateTimeFormatter.format(date)
}
