// timezone used to group revenue by day (set APP_TIMEZONE in .env to change it)
const TZ = process.env.APP_TIMEZONE || 'Asia/Colombo';

// "5m", "2h", "1d", "3w" (used in the dashboard message list)
export const shortAgo = (date) => {
  const s = Math.max(0, (Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return 'now';
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  if (s < 604800) return `${Math.floor(s / 86400)}d`;
  return `${Math.floor(s / 604800)}w`;
};

// "Updated just now", "Updated 3 hours ago" (used in the dashboard content status)
export const updatedAgo = (date) => {
  const s = Math.max(0, (Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return 'Updated just now';
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  if (s < 3600) return `Updated ${plural(Math.floor(s / 60), 'minute')} ago`;
  if (s < 86400) return `Updated ${plural(Math.floor(s / 3600), 'hour')} ago`;
  if (s < 2592000) return `Updated ${plural(Math.floor(s / 86400), 'day')} ago`;
  return `Updated ${plural(Math.floor(s / 2592000), 'month')} ago`;
};

// "2025-03-07" in the restaurant's timezone
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
export const dayKey = (date) => dayFmt.format(new Date(date));

const weekdayFmt = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' });
const dayNumFmt = new Intl.DateTimeFormat('en-US', { timeZone: TZ, day: 'numeric' });
const DAY_MS = 86400000;

// last `n` days ending today: [{ key, weekday, day }]
export const lastDays = (n) => {
  const now = Date.now();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now - (n - 1 - i) * DAY_MS);
    return { key: dayKey(d), weekday: weekdayFmt.format(d), day: dayNumFmt.format(d) };
  });
};

// last `n` months ending this month: [{ key: "2025-03", label: "Mar" }]
export const lastMonths = (n) => {
  const [year, month] = dayKey(new Date()).split('-').map(Number);
  return Array.from({ length: n }, (_, i) => {
    const offset = n - 1 - i;
    const idx = year * 12 + (month - 1) - offset;
    const y = Math.floor(idx / 12);
    const m = (idx % 12) + 1;
    const label = new Date(Date.UTC(y, m - 1, 15)).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    return { key: `${y}-${String(m).padStart(2, '0')}`, label };
  });
};

export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
