import axios from 'axios';

const API_URL = 'http://localhost:3001/logs';

// Create axios instance with better defaults
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const ingestLog = async (logData) => {
  try {
    const response = await api.post('', logData);
    return response.data;
  } catch (error) {
    console.error('Error ingesting log:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to ingest log');
  }
};

export const fetchLogs = async (filters = {}) => {
  try {
    const params = {};
    
    // Process filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (key === 'timestamp_start' || key === 'timestamp_end') {
          params[key] = new Date(value).toISOString();
        } else {
          params[key] = value;
        }
      }
    });

    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to fetch logs');
  }
};