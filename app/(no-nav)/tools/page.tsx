'use client';

import { useEffect, useState } from 'react';
import { ToolCard } from '../../lib/types';
import Link from 'next/link';

const ToolsPage = () => {
  const [tools, setTools] = useState<ToolCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools');
        const data: ToolCard[] = await response.json();
        setTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tools</h1>
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>
            <Link href={`/tools/${tool.id}`}>
              <h2>{tool.name}</h2>
            </Link>
            <p>{tool.description}</p>
            <img src={tool.picture} alt={tool.name} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsPage;


// const ToolsPage = () => {
//   const [tools, setTools] = useState<ToolCard[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchTools = async () => {
//       try {
//         const response = await fetch('/api/tools');
//         const data: ToolCard[] = await response.json();
//         setTools(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch tools:', error);
//         setLoading(false);
//       }
//     };

//     fetchTools();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Tools</h1>
//       <ul>
//         {tools.map(tool => (
//           <li key={tool.id}>
//             <h2>{tool.name}</h2>
//             <p>{tool.description}</p>
//             <p>Location: {tool.location}</p>
//             <p>Daily Rate: ${tool.dailyRate}</p>
//             <p>Weekly Rate: ${tool.weeklyRate}</p>
//             <p>Monthly Rate: ${tool.monthlyRate}</p>
//             <img src={tool.picture} alt={tool.name} width="200" />
//             <h3>Reviews</h3>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ToolsPage;




















// const ToolsPage = () => {
//   // async function getTool() {
//   //   const tool = await prisma.toolCard.findMany();
//   //   return tool;
//   // }

//   const [toolsData, setToolsData] = useState<ToolCard[]>([]);
//   console.log('Initial toolsData:', toolsData);

//   useEffect(() => {

//     fetch('/api/tool')
//       .then(response => response.json())
//       .then(data => {setToolsData(data); console.log(data)})
//       .catch(error => console.error('Error fetching tools:', error));
//   }, []);
//   // console.log('Current toolsData:', toolsData);

//   return (
//     <div>
//       <h1>Tools Page</h1>
//       {/* <ToolListItem tools={toolsData} />  */}
//     </div>
//   );
// };

// export default ToolsPage;

