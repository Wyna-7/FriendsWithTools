import React from 'react';
import ToolCardComponent from './ToolCard';
import { ToolCard } from '../lib/types';

interface ToolsToRentProps {
  tools: ToolCard[];
}

const ToolsToRent = ({ tools }: ToolsToRentProps ) => {
  return (
    <div className="flex flex-wrap justify-center">
      {tools.map((tool) => (
        <ToolCardComponent key={tool.id} tool={tool} query={''} />
      ))}
    </div>
  );
};

export default ToolsToRent;