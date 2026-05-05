export function fmt1(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return '—';
  return v.toFixed(1);
}

export function fmt0(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return '—';
  return Math.round(v).toString();
}

export function formatHour(timeStr: string): string {
  // timeStr: "2024-05-06T14:00"
  const d = new Date(timeStr);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  // Show date if not same as first hour
  return `${h}:${m}`;
}

export function formatHourWithDate(timeStr: string): string {
  const d = new Date(timeStr);
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  const h = String(d.getHours()).padStart(2, '0');
  return `${mo}/${day} ${h}:00`;
}

export function tickFormatter(timeStr: string): string {
  const d = new Date(timeStr);
  const h = d.getHours();
  if (h === 0) {
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }
  return `${h}:00`;
}
