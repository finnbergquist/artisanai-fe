import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OptionPanel from '../OptionPanel';

describe('OptionPanel', () => {
  const mockSetContext = jest.fn();
  const mockHandleNewChat = jest.fn();
  const contextOptions = ['Option 1', 'Option 2'];

  beforeEach(() => {
    render(
      <OptionPanel
        context="Option 1"
        setContext={mockSetContext}
        contextOptions={contextOptions}
        handleNewChat={mockHandleNewChat}
      />
    );
  });

  test('renders context select and button', () => {
    expect(screen.getByText(/Context/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /New Chat/i })).toBeInTheDocument();
  });

  test('calls setContext when a new option is selected', () => {
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 2' } });
    expect(mockSetContext).toHaveBeenCalledWith('Option 2');
  });

  test('calls handleNewChat when button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /New Chat/i }));
    expect(mockHandleNewChat).toHaveBeenCalled();
  });
}); 