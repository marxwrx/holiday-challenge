'use client';

import { Chip } from '@mui/material';

export default function TypeChip({ type }: { type: string }) {
  const norm = (type || 'unknown').toLowerCase();

  const colorStyle =
    norm === 'nacional' || norm === 'national'
      ? { bgcolor: '#b7eb57ff', color: '#1b3a0a' }
      : norm === 'municipal'
        ? { bgcolor: '#f4c62dff', color: '#5a4100' }
        : norm === 'estadual' || norm === 'state'
          ? { bgcolor: '#137ef8ff', color: '#103a66' }
          : { bgcolor: '#e5e7eb', color: '#111827' };

  return (
    <Chip
      size="small"
      label={type || 'Desconhecido'}
      sx={{
        borderRadius: 999,
        px: 1,
        fontWeight: 500,
        ...colorStyle,
      }}
    />
  );
}
