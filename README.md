This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```
pnpm dev
```

## Running Tests

```
pnpm test
```

## To build

```
pnpm build
```

## Relevant Components

- [OptionPanel](./app/components/OptionPanel.tsx)
    - This component is responsible for rendering the context selection and the new chat button.
- [MessageInput](./app/components/MessageInput.tsx)
    - This component is responsible for rendering the input field and the send button.
- [MessageItem](./app/components/MessageItem.tsx)
    - This component is responsible for rendering a single message in the chat.
- [Chatbox](./app/components/Chatbox.tsx)
    - This component is responsible for rendering OptionPanel, MessageInput, and MessageItem.

## Project Endpoints (./app/api.ts)

- `GET /messages`
    - This endpoint is responsible for fetching all messages from the server.
- `POST /messages`
    - This endpoint is responsible for sending a new message to the server.
- `PUT /messages/:id`
    - This endpoint is responsible for editing a message in the server.
- `DELETE /messages/:id`
    - This endpoint is responsible for deleting a message from the server.
- `POST /newchat`
    - This endpoint is responsible for creating a new chat in the server.

## Notes

- The project uses Tailwind CSS for styling.
- The project uses Jest for testing.
- The backend can be seen [here](https://github.com/finnbergquist/artisanai).