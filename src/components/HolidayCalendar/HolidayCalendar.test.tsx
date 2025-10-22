import { render, screen, fireEvent } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HolidayCalendar from './HolidayCalendar';

jest.mock('@/hooks/useHolidays', () => ({
  useHolidays: jest.fn(),
}));
import { useHolidays } from '@/hooks/useHolidays';

function renderWithProvider(ui: React.ReactNode) {
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {ui}
    </LocalizationProvider>,
  );
}

describe('<HolidayCalendar />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useHolidays as jest.Mock).mockReturnValue({
      holidays: [
        {
          name: 'Confraternização mundial',
          iso: '2025-01-01',
          type: 'national',
        },
        { name: 'Carnaval', iso: '2025-03-04', type: 'national' },
      ],
      isLoading: false,
      error: undefined,
      refresh: jest.fn(),
    });
  });

  it('renders title and details for initially selected date (01/01/2025)', () => {
    renderWithProvider(<HolidayCalendar />);

    expect(
      screen.getByText(/Calendário de feriados \(2025\)/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Selecionado:\s*01\/01\/2025/i),
    ).toBeInTheDocument();

    expect(screen.getByText('Confraternização mundial')).toBeInTheDocument();
  });

  it('navigates months and shows holidays for the clicked day (04/03/2025)', () => {
    renderWithProvider(<HolidayCalendar />);

    const nextBtn = screen.getByRole('button', { name: /next month/i });
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);

    const candidates = screen.getAllByText('4', { selector: 'button' });
    const day4 = candidates.find((btn) => !btn.hasAttribute('disabled'));
    expect(day4).toBeTruthy();

    fireEvent.click(day4!);

    expect(
      screen.getByText(/Selecionado:\s*04\/03\/2025/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Carnaval')).toBeInTheDocument();
  });
});
