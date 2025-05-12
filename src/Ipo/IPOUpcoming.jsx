import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-IN', options).replace(/\//g, '-');
};

// Modal component
const Modal = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    open ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <h2 className="text-2xl font-semibold mb-4">{data.Name} - {data.ISSUEPRICE}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-6">Application</th>
                  <th className="py-3 px-6">Lotes</th>
                  <th className="py-3 px-6">Shares</th>
                  <th className="py-3 px-6">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">Retail(Min)</td>
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-6">{data.MarketLot}</td>
                  <td className="py-4 px-6">{data.MarketLot * data.ISSUEPRI2}</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">Retail(Max)</td>
                  <td className="py-4 px-6">{Math.floor(200000 / (data.MarketLot * data.ISSUEPRI2))}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(200000 / (data.MarketLot * data.ISSUEPRI2)))}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(200000 / (data.MarketLot * data.ISSUEPRI2))) * data.ISSUEPRI2}</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">S-HNI(MIN)</td>
                  <td className="py-4 px-6">{Math.floor(200000 / (data.MarketLot * data.ISSUEPRI2)) + 1}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(200000 / (data.MarketLot * data.ISSUEPRI2)) + 1)}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(200000 / (data.MarketLot * data.ISSUEPRI2)) + 1) * data.ISSUEPRI2}</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">S-HNI(MAX)</td>
                  <td className="py-4 px-6">{Math.floor(1000000 / (data.MarketLot * data.ISSUEPRI2))}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(1000000 / (data.MarketLot * data.ISSUEPRI2)))}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(1000000 / (data.MarketLot * data.ISSUEPRI2))) * data.ISSUEPRI2}</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="py-4 px-6">B-HNI(Min)</td>
                  <td className="py-4 px-6">{Math.floor(1000000 / (data.MarketLot * data.ISSUEPRI2)) + 1}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(1000000 / (data.MarketLot * data.ISSUEPRI2)) + 1)}</td>
                  <td className="py-4 px-6">{data.MarketLot * (Math.floor(1000000 / (data.MarketLot * data.ISSUEPRI2)) + 1) * data.ISSUEPRI2}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : null
  );
};

// IPO component
const IPO = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchIPOData = async () => {
    const res = await axios.get('https://nwmw.nuvamawealth.com/api/ipo/getIPOData');
    setData(res.data.IPOUpcoming);
  };

  useEffect(() => {
    fetchIPOData();
  }, []);

  const handleClickOpen = (id, openDate, closeDate) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  useEffect(() => {
    if (id !== null) {
      const filteredData = data.find((item) => item.CO_CODE === id);
      setFilter(filteredData ? [filteredData] : []);
    }
  }, [id, data]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        <ul className="space-y-8">
          <li className="space-y-4">
            <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.map((item) => (
                <li
                  key={item.CO_CODE}
                  className="p-2 cursor-pointer"
                  onClick={() => handleClickOpen(item.CO_CODE, item.OPENDATE, item.CLOSDATE)}
                >
                  <div className="relative block h-full bg-white border-2 border-gray-900 rounded-md transition-transform transform hover:scale-105">
                    <div className="p-4 sm:p-6">
                      <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
                        <b>{item.Name}</b> <span className="text-l">({item.Symbol})</span>
                      </h2>
                      <p><b>OPEN DATE:</b> {formatDate(item.OPENDATE)}</p>
                      <p><b>CLOSE DATE:</b> {formatDate(item.CLOSDATE)}</p>
                      <p><b>ISSUE PRICE:</b> {item.ISSUEPRI2}</p>
                      <p><b>TYPE:</b> {item.ISSUETYPE}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <Modal open={open} onClose={handleClose} data={filter[0]} />
    </>
  );
};

export default IPO;
