import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const NiftyChart = () => {
  const [niftyData, setNiftyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://latest-stock-price.p.rapidapi.com/price', {
          params: {
            Indices: 'NIFTY 50'
          },
          headers: {
            'X-RapidAPI-Key': '81478f3ab3mshbf82ed37ad5cad9p1ea897jsn1a84003e7481',
            'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
          }
        });
        setNiftyData(response.data); // Update niftyData state with fetched data
      } catch (error) {
        console.error('Error fetching Nifty data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: niftyData.map(data => data.date), // Use fetched data for labels
    datasets: [
      {
        label: 'Nifty',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: niftyData.map(data => data.value) // Use fetched data for chart values
      }
    ]
  };

  return (
    <div>
      <h2>Nifty Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default NiftyChart;
