import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

const makeItems = () => [
  { id: 'a', label: 'Tela A', content: <div>Content A</div> },
  { id: 'b', label: 'Tela B', content: <div>Content B</div> },
  { id: 'c', label: 'Tela C', content: <div>Content C</div> },
];

describe('<Tabs />', () => {
  it('renders tablist and tabs with labels', () => {
    const items = makeItems();
    render(<Tabs items={items} defaultTabId="b" />);

    const tablist = screen.getByRole('tablist', { name: /navigation tabs/i });
    expect(tablist).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: 'Tela A' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tela B' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tela C' })).toBeInTheDocument();
  });

  it('selects the defaultTabId initially and shows its content', () => {
    const items = makeItems();
    render(<Tabs items={items} defaultTabId="b" />);

    const tabB = screen.getByRole('tab', { name: 'Tela B' });
    expect(tabB).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByText('Content B')).toBeInTheDocument();
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
    expect(screen.queryByText('Content C')).not.toBeInTheDocument();
  });

  it('falls back to first tab when defaultTabId is not provided', () => {
    const items = makeItems();
    render(<Tabs items={items} />);

    const tabA = screen.getByRole('tab', { name: 'Tela A' });
    expect(tabA).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content A')).toBeInTheDocument();
  });

  it('switches tabs on click and updates content & aria-selected', () => {
    const items = makeItems();
    render(<Tabs items={items} defaultTabId="a" />);

    const tabA = screen.getByRole('tab', { name: 'Tela A' });
    const tabC = screen.getByRole('tab', { name: 'Tela C' });

    expect(tabA).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.queryByText('Content C')).not.toBeInTheDocument();

    fireEvent.click(tabC);

    expect(tabC).toHaveAttribute('aria-selected', 'true');
    expect(tabA).toHaveAttribute('aria-selected', 'false');

    expect(screen.getByText('Content C')).toBeInTheDocument();
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });
});
