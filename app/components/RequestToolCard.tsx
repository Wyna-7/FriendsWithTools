import React from 'react';
import { ToolCard as ToolType, ToolRequest as RequestType } from '../lib/types';

export interface RequestToolCardProps {
  tool: ToolType;
  request: RequestType;
  onDelete: (requestId: string) => void;
}

const RequestToolCard = ({ tool, request, onDelete }: RequestToolCardProps) => {
  const defaultImage = 'https://shorturl.at/PyeKu';

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
        <button
          className="bg-red-600 text-white py-4 px-10 rounded mt-7"
          onClick={handleDeleteClick}
        >
          Delete Request
        </button>
      )}
    </div>
  );
};

export default RequestToolCard;
