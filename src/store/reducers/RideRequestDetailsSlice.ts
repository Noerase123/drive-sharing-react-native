import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {TMockData} from '../../types/MockData';
import {RootState} from '..';

const initialState = {} as TMockData;

const rideRequestDetailsSlice = createSlice({
  name: 'rideRequestDetails',
  initialState,
  reducers: {
    setData(state: TMockData, action: PayloadAction<TMockData>) {
      return {...state, ...action.payload};
    },
  },
});

export const {setData} = rideRequestDetailsSlice.actions;
export default rideRequestDetailsSlice.reducer;

export const getDetails = (state: RootState) => state.rideRequestDetails;
