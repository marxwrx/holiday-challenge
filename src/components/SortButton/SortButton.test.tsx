import { render, screen, fireEvent } from '@testing-library/react';
import SortButton from './SortButton';

describe('<SortButton />', () => {
  it('renders button with label', () => {
    const onToggle = jest.fn();
    render(<SortButton descending={true} onToggle={onToggle} />);
    expect(screen.getByText(/ORDENAR POR/i)).toBeInTheDocument();
  });

  it('opens the menu when clicked', () => {
    const onToggle = jest.fn();
    render(<SortButton descending={true} onToggle={onToggle} />);

    const button = screen.getByText(/ORDENAR POR/i);
    fireEvent.click(button);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Data (DESC)')).toBeInTheDocument();
    expect(screen.getByText('Data (ASC)')).toBeInTheDocument();
  });

  it('calls onToggle when switching from DESC to ASC', () => {
    const onToggle = jest.fn();
    render(<SortButton descending={true} onToggle={onToggle} />);

    fireEvent.click(screen.getByText(/ORDENAR POR/i));
    fireEvent.click(screen.getByText('Data (ASC)'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle when switching from ASC to DESC', () => {
    const onToggle = jest.fn();
    render(<SortButton descending={false} onToggle={onToggle} />);

    fireEvent.click(screen.getByText(/ORDENAR POR/i));
    fireEvent.click(screen.getByText('Data (DESC)'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not call onToggle if same option is clicked', () => {
    const onToggle = jest.fn();
    render(<SortButton descending={true} onToggle={onToggle} />);

    fireEvent.click(screen.getByText(/ORDENAR POR/i));
    fireEvent.click(screen.getByText('Data (DESC)'));

    expect(onToggle).not.toHaveBeenCalled();
  });
});
