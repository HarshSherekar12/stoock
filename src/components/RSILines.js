import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const NiftyChart = () => {
  const [niftyData, setNiftyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/niftydata');
        setNiftyData(response.data);
      } catch (error) {
        console.error('Error fetching Nifty data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to calculate RSI
  const calculateRSI = (data, period = 14) => {
    const changes = [];
    for (let i = 1; i < data.length; i++) {
      changes.push(data[i].value - data[i - 1].value);
    }

    const gain = [];
    const loss = [];
    for (let i = 0; i < changes.length; i++) {
      if (changes[i] > 0) {
        gain.push(changes[i]);
        loss.push(0);
      } else {
        gain.push(0);
        loss.push(-changes[i]);
      }
    }

    const avgGain = [];
    const avgLoss = [];
    for (let i = period; i <= changes.length; i++) {
      const sumGain = gain.slice(i - period, i).reduce((acc, val) => acc + val, 0);
      const sumLoss = loss.slice(i - period, i).reduce((acc, val) => acc + val, 0);
      avgGain.push(sumGain / period);
      avgLoss.push(sumLoss / period);
    }

    const rsi = [];
    for (let i = 0; i < avgGain.length; i++) {
      const relativeStrength = avgGain[i] / avgLoss[i];
      const rsIndex = 100 - (100 / (1 + relativeStrength));
      rsi.push(rsIndex);
    }

    return rsi;
  };

  const chartData = {
    labels: niftyData.map(data => data.date),
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
        data: niftyData.map(data => data.value)
      },
      {
        label: 'RSI',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,99,132,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: calculateRSI(niftyData)
      }
    ]
  };

  return (
    <div>
      <h2>Nifty Chart with RSI</h2>
      <Line data={chartData} />
    </div>
  );
};

export default NiftyChart;
