'use client';

import { useMemo, useState } from 'react';
import { Alert, Box, Divider, Stack, Typography } from '@mui/material';
import Tabs from '@/components/Tabs/Tabs';
import SearchBar from '@/components/SearchBar/SearchBar';
import Filters from '@/components/Filters/Filters';
import SortButton from '@/components/SortButton/SortButton';
import HolidaysTable from '@/components/HolidaysTable/HolidaysTable';
import HolidayCalendar from '@/components/HolidayCalendar/HolidayCalendar';
import ExportHolidays from '@/components/ExportHolidays/ExportHolidays';
import { useHolidays } from '@/hooks/useHolidays';
import type { HolidayVO } from '@/lib/types';

export default function HomePage() {
  const { holidays, error, isLoading } = useHolidays(2025);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<{ type?: string; date?: string }>({});
  const [desc, setDesc] = useState(false);

  const types = useMemo(
    () => Array.from(new Set(holidays.map((h) => h.type))).filter(Boolean),
    [holidays],
  );

  const filtered: HolidayVO[] = useMemo(() => {
    let arr = holidays;
    if (query)
      arr = arr.filter((h) =>
        h.name.toLowerCase().includes(query.toLowerCase()),
      );
    if (filter.type) arr = arr.filter((h) => h.type === filter.type);
    if (filter.date) arr = arr.filter((h) => h.iso === filter.date);
    if (desc) arr = [...arr].reverse();
    return arr;
  }, [holidays, query, filter, desc]);

  if (error) return <Alert severity="error">Falha ao carregar feriados.</Alert>;

  const holidaysToolbar = (
    <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
      <SearchBar onSearch={setQuery} placeholder="Busque por nome" />
      <Typography sx={{ ml: 'auto', color: 'text.secondary' }}>
        <strong>{filtered.length}</strong> REGISTROS
      </Typography>
      <SortButton descending={desc} onToggle={() => setDesc((x) => !x)} />
    </Stack>
  );

  const holidaysFilters = (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
      <Filters
        types={types}
        onChange={(patch) => setFilter((prev) => ({ ...prev, ...patch }))}
      />
    </Stack>
  );

  const holidaysPanel = (
    <Stack spacing={2}>
      {holidaysToolbar}
      {holidaysFilters}
      <Divider />
      {isLoading ? <div>Carregando…</div> : <HolidaysTable items={filtered} />}
    </Stack>
  );

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ color: 'text.secondary', mb: 1, letterSpacing: 0.5 }}
      >
        MEUS FERIADOS
      </Typography>

      <Tabs
        items={[
          { id: 'calendar', label: 'Calendário', content: <HolidayCalendar /> },
          { id: 'export', label: 'Exportar', content: <ExportHolidays /> },
          { id: 'holidays', label: 'Feriados', content: holidaysPanel },
        ]}
        defaultTabId="holidays"
      />

      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}
