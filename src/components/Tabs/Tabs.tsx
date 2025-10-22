'use client';

import { useMemo, useState } from 'react';
import { Box, Tab, Tabs as MUITabs } from '@mui/material';
import type { TabsProps } from './Tabs.types';

export default function Tabs({ items, defaultTabId }: TabsProps) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const [value, setValue] = useState(defaultTabId ?? ids[0]);

  return (
    <Box>
      <MUITabs
        value={value}
        onChange={(_, v) => setValue(v)}
        aria-label="navigation tabs"
        sx={{
          mb: 2,
          '& .MuiTabs-indicator': {
            height: 3,
            bgcolor: 'primary.main',
            borderRadius: 2,
          },
        }}
      >
        {items.map((t) => (
          <Tab
            key={t.id}
            label={t.label}
            value={t.id}
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          />
        ))}
      </MUITabs>

      {items.map((t) => (
        <Box key={t.id} role="tabpanel" hidden={value !== t.id}>
          {value === t.id && <Box sx={{ pt: 1 }}>{t.content}</Box>}
        </Box>
      ))}
    </Box>
  );
}
