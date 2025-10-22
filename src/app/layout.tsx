'use client';

import type { ReactNode } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme } from '@/theme/theme';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              {children}
            </Container>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
