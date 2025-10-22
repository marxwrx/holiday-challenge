import { render, screen, within } from '@testing-library/react';
import HolidaysTable from './HolidaysTable';
import { HolidayVO } from '@/lib/types';

describe('<HolidaysTable />', () => {
  const items: HolidayVO[] = [
    new HolidayVO({
      date: '2025-01-01',
      name: 'Confraternização mundial',
      type: 'national',
    }),
    new HolidayVO({
      date: '2025-03-04',
      name: 'Carnaval',
      type: 'national',
    }),
  ];

  it('renders total count, headers and rows', () => {
    render(<HolidaysTable items={items} />);

    expect(screen.getByTestId('total-count')).toHaveTextContent(
      String(items.length),
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Tipo')).toBeInTheDocument();
    expect(screen.getByText('Confraternização mundial')).toBeInTheDocument();
    expect(screen.getByText('Carnaval')).toBeInTheDocument();
    expect(screen.getByText('01/01/2025')).toBeInTheDocument();
    expect(screen.getByText('04/03/2025')).toBeInTheDocument();
    expect(screen.getAllByText('national').length).toBeGreaterThanOrEqual(2);

    const table = screen.getByTestId('holidays-table');
    const buttons = within(table).getAllByRole('button');
    expect(buttons).toHaveLength(items.length);
  });

  it('renders zero state when no items', () => {
    render(<HolidaysTable items={[]} />);

    expect(screen.getByTestId('total-count')).toHaveTextContent('0');

    const table = screen.getByTestId('holidays-table');
    const buttons = within(table).queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });
});
