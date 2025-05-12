import axios from 'axios';
import React, { useEffect, useState } from 'react';

const IPO = () => {
    const [data, setdata] = useState([])
    const myfunction = async () => {
        const res = await axios.get('https://nwmw.nuvamawealth.com/api/ipo/getIPOData');
        // console.log(res.data.IPOListed);
        setdata(res.data.IPOListed);



    }

    useEffect(() => {
        myfunction();


    }, []);
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
                <ul className="space-y-8">
                    <li className="space-y-4">
                      
                        <ul className="grid   sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 ">
                            {data.map((cul, index) => (


                                <li className='p-2'>

                                    <div className="group relative block h-full bg-white before:absolute before:rounded-md before:border-2 before:border-dashed before:border-gray-900">
                                        <div className="rounded-md h-full border-2 border-gray-900 bg-white transition">
                                            <div className="p-4 sm:p-6">
                                                <div className="flex items-start justify-between">

                                                </div>
                                                <h2 className="mt-4 font-medium text-gray-900 sm:text-lg"><b>{cul.Name}</b><samp className='text-l'>({cul.Symbol})</samp> </h2>
                                                <p><b>EXCHG: </b>{cul.EXCHG}</p>
                                                {/* <p><b>Date: </b></p> */}
                                                <p><b>ISSUEPRICE: </b>{cul.ISSUEPRICE}</p>
                                                <p><b>TYPE: </b>{cul.ISSUETYPE}</p>

                                                {/* <p><b>TYPE </b>Book Building {cul.checkAllot[1].Url }</p>  */}
                                                {/* <button type="button"   onClick={() => (window.location.href = cul.checkAllot[1].Url)} className="container bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mt-5 border border-gray-400 rounded shadow hover:bg-black-800">Allotment</button> */}
                                            </div>
                                        </div>
                                    </div>

                                </li>

                            ))}








                        </ul>
                    </li>


                </ul>
            </div>

        </>
    )
}

export default IPO
