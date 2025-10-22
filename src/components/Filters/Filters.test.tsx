import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

describe('<Filters />', () => {
  const types = ['national', 'state', 'municipal'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders type select and date input', () => {
    const onChange = jest.fn();
    render(<Filters types={types} onChange={onChange} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByTestId('filter-date')).toBeInTheDocument();
  });

  it('calls onChange when selecting a type', () => {
    const onChange = jest.fn();
    render(<Filters types={types} onChange={onChange} />);

    const combo = screen.getByRole('combobox');
    fireEvent.mouseDown(combo);

    const option = screen.getByRole('option', { name: 'state' });
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ type: 'state' });
  });

  it('calls onChange when selecting a date', () => {
    const onChange = jest.fn();
    render(<Filters types={types} onChange={onChange} />);

    const dateInput = screen.getByTestId('filter-date');
    fireEvent.change(dateInput, { target: { value: '2025-03-04' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ date: '2025-03-04' });
  });

  it('sends undefined when clearing type and date', () => {
    const onChange = jest.fn();
    render(<Filters types={types} onChange={onChange} />);

    const combo = screen.getByRole('combobox');

    fireEvent.mouseDown(combo);
    fireEvent.click(screen.getByRole('option', { name: 'state' }));
    expect(onChange).toHaveBeenLastCalledWith({ type: 'state' });

    fireEvent.mouseDown(combo);
    fireEvent.click(screen.getByRole('option', { name: 'Tipo' }));

    expect(onChange).toHaveBeenLastCalledWith({ type: undefined });

    const dateInput = screen.getByTestId('filter-date');
    fireEvent.change(dateInput, { target: { value: '2025-03-04' } });
    expect(onChange).toHaveBeenLastCalledWith({ date: '2025-03-04' });

    fireEvent.change(dateInput, { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith({ date: undefined });
  });
});
