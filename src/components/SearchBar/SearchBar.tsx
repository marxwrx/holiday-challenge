'use client';

import { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SearchBarProps } from './SearchBar.types';

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const [q, setQ] = useState('');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
      <TextField
        fullWidth
        size="small"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder ?? 'Busque por nome'}
        inputProps={{ 'data-testid': 'search-input' }}
        variant="standard"
        sx={{
          '& .MuiInputBase-root': { fontSize: 16 },
          '& .MuiInputBase-input': { py: 1.2 },
        }}
      />
      <IconButton
        aria-label="search"
        onClick={() => onSearch(q)}
        data-testid="search-button"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          width: 44,
          height: 44,
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
