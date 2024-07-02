import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToolsPage from '../../app/(main-pages)/testexplore/page';

describe('ToolsPage', () => {
  it('renders the ToolsPage correctly', () => {
    render(<ToolsPage />);

    expect(screen.getByText('Discover Your Ideal Tool Here!')).toBeInTheDocument();

    expect(screen.getByText('Tool 1')).toBeInTheDocument();
    expect(screen.getByText('Tool 2')).toBeInTheDocument();
    expect(screen.getByText('Tool 3')).toBeInTheDocument();
  });
});
