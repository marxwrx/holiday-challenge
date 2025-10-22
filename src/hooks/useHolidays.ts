import useSWR from 'swr';
import { format } from 'date-fns';
import { HolidayDTO, HolidayVO } from '@/lib/types';
import { toVOs, sortByDateAsc } from '@/lib/holidays';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type UseHolidays = {
  holidays: HolidayVO[];
  error: unknown;
  isLoading: boolean;
  refresh: () => void;
};

export function useHolidays(year: number = 2025): UseHolidays {
  const { data, error, isLoading, mutate } = useSWR<HolidayDTO[]>(
    `https://brasilapi.com.br/api/feriados/v1/${year}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  const holidays = data ? toVOs(data).sort(sortByDateAsc) : [];

  (holidays as any).format = (iso: string) =>
    format(new Date(`${iso}T00:00:00`), 'dd/MM/yyyy');

  return { holidays, error, isLoading, refresh: () => void mutate() };
}
