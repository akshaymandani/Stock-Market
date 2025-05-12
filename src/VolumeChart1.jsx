"use client";

import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Helper function to convert timestamp to readable date format
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
};

// Helper function to calculate 'from' timestamp based on time range and resolution
const calculateFromTimestamp = (range, resolution) => {
  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  let secondsAgo = 0;

  switch (range) {
    case "1":  // 1 minute
    case "3":  // 3 minutes
    case "5":  // 5 minutes
    case "10": // 10 minutes
    case "30": // 30 minutes
    case "60": // 60 minutes (1 hour)
      secondsAgo = parseInt(range) * 60; // Calculate seconds for the given range
      break;
    case "D":  // 1 day
      secondsAgo = 24 * 60 * 60; // 1 day in seconds
      break;
    default:
      secondsAgo = 5 * 365 * 24 * 60 * 60; // Default to 5 years ago
  }

  return now - secondsAgo;
};

// Function to determine the resolution based on the time range
const calculateResolution = (range) => {
  switch (range) {
    case "1":
    case "3":
    case "5":
    case "10":
    case "30":
    case "60":
      return "1"; // 1-minute resolution for minute ranges
    case "D":
      return "D"; // Daily resolution for day ranges
    default:
      return "D"; // Default resolution for longer ranges
  }
};

export default function StockMarketChart(prop) {
  const [stockData, setStockData] = useState([]);
  const [timeRange, setTimeRange] = useState("1"); // Default to 1 minute
  const [resolution, setResolution] = useState("1"); // Default resolution for minute ranges
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth =localStorage.getItem('tokan')
if(auth==null  || auth==""){
  navigate("/login")
}
    const fetchStockData = async () => {
      const to = Math.floor(Date.now() / 1000); // Current timestamp
      const from = calculateFromTimestamp(timeRange, resolution); // Get 'from' timestamp based on the selected range
      const res = calculateResolution(timeRange); // Set resolution dynamically based on the time range

     // console.log(`From: ${from}, To: ${to}, Resolution: ${res}`); // Log for debugging
     // console.log(prop.SYMBOL);

      const apiUrl = `https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=${prop.SYMBOL}&resolution=${res}&from=${from}&to=${to}&countback=10&currencyCode=INR`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();

          if (data.s === "ok") {
            // Map API data to match chart format
          
            const chartData = data.t.map((timestamp, index) => ({
              date: formatDate(timestamp),
              price: data[prop.sim][index], // Closing price
            }));

            console.log("Chart data:", chartData); // Log fetched data for debugging
            setStockData(chartData);
          } else {
            console.error("Failed to fetch data");
          }
        } else {
          const text = await response.text();
          console.error("Unexpected response format:", text);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [timeRange, resolution]); // Refetch data when timeRange or resolution changes

  // Get the latest and previous price for the percentage change calculation
  const currentPrice = stockData.length ? stockData[stockData.length - 1].price : 0;
  const previousPrice = stockData.length > 1 ? stockData[stockData.length - 2].price : 0;
  const priceChange = currentPrice - previousPrice;
  const percentageChange = previousPrice ? (priceChange / previousPrice) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-9 md:p-10">
      <div className="w-full max-w-auto mx-auto bg-white shadow-md rounded-lg">
        {/* Header Section */}
        <div className="p-8 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-6">
            
           {prop.cname}
          </div>
        </div>

        {/* Time Range Buttons */}
        <div className="p-4 md:p-6">
          <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-4">
            {["1", "3", "5", "10", "30", "60", "D"].map((range) => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  setResolution(calculateResolution(range)); // Update resolution based on time range
                }}
                className={`py-2 px-4 text-sm font-medium text-gray-700 bg-white border rounded ${
                  timeRange === range ? "bg-gray-200" : ""
                }`}
              >
                {range} {range !== "D" ? "min" : "day"}
              </button>
            ))}
          </div>

          {/* Stock Chart */}
          <div className="h-[300px] md:h-[400px]">
            {loading ? (
              <p>Loading chart...</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Action Buttons */}
        
        </div>
      </div>
    </div>
  );
}
