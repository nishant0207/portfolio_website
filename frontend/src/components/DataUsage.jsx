import React, { useState } from 'react';
import axiosInstance from './axiosInstance';

const DataUsage = () => {
  const [dataUsed, setDataUsed] = useState(0);

  axiosInstance.interceptors.response.use((response) => {
    const requestSize = JSON.stringify(response.config.data || '').length;
    const responseSize = JSON.stringify(response.data || '').length;
    const totalSize = requestSize + responseSize;

    setDataUsed((prev) => prev + totalSize); // Accumulate total data used
    return response;
  });

  return <div style={{marginTop: "30px"}}>Total Data Used: {dataUsed} bytes</div>;
};

export default DataUsage;