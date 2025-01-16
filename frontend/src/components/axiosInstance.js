import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  config.metadata = { startTime: new Date() }; // Track start time of request
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const { config } = response;
    const requestSize = JSON.stringify(config.data || '').length; // Request size in bytes
    const responseSize = JSON.stringify(response.data || '').length; // Response size in bytes
    const totalSize = requestSize + responseSize;

    console.log(`Request URL: ${config.url}`);
    console.log(`Request Size: ${requestSize} bytes`);
    console.log(`Response Size: ${responseSize} bytes`);
    console.log(`Total Data Used: ${totalSize} bytes`);

    return response;
  },
  (error) => {
    console.error('Error in response:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;