import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageItem from '../MessageItem';

describe('MessageItem', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const message = { 
    sender: 'user', 
    message: 'Hello', 
    id: 1,
    timestamp: new Date().toISOString(),
    context: 'Onboarding'
  };

  beforeEach(() => {
    render(<MessageItem message={message} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
  });

  test('renders message content', () => {
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  test('calls onDelete when delete button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockOnDelete).toHaveBeenCalled();
  });
}); 