// pages/tools.tsx
import React from 'react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
}

const ToolsPage = () => {
  const tools: Tool[] = [
    { id: '1', name: 'Hammer', description: 'A tool used for driving nails' },
    {
      id: '2',
      name: 'Screwdriver',
      description: 'A tool used for driving screws',
    },
    { id: '3', name: 'Drill', description: 'A tool used for drilling holes' },
  ];

  return (
    <div>
      <h1>Available Tools</h1>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>
            {/* <Link href={`/tools/${tool.id}`}> */}
            <Link href={'/tools'}>{tool.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsPage;
