// import React from 'react';
// import { ToolCard as ToolType } from '../lib/types';
// import Liked from './Liked';

// export interface ToolCardProps {
//   tool: ToolType;
// }

// const ToolCardComponent = ({ tool }: ToolCardProps) => {
//   const defaultImage = 'https://shorturl.at/PyeKu'; // Placeholder image
//   return (
//     <div className="border-slate-50 border-4 p-4 rounded-xl shadow-md flex flex-col items-center m-4">
//       {/* Photo with Like button */}
//       <div className="relative w-full h-64 rounded-m overflow-hidden bg-cover bg-center"
//            style={{ backgroundImage: `url(${tool.picture || defaultImage})` }}>
//         <div className="absolute top-0 right-0 m-2">
//           <Liked />
//         </div>
//       </div>

//       {/* Title and Description */}
//       <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
//         <h1 className="text-lg font-semibold">{tool.name}</h1>
//         <p className="text-gray-600">{tool.description}</p>
//       </div>

//       {/* Owner Information */}
//       <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold">Owner Information</h2>
//         <p className="text-gray-600">Owner: {tool.ownerId}</p>
//       </div>

//       {/* Rental Terms */}
//       <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold">Rental Terms</h2>
//         <p className="text-gray-600">Daily Rate: ${tool.dailyRate}</p>
//         <p className="text-gray-600">Weekly Rate: ${tool.weeklyRate}</p>
//         <p className="text-gray-600">Monthly Rate: ${tool.monthlyRate}</p>
//       </div>

//       <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold">Reviews</h2>
//       </div>

//       <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold">Maps</h2>
//       </div>

//       <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold">Rent</h2>
//       </div>
//     </div>
//   );
// };

// export default ToolCardComponent;


import React from 'react';
import { ToolCard as ToolType} from '../lib/types';
import Liked from './Liked';

export interface ToolCardProps {
  tool: ToolType;
}

const ToolCardComponent = ({ tool }: ToolCardProps) => {
  const defaultImage = 'https://shorturl.at/PyeKu';
  const testUserId = process.env.HARDCODED_ID;
  const handleRentClick = async () => {
    try {
      const response = await fetch('/api/myRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId: tool.id,
          userId: '4e25264b-9404-46b5-9b27-549f6af6c72f', // Replace with the actual user ID
          status: 'accepted',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      console.log('Request sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="border-slate-50 border-4 p-4 rounded-xl shadow-md flex flex-col items-center m-4">
      {/* Photo with Like button */}
      <div className="relative w-full h-64 rounded-m overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${tool.picture || defaultImage})` }}>
        <div className="absolute top-0 right-0 m-2">
          <Liked />
        </div>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-lg font-semibold">{tool.name}</h1>
        <p className="text-gray-600">{tool.description}</p>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Owner Information</h2>
        <p className="text-gray-600">Owner: {tool.ownerId}</p>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Rental Terms</h2>
        <p className="text-gray-600">Daily Rate: ${tool.dailyRate}</p>
        <p className="text-gray-600">Weekly Rate: ${tool.weeklyRate}</p>
        <p className="text-gray-600">Monthly Rate: ${tool.monthlyRate}</p>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Reviews</h2>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Maps</h2>
      </div>

      <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Rent</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          onClick={handleRentClick}
        >
          Rent
        </button>
      </div>
    </div>
  );
};

export default ToolCardComponent;
