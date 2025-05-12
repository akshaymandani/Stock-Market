import React, { useEffect, useState } from "react";
import axios from "axios";
// Ensure you have @heroicons/react installed
import { ArrowDownIcon, ArrowUpIcon, Search } from "lucide-react";
const API_URL = "https://api.moneycontrol.com/mcapi/v1/indices/get-indian-indices";

export default function IndianIndices() {
  const [indices, setIndices] = useState([]);
  const [filteredIndices, setFilteredIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
//     const auth =localStorage.getItem('tokan')
// if(auth==null  || auth==""){
//   navigate("/login")
// }
    const fetchIndices = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data.data;
        setIndices(data.indiceList || []);
        setFilteredIndices(data.indiceList || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching indices data:", error);
        setError("Failed to fetch indices data");
        setLoading(false);
      }
    };

    fetchIndices();
  }, []);

  useEffect(() => {
    
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = indices.map(category => ({
        ...category,
        list: category.list.filter(index =>
          index.name.toLowerCase().includes(lowercasedQuery)
        )
      }));
      setFilteredIndices(filtered);
    } else {
      setFilteredIndices(indices);
    }
  }, [searchQuery, indices]);

  if (loading) {
    return <div className="flex justify-center items-center w-full h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center w-full h-screen text-red-600">Error: {error}</div>;
  }

  return (
    <div className="w-full overflow-x-auto bg-white text-black p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Indian Indices</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by index name..."
          className="w-full p-2 mb-4 border border-black rounded-md text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredIndices.map((category) => (
        <div key={category.name} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-center">{category.name}</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {category.list.length > 0 ? (
              category.list.map((index) => (
                <div
                  key={index.name}
                  className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 border border-black rounded-md p-3 w-full sm:w-1/3 md:w-1/5 lg:w-1/5 xl:w-1/5 "
                >
                  <div className="flex flex-col space-y-1">
                    <a
                      href={index.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:underline"
                    >
                      {index.name}
                    </a>
                    <div className="text-sm">{index.value}</div>
                  </div>
                  <div
                    className={`flex items-start md:items-center text-sm ${index.direction === -1 ? "text-red-500" : "text-green-500"}`}
                  >
                    {index.direction === -1 ? (
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                    )}
                    <span>{index.change}</span>
                    <span className="ml-1">({index.changePer}%)</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">No results found</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
