'use client';

import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import type { FiltersProps } from './Filters.types';

const pillSx = {
  borderRadius: 999,
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
};

export default function Filters({ types, onChange }: FiltersProps) {
  const handleType = (e: SelectChangeEvent<string>) => {
    const value = e.target.value || undefined;
    onChange({ type: value });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Select
        size="small"
        displayEmpty
        defaultValue=""
        onChange={handleType}
        sx={{ minWidth: 140, ...pillSx }}
        inputProps={{ 'data-testid': 'filter-type' }}
      >
        <MenuItem value="">Tipo</MenuItem>
        {types.map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </Select>

      <TextField
        size="small"
        type="date"
        onChange={(e) => onChange({ date: e.target.value || undefined })}
        inputProps={{ 'data-testid': 'filter-date' }}
        sx={{ ...pillSx }}
      />
    </Box>
  );
}
