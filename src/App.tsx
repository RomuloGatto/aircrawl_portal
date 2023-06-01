import './App.css';

import React, { useEffect, useState } from 'react';
import Table, { Flight } from './Table';

import axios from 'axios';

// const data: Flight[] = [
//   {
//     date: '2023-10-01',
//     lastChecked: '1d',
//     departs: 'GRU',
//     arrives: 'LIS',
//     economy: 50,
//     premium: 0,
//     business: 200,
//     first: 0,
//   },
//   {
//     date: '2023-10-01',
//     lastChecked: '1d',
//     departs: 'GRU',
//     arrives: 'CDG',
//     economy: 70,
//     premium: 0,
//     business: 300,
//     first: 0,
//   },
//   {
//     date: '2023-10-03',
//     lastChecked: '1d',
//     departs: 'GRU',
//     arrives: 'MCO',
//     economy: 30,
//     premium: 0,
//     business: 150,
//     first: 0,
//   },
// ]

function App() {
  const [data, setData] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  // https://p01--skillful-icicle--j568k28k7hz4.code.run/api/v1/flight/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://p01--skillful-icicle--j568k28k7hz4.code.run/api/v1/flight/');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='main-container'>
      <Table inputData={data} />
    </div>
  );
}

export default App;

// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
