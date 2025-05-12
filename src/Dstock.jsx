import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";


const Stock = ({ Api }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const auth =localStorage.getItem('tokan')
    // if(auth==null  || auth==""){
    //   navigate("/login")
    // }

    const fetchData = async () => {
      const response = await fetch(Api);
      const result = await response.json();
      setData(result.searchresult || []); // Ensure fallback to empty array if 'searchresult' is not found
    };

    fetchData();
  }, [Api]); // Add Api to dependency array to refetch if the Api prop changes

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                Symbol
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                Last
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                Chg
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                Chg%
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                Vol
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                52 Week High
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                52 Week Low
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                Best Buy Price
              </th>
              <th className="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 bg-gray-100">
                Best Sell Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((stock) => {
              // Calculate percentage change between bestBuyPrice and current
              const currentPrice = parseFloat(stock.current) || 0;
              const bestBuyPrice = parseFloat(stock.bestBuyPrice) || 0;
              const percentageChange = ((bestBuyPrice - currentPrice) / currentPrice) * 100;
              const isSignificantChange = Math.abs(percentageChange) > 10;

              return (
                <tr key={stock.ticker}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-300">
                    <div>{stock.ticker}</div>
                    <div className="text-xs text-gray-500">{stock.companyName}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">
                    {stock.current}
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-sm border-b border-gray-300 ${
                      stock.percentChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.absoluteChange}
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-sm border-b border-gray-300 ${
                      stock.percentChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.percentChange >= 0 ? (
                      <ArrowUpIcon className="inline h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="inline h-4 w-4" />
                    )}
                    {Math.abs(stock.percentChange)}%
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">
                    {stock.volume}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">
                    {stock.fiftyTwoWeekHighPrice}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">
                    {stock.fiftyTwoWeekLowPrice}
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300 ${
                      isSignificantChange ? "bg-green-100" : ""
                    }`}
                  >
                    {stock.bestBuyPrice}
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300 ${
                      isSignificantChange ? "bg-green-100" : ""
                    }`}
                  >
                    {stock.bestSellPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
     
    </div>

  );
};

export default Stock;
