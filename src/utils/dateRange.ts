import { DisplayMode, TimeRange } from '../types/weather';

function toJSTDate(date: Date): Date {
  // Returns a new Date adjusted so that getFullYear/getMonth/getDate give JST values
  // Open-Meteo uses Asia/Tokyo so we work with local-like dates
  return date;
}

export function getTimeRange(
  mode: DisplayMode,
  options?: {
    competitionStartDate?: string;
    competitionEndDate?: string;
    customStart?: string;
    customEnd?: string;
  }
): TimeRange {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  switch (mode) {
    case 'today_tomorrow': {
      const start = new Date(today);
      const end = new Date(tomorrow);
      end.setHours(23, 0, 0, 0);
      return { mode, start, end };
    }
    case 'night_to_tomorrow': {
      const start = new Date(today);
      start.setHours(18, 0, 0, 0);
      const end = new Date(tomorrow);
      end.setHours(18, 0, 0, 0);
      return { mode, start, end };
    }
    case 'tomorrow_only': {
      const start = new Date(tomorrow);
      const end = new Date(tomorrow);
      end.setHours(23, 0, 0, 0);
      return { mode, start, end };
    }
    case 'competition_range': {
      const sd = options?.competitionStartDate ?? formatDate(today);
      const ed = options?.competitionEndDate ?? formatDate(tomorrow);
      const start = new Date(sd + 'T00:00:00');
      const end = new Date(ed + 'T23:00:00');
      return { mode, start, end, competitionStartDate: sd, competitionEndDate: ed };
    }
    case 'custom': {
      const cs = options?.customStart ?? formatDate(today) + 'T00:00';
      const ce = options?.customEnd ?? formatDate(tomorrow) + 'T23:00';
      const start = new Date(cs);
      const end = new Date(ce);
      return { mode, start, end, customStart: cs, customEnd: ce };
    }
  }
}

export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function formatDateDisplay(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function formatDateTimeDisplay(d: Date): string {
  return `${formatDateDisplay(d)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}


export function formatDateHour(d: Date): string {
  const h = String(d.getHours()).padStart(2, '0');
  return `${formatDate(d)}T${h}:00`;
}
