import React from 'react';

type ToolsToRentProps = {
  tools: {
    id: number;
    name: string;
    description: string;
  }[];
};

const ToolsToRent = ({ tools }: ToolsToRentProps) => {
  console.log('tools', tools);
  return (
    <div>
      {tools.map((tool) => (
        <div key={tool.id}>
          <h2>{tool.name}</h2>
          <p>{tool.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ToolsToRent;
