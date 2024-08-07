import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {TMockData, TStatus} from '../../types/MockData';
import {RootState} from '..';
import {mockData} from '../../mockData';

const initialState = [] as TMockData[];

const nearBySlice = createSlice({
  name: 'nearBy',
  initialState,
  reducers: {
    setList(state: TMockData[], action: PayloadAction<TMockData[]>) {
      return [...state, ...action.payload];
    },
    refreshList() {
      return mockData;
    },
    selectedDrive(state: TMockData[], action: PayloadAction<TMockData>) {
      const rideID = action.payload.id;
      const filteredData = state.filter(dt => dt.id === rideID);
      return filteredData;
    },
    changeStatus(
      state: TMockData[],
      action: PayloadAction<{id: string; status: TStatus}>,
    ) {
      const rideID = action.payload.id;
      const newStatus = action.payload.status;
      const newData = state.map(dt => {
        if (dt.id === rideID) {
          return {...dt, status: newStatus};
        } else {
          return dt;
        }
      });
      return newData;
    },
    removeData(state: TMockData[], action: PayloadAction<TMockData>) {
      const rideID = action.payload.id;
      const filteredData = state.filter(dt => dt.id !== rideID);
      return filteredData;
    },
  },
});

export const {setList, refreshList, selectedDrive, removeData, changeStatus} =
  nearBySlice.actions;
export default nearBySlice.reducer;

export const getList = (state: RootState) => state.nearBy;
