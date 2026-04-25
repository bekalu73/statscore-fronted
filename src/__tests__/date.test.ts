/// <reference types="jest" />
import {
  formatEventDate,
  formatDateParam,
  formatDatePicker,
  generateDateRange,
  isSameDay,
  isToday,
} from '../utils/date';

describe('formatEventDate', () => {
  it('formats a date string to uppercase short date', () => {
    expect(formatEventDate('2024-06-15')).toBe('15 JUN');
  });
});

describe('formatDateParam', () => {
  it('formats date to YYYY-MM-DD', () => {
    expect(formatDateParam(new Date(2024, 5, 5))).toBe('2024-06-05');
  });

  it('pads single-digit month and day', () => {
    expect(formatDateParam(new Date(2024, 0, 1))).toBe('2024-01-01');
  });
});

describe('formatDatePicker', () => {
  it('returns correct dayName, dayNum, and month', () => {
    const result = formatDatePicker(new Date(2024, 0, 1)); // Monday Jan 1 2024
    expect(result.dayName).toBe('MON');
    expect(result.dayNum).toBe('1');
    expect(result.month).toBe('JAN');
  });
});

describe('generateDateRange', () => {
  it('generates correct number of dates (range * 2 + 1)', () => {
    const dates = generateDateRange(new Date(2024, 5, 15), 3);
    expect(dates).toHaveLength(7);
  });

  it('centers on the given date', () => {
    const center = new Date(2024, 5, 15);
    const dates = generateDateRange(center, 2);
    expect(formatDateParam(dates[2])).toBe('2024-06-15');
  });
});

describe('isSameDay', () => {
  it('returns true for same day', () => {
    expect(isSameDay(new Date(2024, 5, 15), new Date(2024, 5, 15))).toBe(true);
  });

  it('returns false for different days', () => {
    expect(isSameDay(new Date(2024, 5, 15), new Date(2024, 5, 16))).toBe(false);
  });
});

describe('isToday', () => {
  it('returns true for today', () => {
    expect(isToday(new Date())).toBe(true);
  });

  it('returns false for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isToday(yesterday)).toBe(false);
  });
});
