export type SimpleHoliday = { name: string; iso: string; type: string };

export function buildCSV(holidays: SimpleHoliday[]): string {
  const header = ['name', 'date', 'type'].join(',');
  const rows = holidays.map((h) => [h.name, h.iso, h.type].join(','));
  return [header, ...rows].join('\n');
}

export function buildJSON(holidays: SimpleHoliday[]): string {
  const arr = holidays.map((h) => ({
    name: h.name,
    date: h.iso,
    type: h.type,
  }));
  return JSON.stringify(arr, null, 2);
}
