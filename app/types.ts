export interface Message {
    id: number
    message: string
    sender: 'user' | 'bot'
    timestamp: string
    context: string
  }

  export interface Chat {
    id: number
    messages: Message[]
  }
