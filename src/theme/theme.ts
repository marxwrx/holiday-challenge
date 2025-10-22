import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: { main: '#052f89' },
    secondary: { main: '#9c27b0' },
    neutral: { main: '#64748b' },
    background: { default: '#fafafa' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Arial', 'sans-serif'].join(','),
  },
});
