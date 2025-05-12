import axios from "axios";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VolumeChart1 from './VolumeChart1';

// API URLs
const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=n523AHFvFcZDnJ42iOz66PwkNiZtICJW11b1pXWUcTW8VxLVc_MCwOLse0fYkPqVV7Ao2tfT2-0AROeDPxi1gqnfODtrOpnvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKVjxqkJ9MRkbllCRgbQJ1rbgf0qXbLtnkbH0ssLoB29TyNEFPRRCo2QGeoo_uA4BVzWOxra5MkFiEzVn93ok472eY2DQ60mbdz9Jw9Md8uu&lib=M4j2yV-fIQ8xMm-XLNm70gVUY2Xw6ot48";
const Api_url1 = "https://api.moneycontrol.com/mcapi/v1/premarket/get-global-marketdata?section=mi";

export default function StockDetail() {
  const [data, setData] = useState([]);
  const [data1, setdata1] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const item = location.state?.item;
  const navigate = useNavigate(); // For navigating to login if token is invalid

  useEffect(() => {
    // Check for token and redirect if not available
      // const auth = localStorage.getItem('token');
      // if (!auth) {
      //   navigate("/login");
      // }

    const fetchData = async () => {
      try {
        const response1 = await axios.get(API_URL);
        setData(response1.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

      try {
        const response = await axios.get(Api_url1);
        setdata1(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [item, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d391369321565.5b7d0d570e829.gif"
          alt="Loading..."
          className="w-24 h-24"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">Error: {error}</div>;
  }

  const filteredItem = data.find(
    (stock) => stock.SYMBOL === item.SYMBOL || stock.nbsymbol === item.nbsymbol
  );

  if (!filteredItem) {
    return <div className="text-center text-gray-500 py-6">No stock data available</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#C9DABF] to-[#9CA986] p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {filteredItem.Name_Of_Company} ({filteredItem.SYMBOL})
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
              <div className="space-y-1 border border-gray-300 p-4 rounded-lg hover:shadow-md transition">
                <h3 className="text-2xl font-semibold text-gray-700">
                  {filteredItem.prize} Rs
                </h3>
                <p
                  className={`flex items-center text-xl ${
                    filteredItem.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {filteredItem.change >= 0 ? (
                    <ArrowUpIcon className="w-5 h-5 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-5 h-5 mr-1" />
                  )}
                  {filteredItem.change} ({filteredItem.changepct}%)
                </p>
              </div>
              {/* Repeat these sections for other data points */}
              <div className="space-y-1 border border-gray-300 p-4 rounded-lg hover:shadow-md transition">
                <p className="text-gray-600">
                  <span className="font-bold">Open:</span> {filteredItem.priceopen} Rs
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">High:</span> {filteredItem.high} Rs
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Low:</span> {filteredItem.low} Rs
                </p>
              </div>
              <div className="space-y-1 border border-gray-300 p-4 rounded-lg hover:shadow-md transition">
                <p className="text-gray-600">
                  <span className="font-bold">Volume:</span> {filteredItem.volume}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Avg Volume:</span> {filteredItem.volumeavg}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Market Cap:</span> {filteredItem.marketcap}
                </p>
              </div>
              <div className="space-y-1 border border-gray-300 p-4 rounded-lg hover:shadow-md transition">
                <p className="text-gray-600">
                  <span className="font-bold">P/E Ratio:</span> {filteredItem.pe}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">EPS:</span> {filteredItem.eps} Rs
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Dividend:</span> {filteredItem.dividend} Rs (
                  {filteredItem.dividendYield}%)
                </p>
              </div>
              <div className="space-y-1 border border-gray-300 p-4 rounded-lg hover:shadow-md transition">
                <p className="text-gray-600">
                  <span className="font-bold">Beta:</span> {filteredItem.beta}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">52 Week High:</span> {filteredItem.high52} Rs
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">52 Week Low:</span> {filteredItem.low52} Rs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 bg-white">
        <VolumeChart1 className="h-96 w-full" SYMBOL={filteredItem.SYMBOL} sim="c" cname="prize" />
        <VolumeChart1 className="h-96 w-full mt-4" SYMBOL={filteredItem.SYMBOL} sim="v" cname="Volume" />
      </div>
    </>
  );
}
