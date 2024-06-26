import React, { useState } from 'react';
import ToolsToRent from './ToolsToRent';
import MyRequests from './MyRequests';

const tools = [
  {
    id: 1,
    name: 'Hammer',
    description: 'A sturdy hammer for all your hammering needs.',
  },
  {
    id: 2,
    name: 'Drill',
    description: 'A powerful drill for any drilling task.',
  },
];

type ToolsToRentProps = {
  tools: { id: number; name: string; description: string }[];
};

const RentRented = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(
    'toolsToRent'
  );

  const handleClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className='flex justify-around items-center'>
      <div>
        <button
          className={`w-40 rounded-none rounded-tl-lg rounded-bl-lg px-4 py-2    ${
            activeComponent === 'toolsToRent'
              ? 'bg-darkGreen text-white md:hover:bg-lightGreen'
              : 'bg-gray-200 text-gray-700'
          }  transition ease-in-out duration-500`}
          onClick={() => handleClick('toolsToRent')}
        >
          My Listed Tools
        </button>
        <button
          className={`w-40 rounded-none rounded-tr-lg rounded-br-lg px-4 py-2 ${
            activeComponent === 'myRequests'
              ? 'bg-darkGreen text-white md:hover:bg-lightGreen'
              : 'bg-gray-200 text-gray-700'
          } transition ease-in-out duration-500 `}
          onClick={() => handleClick('myRequests')}
        >
          My Requests
        </button>
        {activeComponent === 'toolsToRent' && <ToolsToRent tools={tools} />}
        {activeComponent === 'myRequests' && <MyRequests />}
      </div>
    </div>
  );
};

export default RentRented;
