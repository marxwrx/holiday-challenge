'use client';

import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

export default function SortButton({
  descending,
  onToggle,
}: {
  descending: boolean;
  onToggle: () => void;
}) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  return (
    <>
      <Button
        variant="text"
        endIcon={<ArrowDropDownIcon />}
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{ color: 'text.secondary' }}
      >
        ORDENAR POR
      </Button>
      <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => (setAnchor(null), !descending && onToggle())}>
          Data (DESC)
        </MenuItem>
        <MenuItem onClick={() => (setAnchor(null), descending && onToggle())}>
          Data (ASC)
        </MenuItem>
      </Menu>
    </>
  );
}
