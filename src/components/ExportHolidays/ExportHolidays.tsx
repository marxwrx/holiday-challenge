'use client';

import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { useHolidays } from '@/hooks/useHolidays';
import { buildCSV, buildJSON } from '@/lib/exporters';
import { downloadText } from '@/lib/download';

export default function ExportHolidays() {
  const { holidays, isLoading } = useHolidays(2025);

  const handleCSV = () => {
    const csv = buildCSV(holidays);
    downloadText('holidays-2025.csv', csv, 'text/csv;charset=utf-8;');
  };

  const handleJSON = () => {
    const json = buildJSON(holidays);
    downloadText('holidays-2025.json', json, 'application/json;charset=utf-8;');
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Exportar feriados (2025)</Typography>
      <ButtonGroup variant="contained" disabled={isLoading}>
        <Button onClick={handleCSV}>Exportar CSV</Button>
        <Button onClick={handleJSON}>Exportar JSON</Button>
      </ButtonGroup>
      {!isLoading && (
        <Typography variant="caption" color="text.secondary">
          {holidays.length} registros para exportar
        </Typography>
      )}
    </Stack>
  );
}
