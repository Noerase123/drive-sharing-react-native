import {useEffect} from 'react';
import {mockData} from '../mockData';
import {TMockData} from '../types/MockData';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {getList, setList} from '../store/reducers/NearbySlice';

const locationService = () => {
  return new Promise(resolve => {
    resolve(mockData);
  });
};

export const useLocationServiceAPI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listData = useSelector(getList);

  const fetchAPI = async () => {
    const response = await locationService();
    dispatch(setList(response as TMockData[]));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return listData;
};
