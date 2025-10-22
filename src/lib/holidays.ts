import { HolidayDTO, HolidayVO } from './types';

export function toVOs(raw: HolidayDTO[]): HolidayVO[] {
  return raw.map(
    (h) =>
      new HolidayVO({
        date: h.date,
        name: h.name,
        type: h.type ?? 'unknown',
      }),
  );
}

export function sortByDateAsc(a: HolidayVO, b: HolidayVO): number {
  return a.date.getTime() - b.date.getTime();
}
