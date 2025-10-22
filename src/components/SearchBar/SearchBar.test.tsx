import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  it('renders input and search button', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} placeholder="Search by name" />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument();
  });

  it('does not call onSearch while typing', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'carnaval' } });
    fireEvent.change(input, { target: { value: 'carnaval 2025' } });

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch with current query when clicking the search button', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'carnaval' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('carnaval');
  });

  it('calls onSearch with empty string if input is empty', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('');
  });
});
