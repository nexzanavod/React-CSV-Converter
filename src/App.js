import React, { useEffect, useState } from 'react';
import Beem from './beams.jpg';
import Logo from './Green Leaves Line Logo (1).gif';
import axios from 'axios';
import { CSVLink } from 'react-csv';

function VASTGenerator() {
  const [csvData, setCSVData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.mycricq.com/api/payments?filters[service_provider][$eq]=mobitel&pagination[pageSize]=10000');
        const data = response.data.data;
        const modifiedData = modifyData(data); // Modify data format
        setCSVData(modifiedData);
      } catch (error) {
        setErrorMsg('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); 

  // Function to modify data format
  const modifyData = (data) => {
    // Define header row
    const headerRow = ["Mobile", "Service Provider"];
    
    // Map each object to an array containing only the desired properties
    const modifiedData = data.map(item => [

      item.attributes.mobile,
      item.attributes.service_provider,
    ]);
  
    // Add header row at the beginning of the data array
    modifiedData.unshift(headerRow);
  
    return modifiedData;
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <img src={Beem} alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <img src={Logo} className="" alt="Tailwind Play" />

        {/* Render CSVLink only if csvData is available */}
        {csvData && (
          <CSVLink  data={csvData} filename={"generated.csv"} className="block bg-green-400 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto mt-4">
            Download CSV
          </CSVLink>
        )}

        {/* Error message display */}
        {errorMsg && (
          <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
        )}

      </div>
    </div>
  );
}

export default VASTGenerator;
