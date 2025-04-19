import React, { useState } from 'react';
import {
  useMessages,
  useCreateMessage,
  useDeleteMessage,
} from '../hooks/useMessages';
import { Button } from './ui/button';

export default function MessageBox({ chefId }) {
  const { data: messages = [], isLoading, isError, error } = useMessages(chefId);
  const createMsg = useCreateMessage(chefId);
  const deleteMsg = useDeleteMessage(chefId);
  const [content, setContent] = useState('');

  if (isLoading) {
    return <p className="py-4 text-center text-gray-500">Loading messages…</p>;
  }
  if (isError) {
    return <p className="py-4 text-center text-red-600">Error: {error.message}</p>;
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    createMsg.mutate(content, {
      onSuccess: () => setContent(''),
    });
  };

  return (
    <div className="space-y-4">
      {/* Message list */}
      <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-200 rounded p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="flex justify-between items-start bg-gray-50 p-3 rounded"
            >
              <div>
                <p className="text-sm text-gray-700">{msg.content}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(msg.date).toLocaleString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteMsg.mutate(msg.id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Send form */}
      <form onSubmit={handleSend} className="space-y-2">
        <textarea
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-primary resize-none"
          rows={3}
          placeholder="Type a message…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" disabled={createMsg.isLoading}>
          {createMsg.isLoading ? 'Sending…' : 'Send'}
        </Button>
        {createMsg.isError && (
          <p className="text-sm text-red-600">Error sending: {createMsg.error.message}</p>
        )}
      </form>
    </div>
  );
}