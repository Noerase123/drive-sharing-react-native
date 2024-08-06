import {useEffect, useState} from 'react';
import {mockData} from '../mockData';
import {TMockData} from '../types/MockData';

const locationService = () => {
  return new Promise(resolve => {
    resolve(mockData);
  });
};

export const useLocationServiceAPI = () => {
  const [data, setData] = useState<TMockData[]>([]);

  const fetchAPI = async () => {
    const response = await locationService();
    setData(response as TMockData[]);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return data;
};
