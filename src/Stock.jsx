import { useEffect, useState } from 'react';
import Dstock from './Dstock';

const Stock = () => {
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedHeading, setSelectedHeading] = useState('Most Active Stocks');
  const [marketCap, setMarketCap] = useState('largecap');
  const [exchange, setExchange] = useState('nse'); // New state for exchange
  const [ticker, setTicker] = useState(''); // New state for ticker

  
useEffect(()=>{
  const auth =localStorage.getItem('tokan')
if(auth==null  || auth==""){
  navigate("/login")
}
},[])
  // Function to handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  // Function to handle sort order change
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Function to handle heading change
  const handleHeadingChange = (event) => {
    setSelectedHeading(event.target.value);
  };

  // Function to handle market cap change
  const handleMarketCapChange = (event) => {
    setMarketCap(event.target.value);
  };

  // Function to handle exchange change
  const handleExchangeChange = (event) => {
    setExchange(event.target.value);
  };

  // Function to handle ticker change
  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  };

  // Define headings and corresponding URLs
  const headings = [
    {
      id: 1,
      heading: "Most Active Stocks",
      url: `https://etmarketsapis.indiatimes.com/ET_Stats/moversvolume?pagesize=${pageSize}&exchange=${exchange}${ticker ? `&ticker=${ticker}` : ''}&pageno=1&service=volumemovers&sortby=volume&sortorder=${sortOrder}&marketcap=${marketCap}`,
    },
    {
      id: 2,
      heading: "Most Gainers Stocks",
      url: `https://etmarketsapis.indiatimes.com/ET_Stats/gainers?pagesize=${pageSize}&exchange=${exchange}${ticker ? `&ticker=${ticker}` : ''}&sortby=percentchange&sortorder=${sortOrder}&marketcap=${marketCap}`,
    },
    {
      id: 3,
      heading: "Most Losers Stocks",
      url: `https://etmarketsapis.indiatimes.com/ET_Stats/losers?pagesize=${pageSize}&exchange=${exchange}${ticker ? `&ticker=${ticker}` : ''}&sortby=percentchange&sortorder=${sortOrder}&marketcap=${marketCap}`,
    },
    {
      id: 4,
      heading: "New 52-Week High",
      url: `https://etmarketsapis.indiatimes.com/ET_Stats/new52weekshigh?pageno=10&pagesize=${pageSize}&exchange=${exchange}${ticker ? `&ticker=${ticker}` : ''}&sortby=percentchange&sortorder=${sortOrder}&marketcap=${marketCap}`,
    },
    {
      id: 5,
      heading: "New 52-Week Low",
      url: `https://etmarketsapis.indiatimes.com/ET_Stats/new52weekslow?pageno=10&pagesize=${pageSize}&exchange=${exchange}${ticker ? `&ticker=${ticker}` : ''}&sortby=percentchange&sortorder=${sortOrder}&marketcap=${marketCap}`,
    },
    {
      id: 6,
      heading: "Intraday High Stocks",
      url: `https://etmarketsapis.indiatimes.com/ET_Stats/fallfromhigh?pageno=1&pagesize=${pageSize}&exchange=${exchange}${ticker ? `&ticker=${ticker}` : ''}&sortby=belowDaysHighPerChange&sortorder=${sortOrder}&service=intradayhigh&marketcap=${marketCap}`,
    },
    {
      id: 7,
      heading: "Intraday Low Stocks",
      url: `https://etmarketsapis.indiatimes.com/ET_Stats/fallfromhigh?pageno=1&pagesize=${pageSize}&exchange=${exchange}${ticker ? `&ticker=${ticker}` : ''}&sortby=belowDaysPerChange&sortorder=${sortOrder}&service=intradaylow&marketcap=${marketCap}`,
    }
  ];

  // Filter data based on selected heading
  const selectedData = headings.find(item => item.heading === selectedHeading);

  return (
    <div className="container mx-auto p-4">
      {/* Dropdowns for page size, sort order, heading, market capitalization, exchange, and ticker */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="pageSize" className="block text-sm font-medium text-gray-700">Items per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value={1}>1</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={1500}>1500</option>
            <option value={2000}>2000</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div>
          <label htmlFor="heading" className="block text-sm font-medium text-gray-700">Select Heading:</label>
          <select
            id="heading"
            value={selectedHeading}
            onChange={handleHeadingChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          >
            {headings.map((item) => (
              <option key={item.id} value={item.heading}>{item.heading}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="marketCap" className="block text-sm font-medium text-gray-700">Market Capitalization:</label>
          <select
            id="marketCap"
            value={marketCap}
            onChange={handleMarketCapChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="largecap">Large Cap</option>
            <option value="smallcap">Small Cap</option>
            <option value="midcap">Mid Cap</option>
            <option value="largecap,smallcap,midcap">Large & Small & Mid Cap</option>
          </select>
        </div>

        <div>
          <label htmlFor="exchange" className="block text-sm font-medium text-gray-700">Exchange:</label>
          <select
            id="exchange"
            value={exchange}
            onChange={handleExchangeChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="nse">NSE</option>
            <option value="bse">BSE</option>
           
          </select>
        </div>

        <div>
          <label htmlFor="ticker" className="block text-sm font-medium text-gray-700">Ticker (Optional):</label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={handleTickerChange}
            placeholder="Enter ticker (e.g., IDEA)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Display selected data */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
        <div className="border border-gray-300 rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">{selectedData.heading}</h2>
          <Dstock Api={selectedData.url} />
        </div>
      </div>
    </div>
  );
};

export default Stock;
