import React, { useEffect, useState } from 'react';
import ToolToRentCard from './ToolToRentCard';
import { ToolCard as ToolType } from '../lib/types';

const ToolsToRent = ({ tools }: { tools: ToolType[] }) => {
  const [toolsList, setToolsList] = useState<ToolType[]>([]);


  useEffect(() => {
    setToolsList(tools.filter(tool => tool.active));
  }, [tools]);

  const handleDelete = (toolId: string) => {
    setToolsList(toolsList.filter(tool => tool.id !== toolId));
  };

  return (
    <div className="flex flex-col justify-center">
      {toolsList.map((tool) => (
        <ToolToRentCard
          key={tool.id}
          tool={tool}
          onDelete={()=>handleDelete(tool.id)}
        />
      ))}
    </div>
  );
};

export default ToolsToRent;