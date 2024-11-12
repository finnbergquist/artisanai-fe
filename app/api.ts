const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Message } from './types';

export const fetchMessages = async () => {
  try {
    const response = await fetch(`${API_URL}/messages`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};

export const sendMessage = async (message: Message) => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};

export const editMessage = async (message: Message) => {
  try {
    const response = await fetch(`${API_URL}/messages/${message.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error editing message:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};

export const deleteMessage = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/messages/${id.toString()}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Network response was not ok');
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};

export const newChat = async () => {
  const response = await fetch(`${API_URL}/newchat`, { method: 'POST' });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};