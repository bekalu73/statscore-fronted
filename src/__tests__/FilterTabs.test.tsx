/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterTabs from '../components/fixtures/FilterTabs';

const defaultProps = {
  activeTab: 'all' as const,
  onTabChange: jest.fn(),
  totalCount: 10,
  liveCount: 3,
  favoritesCount: 2,
};

describe('FilterTabs', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders all three tabs', () => {
    render(<FilterTabs {...defaultProps} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('displays correct counts', () => {
    render(<FilterTabs {...defaultProps} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onTabChange with correct tab when clicked', () => {
    render(<FilterTabs {...defaultProps} />);
    fireEvent.click(screen.getByText('Live'));
    expect(defaultProps.onTabChange).toHaveBeenCalledWith('live');
  });

  it('calls onTabChange with favorites when Favorites clicked', () => {
    render(<FilterTabs {...defaultProps} />);
    fireEvent.click(screen.getByText('Favorites'));
    expect(defaultProps.onTabChange).toHaveBeenCalledWith('favorites');
  });

  it('applies active styles to the active tab', () => {
    render(<FilterTabs {...defaultProps} activeTab="live" />);
    const liveButton = screen.getByText('Live').closest('button');
    expect(liveButton?.className).toContain('bg-secondary');
  });
});
