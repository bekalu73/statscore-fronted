export function formatEventDate(dateStr: string): string {
  return new Date(dateStr)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    .toUpperCase();
}

export function formatDateParam(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDatePicker(date: Date): { dayName: string; dayNum: string; month: string } {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return {
    dayName: dayNames[date.getDay()],
    dayNum: date.getDate().toString(),
    month: monthNames[date.getMonth()],
  };
}

export function generateDateRange(centerDate: Date, range = 3): Date[] {
  return Array.from({ length: range * 2 + 1 }, (_, i) => {
    const d = new Date(centerDate);
    d.setDate(d.getDate() + (i - range));
    return d;
  });
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}
