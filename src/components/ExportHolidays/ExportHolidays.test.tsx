import { render, screen, fireEvent } from '@testing-library/react';
import ExportHolidays from './ExportHolidays';

jest.mock('@/hooks/useHolidays', () => ({ useHolidays: jest.fn() }));
jest.mock('@/lib/download', () => ({ downloadText: jest.fn() }));

import { useHolidays } from '@/hooks/useHolidays';
import { downloadText } from '@/lib/download';

function mockHook({
  holidays,
  isLoading = false,
}: {
  holidays: Array<{ name: string; iso: string; type: string }>;
  isLoading?: boolean;
}) {
  (useHolidays as jest.Mock).mockReturnValue({
    holidays,
    isLoading,
    error: undefined,
    refresh: jest.fn(),
  });
}

describe('<ExportHolidays />', () => {
  const holidays = [
    { name: 'Confraternização mundial', iso: '2025-01-01', type: 'national' },
    { name: 'Carnaval', iso: '2025-03-04', type: 'national' },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders title and record counter', () => {
    mockHook({ holidays });
    render(<ExportHolidays />);

    expect(screen.getByText(/Exportar feriados \(2025\)/i)).toBeInTheDocument();
    expect(screen.getByText(/registros para exportar/i)).toHaveTextContent(
      `${holidays.length} registros para exportar`,
    );
  });

  it('disables buttons when loading', () => {
    mockHook({ holidays, isLoading: true });
    render(<ExportHolidays />);

    expect(
      screen.getByRole('button', { name: /Exportar CSV/i }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /Exportar JSON/i }),
    ).toBeDisabled();
  });

  it('calls downloadText with correct CSV arguments on click', () => {
    mockHook({ holidays });
    render(<ExportHolidays />);

    fireEvent.click(screen.getByRole('button', { name: /Exportar CSV/i }));

    expect(downloadText).toHaveBeenCalledTimes(1);
    const [filename, text, mime] = (downloadText as jest.Mock).mock.calls[0];

    expect(filename).toBe('holidays-2025.csv');
    expect(mime).toBe('text/csv;charset=utf-8;');
    expect(text).toContain('name,date,type');
    expect(text).toContain('Confraternização mundial,2025-01-01,national');
  });

  it('calls downloadText with correct JSON arguments on click', () => {
    mockHook({ holidays });
    render(<ExportHolidays />);

    fireEvent.click(screen.getByRole('button', { name: /Exportar JSON/i }));

    expect(downloadText).toHaveBeenCalledTimes(1);
    const [filename, text, mime] = (downloadText as jest.Mock).mock.calls[0];

    expect(filename).toBe('holidays-2025.json');
    expect(mime).toBe('application/json;charset=utf-8;');

    const parsed = JSON.parse(text);
    expect(parsed).toEqual([
      {
        name: 'Confraternização mundial',
        date: '2025-01-01',
        type: 'national',
      },
      { name: 'Carnaval', date: '2025-03-04', type: 'national' },
    ]);
  });
});
