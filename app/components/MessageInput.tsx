import React from 'react';
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button"; 
import { Send } from "lucide-react"

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ inputMessage, setInputMessage, handleSendMessage, isLoading }) => (
  <div className="border-t p-3">
    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
      <Input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        placeholder="Type your message..."
        className="flex-1"
        aria-label="Type your message and press Enter to send"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={isLoading}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  </div>
);

export default MessageInput;