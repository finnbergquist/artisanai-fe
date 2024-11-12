// app/components/MessageItem.tsx
import { Button } from "@/app/components/ui/button"
import { User, Trash2, Edit } from "lucide-react"
import { Message as MessageType } from "@/app/types"

interface MessageProps {
  message: MessageType;
  onEdit: () => void;
  onDelete: () => void;
}

const MessageItem: React.FC<MessageProps> = ({ message, onEdit, onDelete }) => {
  return (
    <div className={`flex items-center gap-3 ${message.sender === 'bot' ? '' : 'justify-end'}`}>
      {message.sender === 'bot' && (
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-purple-100">
          <User className="h-32 w-32" />
        </div>
      )} 
      {message.sender === 'user' && (
        <div>
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit className="h-2 w-2" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-2 w-2" />
          </Button>
        </div>
      )}
      <div className={`relative max-w-[80%] p-3 text-sm ${
        message.sender === 'user' 
          ? 'bg-gray-100 rounded-tl-lg rounded-br-lg rounded-bl-lg' // Square corner for bot
          : 'bg-purple-600 text-white rounded-tr-lg rounded-bl-lg rounded-br-lg' // Square corner for user
      } group`}>
        {message.message}
      </div>
    </div>
  )
}

export default MessageItem;