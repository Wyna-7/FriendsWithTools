import React from 'react';
import { useRouter } from 'next/router';

interface Tool {
    id: string;
    name: string;
    description: string;
}

const tools = [
  { id: '1', name: 'Hammer', description: 'A tool used for driving nails' },
  { id: '2', name: 'Screwdriver', description: 'A tool used for driving screws' },
  { id: '3', name: 'Drill', description: 'A tool used for drilling holes' },
];

const ToolDetailsPage = () => {
  console.log('here');
  const router = useRouter();
  const { tool_id } = router.query;

  const tool: Tool | undefined = tools.find(tool => tool.id === tool_id);

  if (!tool_id || !tool) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{tool.name}</h1>
      <p>{tool.description}</p>
    </div>
  );
};

export default ToolDetailsPage;
