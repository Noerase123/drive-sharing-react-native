import {createSlice} from '@reduxjs/toolkit';
import {TMockData} from '../../types/MockData';
import {RootState} from '..';

export type TProcessBooking = {
  status: TMockData['status'];
};

const initialState = {} as TProcessBooking;

const processBookingSlice = createSlice({
  name: 'processBooking',
  initialState,
  reducers: {
    setPending(state: TProcessBooking) {
      return {
        ...state,
        status: 'pending',
      };
    },
    setAccepted(state: TProcessBooking) {
      return {
        ...state,
        status: 'accepted',
      };
    },
    setStarted(state: TProcessBooking) {
      return {
        ...state,
        status: 'started',
      };
    },
    setDeclined(state: TProcessBooking) {
      return {
        ...state,
        status: 'declined',
      };
    },
    setPickedUp(state: TProcessBooking) {
      return {
        ...state,
        status: 'picked-up',
      };
    },
    setDroppedOff(state: TProcessBooking) {
      return {
        ...state,
        status: 'dropped-off',
      };
    },
    setCompleted(state: TProcessBooking) {
      return {
        ...state,
        status: 'completed',
      };
    },
  },
});

export const {
  setPending,
  setAccepted,
  setStarted,
  setDeclined,
  setPickedUp,
  setDroppedOff,
  setCompleted,
} = processBookingSlice.actions;

export default processBookingSlice.reducer;

export const getStatus = (state: RootState) => state.processBooking;
