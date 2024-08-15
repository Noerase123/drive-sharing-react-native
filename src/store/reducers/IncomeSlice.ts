import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';

type TEarnings = {
  fares: number;
  incentives?: number;
  misc?: number;
}

type TDeduction = {
  commission: number;
  rentalFees?: number;
  vehicleExpenses?: number;
  adjustment?: number;
}

export type TIncomeDetails = {
  dateCreated: string;
  userId: string;
  earnings: TEarnings;
  deductions: TDeduction;
}

type TIncome = {
  totalBalance: number,
  data: TIncomeDetails[];
}

const initialState = {
  data: [],
  totalBalance: 0
} as TIncome;

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncome(state: TIncome, action: PayloadAction<TIncomeDetails[]>) {
      const totalData = [...state.data, ...action.payload];
      const totalBalance = totalData.map(data => data.earnings.fares).reduce((a, b) => a + b, 0);
      return {
        ...state,
        totalBalance,
        data: totalData
      };
    },
    addIncome(state: TIncome, action: PayloadAction<TIncomeDetails>) {
      const totalBalance = state.totalBalance + action.payload.earnings.fares;
      return {
        ...state,
        totalBalance,
        data: [...state.data, action.payload]
      };
    }
  },
});

export const {setIncome, addIncome} = incomeSlice.actions;
export default incomeSlice.reducer;

export const getIncome = (state: RootState) => state.income;
