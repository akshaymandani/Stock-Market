import axios from "axios";
import { ArrowDownIcon, ArrowUpIcon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=n523AHFvFcZDnJ42iOz66PwkNiZtICJW11b1pXWUcTW8VxLVc_MCwOLse0fYkPqVV7Ao2tfT2-0AROeDPxi1gqnfODtrOpnvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKVjxqkJ9MRkbllCRgbQJ1rbgf0qXbLtnkbH0ssLoB29TyNEFPRRCo2QGeoo_uA4BVzWOxra5MkFiEzVn93ok472eY2DQ60mbdz9Jw9Md8uu&lib=M4j2yV-fIQ8xMm-XLNm70gVUY2Xw6ot48";
const API_URL_3 = "https://api.moneycontrol.com/mcapi/v1/premarket/get-global-marketdata?section=mi";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [symbolSuggestions, setSymbolSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response3] = await Promise.all([axios.get(API_URL), fetch(API_URL_3)]);
        setData(response1.data.data || []);
        const result = await response3.json();
        setData1(result.data || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = data.find(item => item.SYMBOL === searchQuery || item.Name_Of_Company === searchQuery);
    if (match) {
      navigate(`/details`, { state: { item: match } });
    } else {
      setSearchResult("No exact match found");
    }
    setSymbolSuggestions([]);
    setCompanySuggestions([]);
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setSymbolSuggestions([]);
      setCompanySuggestions([]);
    } else {
      const filteredSymbols = data.filter((item) =>
        typeof item.SYMBOL === 'string' && item.SYMBOL.toLowerCase().includes(query.toLowerCase())
      );
      setSymbolSuggestions(filteredSymbols);
      const filteredCompanies = data.filter((item) =>
        typeof item.Name_Of_Company === 'string' && item.Name_Of_Company.toLowerCase().includes(query.toLowerCase())
      );
      setCompanySuggestions(filteredCompanies);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d391369321565.5b7d0d570e829.gif"
          alt="Loading..."
          className="w-16 h-16"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <>   {/* Search Box */}
    <div className="flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
        <div className="p-6 border-b border-gray-300 text-center">
          <h2 className="text-2xl font-bold custom-font">Search Stocks</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Enter your search query"
              value={searchQuery}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-3 bg-green-500 text-white p-2 rounded-md flex items-center hover:bg-green-600"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Suggestions */}
            {(symbolSuggestions.length > 0 || companySuggestions.length > 0) && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-2 w-full max-h-40 overflow-y-auto shadow-lg">
                {symbolSuggestions.length > 0 && (
                  <div>
                    <h4 className="p-2 bg-gray-200 text-sm font-semibold">Symbols</h4>
                    <ul>
                      {symbolSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => setSearchQuery(suggestion.SYMBOL)}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {suggestion.SYMBOL}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {companySuggestions.length > 0 && (
                  <div>
                    <h4 className="p-2 bg-gray-200 text-sm font-semibold">Companies</h4>
                    <ul>
                      {companySuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => setSearchQuery(suggestion.Name_Of_Company)}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {suggestion.Name_Of_Company}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <p className="text-red-500 mt-2">{searchResult}</p>
          </form>
        </div>
      </div>
    </div>
      {/* Global Market Data */}
      <div className="w-full overflow-x-auto bg-gray-50 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {data1.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-start border border-gray-300 rounded-md p-4 w-full sm:w-1/3 md:w-1/5 bg-white shadow-lg"
            >
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-sm">{item.ltp}</div>
              <div
                className={`flex items-center text-sm ${item.chg >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {item.chg >= 0 ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                )}
                <span>{Math.abs(item.chg)}</span>
                <span className="ml-1">({item.chgper}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

   
    </>
  );
}
