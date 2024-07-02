import React, { useState, useEffect } from 'react';
import ToolToRentCard from './ToolToRentCard';
import { ToolCard as ToolType } from '../lib/types';

const ToolsToRent = ({ tools }: { tools: ToolType[] }) => {
  const [toolsList, setToolsList] = useState<ToolType[]>(tools.filter(tool => tool.active));

  const handleDelete = (toolId: string) => {
    setToolsList(toolsList.filter(tool => tool.id !== toolId));
  };

  return (
    <div className="flex flex-wrap justify-center">
      {toolsList.map((tool) => (
        <ToolToRentCard
          key={tool.id}
          tool={tool}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ToolsToRent;
