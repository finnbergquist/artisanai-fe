import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageInput from '../MessageInput';

describe('MessageInput', () => {
  const mockSetInputMessage = jest.fn();
  const mockHandleSendMessage = jest.fn();

  beforeEach(() => {
    render(
      <MessageInput
        inputMessage=""
        setInputMessage={mockSetInputMessage}
        handleSendMessage={mockHandleSendMessage}
        isLoading={false}
      />
    );
  });

  test('renders input and button', () => {
    expect(screen.getByPlaceholderText(/Type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send message/i })).toBeInTheDocument();
  });

  test('calls handleSendMessage on form submit', () => {
    fireEvent.change(screen.getByPlaceholderText(/Type your message/i), { target: { value: 'Hello' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(mockHandleSendMessage).toHaveBeenCalled();
  });

  test('calls setInputMessage on input change', () => {
    fireEvent.change(screen.getByPlaceholderText(/Type your message/i), { target: { value: 'Hello' } });
    expect(mockSetInputMessage).toHaveBeenCalledWith('Hello');
  });
}); 