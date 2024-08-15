import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import { getIncome, setIncome, TIncomeDetails } from '../store/reducers/IncomeSlice';
import { incomeData } from '../mockData/income';

const incomeService = () => {
  return new Promise(resolve => {
    resolve(incomeData);
  });
};

export const useIncomeServiceAPI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listIncome = useSelector(getIncome);

  const fetchAPI = async () => {
    const response = await incomeService();
    dispatch(setIncome(response as TIncomeDetails[]));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return listIncome;
};
