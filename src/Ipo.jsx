import React, { useState } from 'react';
import IPOListed1 from './Ipo/IPOListed';
import IPOUpcoming1 from './Ipo/IPOUpcoming';
import IPOAboutList1 from './Ipo/IPOAboutList';
import IPOOngoing1 from './Ipo/IPOOngoing'; 

// Sample components for each toggle option
const IPOListed = () => <IPOListed1/>;
const IPOAboutList = () => <IPOAboutList1/>;
const IPOUpcoming = () => <IPOUpcoming1/>;
const IPOOngoing = () => <IPOOngoing1/>;

const ToggleButton = () => {
  const [activeTab, setActiveTab] = useState('IPOOngoing');

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeTab) {
      case 'IPOListed':
        return <IPOListed />;
      case 'IPOAboutList':
        return <IPOAboutList />;
      case 'IPOUpcoming':
        return <IPOUpcoming />;
      case 'IPOOngoing':
        return <IPOOngoing />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Button Group */}
      <div className="flex flex-wrap justify-center space-x-4">
      <button
          onClick={() => setActiveTab('IPOUpcoming')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'IPOUpcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          IPO Upcoming
        </button>
      <button
          onClick={() => setActiveTab('IPOOngoing')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'IPOOngoing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          Current IPO
        </button>
       
        <button
          onClick={() => setActiveTab('IPOAboutList')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'IPOAboutList' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
         Allotment IPO
        </button>
       
        <button
          onClick={() => setActiveTab('IPOListed')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'IPOListed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          Past IPO
        </button>
        
      </div>

      {/* Content Section */}
      <div className="mt-8">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ToggleButton;
