'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { format } from 'date-fns';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { HolidaysTableProps } from './HolidaysTable.types';
import TypeChip from '../TypeChip/TypeChip';

export default function HolidaysTable({ items }: HolidaysTableProps) {
  return (
    <div>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        <strong data-testid="total-count">{items.length}</strong> REGISTROS
      </Typography>

      <Table
        size="medium"
        aria-label="holidays table"
        data-testid="holidays-table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((h) => (
            <TableRow key={h.iso} hover>
              <TableCell sx={{ fontWeight: 600 }}>{h.name}</TableCell>
              <TableCell>{format(h.date, 'dd/MM/yyyy')}</TableCell>
              <TableCell>
                <TypeChip type={h.type} />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <ChevronRightIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
