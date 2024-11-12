"use client"

import { useState, useEffect, useRef } from "react"
import { fetchMessages, sendMessage, editMessage, deleteMessage, newChat } from "./api"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Message } from "./types"
import MessageItem from "@/app/components/MessageItem"
import { contextOptions } from "./constants"
import OptionPanel from "@/app/components/OptionPanel"
import MessageInput from "@/app/components/MessageInput"

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [context, setContext] = useState(contextOptions[0])
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages()
        setMessages(fetchedMessages)
      } catch (error) {
        console.error("Failed to load messages:", error)
        // Optionally show a user-friendly message or notification
      }
    }
    loadMessages()
  }, [])

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      message: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      context: context,
      id: messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    setIsLoading(true);
    try {
      const [botResponse] = await sendMessage(userMessage);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditMessage = async () => {
    if (!editingMessage) return
    try {
      const updatedMessage = await editMessage(editingMessage)
      setMessages(prev => prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg))
      setIsEditDialogOpen(false)
      setEditingMessage(null)
    } catch (error) {
      console.error("Error editing message:", error)
    }
  }

  const handleDeleteMessage = async (id: number) => {
    try {
      await deleteMessage(id)
      setMessages(prev => prev.filter(msg => msg.id !== id))
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const handleNewChat = async () => {
    try {
      await newChat()
      setMessages([])
    } catch (error) {
      console.error("Error starting new chat:", error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100/40 p-4">
      <Card className="relative flex w-full max-w-md flex-col overflow-hidden">

        {/* Chat History */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ minHeight: '400px', maxHeight: '400px' }}>
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            onEdit={() => {
              setEditingMessage(message)
              setIsEditDialogOpen(true)
            }}
            onDelete={() => handleDeleteMessage(message.id)}
            />
          ))}   
          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-purple-100">
              </div>
              <div className="max-w-[80%] rounded-lg bg-gray-100 p-3 text-sm">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <MessageInput 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />

        {/* Option Panel */}
        <OptionPanel 
          context={context} 
          setContext={setContext} 
          contextOptions={contextOptions} 
          handleNewChat={handleNewChat} 
        />
      </Card>

      
      {/* Edit Popup */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <Input
            value={editingMessage?.message || ""}
            onChange={(e) => setEditingMessage(prev => prev ? {...prev, message: e.target.value} : null)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditMessage}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  )
}