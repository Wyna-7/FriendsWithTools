import React from 'react';
import { ToolCard as ToolType, ToolRequest as RequestType } from '../lib/types';
import { useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001'); // Connect to Socket.IO server
import { useRouter } from 'next/navigation';

export interface RequestToolCardProps {
  tool: ToolType;
  request: RequestType;
  onDelete: (requestId: string) => void;
}

const RequestToolCard = ({ tool, request, onDelete }: RequestToolCardProps) => {
  const defaultImage = 'https://shorturl.at/PyeKu';
  const router = useRouter();


  useEffect(() => {
    return () => {
      socket.off('conversation_created');
      socket.off('error');
    };
  }, []);

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/myRequests/${request.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete request');
      }

      onDelete(request.id);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleChatClick = () => {
    socket.emit('create_conversation', { userId: request.userId, toolOwnerId: tool.ownerId });
    socket.on('conversation_created', (conversation: any) => {
      console.log('window.location.href')
      router.push(`/chat/${conversation.id}`);
    });
    socket.on('error', (error: any) => {
      console.error('Error:', error);
    });
  };


  console.log("hello")
  return (
    <div className="border-slate-50 border-4 p-4 rounded-xl shadow-slate-400 shadow-xl flex flex-col items-center m-4">
      <div
        className="relative w-full h-64 rounded-m overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${tool.picture || defaultImage})` }}
      />

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold">{tool.name}</h1>
        <p className="text-gray-600">{tool.description}</p>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Request Information</h2>
        <p className="text-gray-600">Status: {request.status}</p>
        <p className="text-gray-600">Request Sent: {new Date(request.createdAt).toLocaleDateString()}</p>
      </div>

      {request.status === 'pending' && (
        <div className="mt-7 flex space-x-4">
          <button
            className="bg-red-600 text-white py-2 px-6 rounded"
            onClick={handleDeleteClick}
          >
            Delete Request
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded"
            onClick={handleChatClick}
          >
            Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestToolCard;
