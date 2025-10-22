'use client';

import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import { useHolidays } from '@/hooks/useHolidays';
import { format } from 'date-fns';
import TypeChip from '../TypeChip/TypeChip';

export default function HolidayCalendar() {
  const { holidays } = useHolidays(2025);

  const byDate = useMemo(() => {
    const m = new Map<string, { name: string; type: string }[]>();
    for (const h of holidays) {
      const arr = m.get(h.iso) ?? [];
      arr.push({ name: h.name, type: h.type });
      m.set(h.iso, arr);
    }
    return m;
  }, [holidays]);

  const dates = useMemo(() => new Set(byDate.keys()), [byDate]);
  const [selected, setSelected] = useState<Dayjs | null>(dayjs('2025-01-01'));
  const selectedIso = selected?.format('YYYY-MM-DD');
  const selectedHolidays = (selectedIso && byDate.get(selectedIso)) || [];

  const HolidayDay = (props: PickersDayProps) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const iso = day.format('YYYY-MM-DD');
    const isHoliday = dates.has(iso);

    return (
      <Badge
        overlap="circular"
        color="secondary"
        variant={isHoliday ? 'dot' : 'standard'}
      >
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
        />
      </Badge>
    );
  };

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
      <Box flex={1}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Calendário de feriados (2025)
        </Typography>

        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selected}
          onChange={(v) => setSelected(v)}
          views={['day']}
          slotProps={{ actionBar: { actions: [] } }}
          slots={{ day: HolidayDay }}
        />
      </Box>

      <Box flex={1}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              {selected
                ? `Selecionado: ${format(selected.toDate(), 'dd/MM/yyyy')}`
                : '—'}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            {selectedHolidays.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Não há feriado nesta data.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {selectedHolidays.map((h) => (
                  <Stack
                    key={`${selectedIso}-${h.name}`}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <Typography fontWeight={600}>{h.name}</Typography>
                    <TypeChip type={h.type} />
                  </Stack>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
