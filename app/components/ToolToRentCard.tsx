import React from 'react';
import { ToolCard as ToolType } from '../lib/types';

export interface ToolToRentCardProps {
  tool: ToolType;
  onDelete: (toolId: string) => void;
}

const ToolToRentCard = ({ tool, onDelete }: ToolToRentCardProps) => {
  const defaultImage = 'https://shorturl.at/PyeKu'; // Placeholder image

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/tools/${tool.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete tool');
      }

      onDelete(tool.id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="border-slate-50 border-4 p-4 rounded-xl shadow-md flex flex-col items-center m-4">
      <div
        className="relative w-full h-64 rounded-m overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${tool.picture || defaultImage})` }}
      />

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold">{tool.name}</h1>
        <p className="text-gray-600">{tool.description}</p>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Rental Terms</h2>
        <p className="text-gray-600">Daily Rate: ${tool.dailyRate}</p>
        <p className="text-gray-600">Weekly Rate: ${tool.weeklyRate}</p>
        <p className="text-gray-600">Monthly Rate: ${tool.monthlyRate}</p>
      </div>

      <button
        className="bg-red-400 text-white py-2 px-4 rounded mt-2"
        onClick={handleDeleteClick}
      >
        Delete Item
      </button>
    </div>
  );
};

export default ToolToRentCard;
