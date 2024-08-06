import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import {TCoordinates} from '../../types/MockData';
import {deltaCoordinates} from '../../constants';

export type TDeltaLocation = {
  latitudeDelta: number;
  longitudeDelta: number;
};

type TLocation = {
  currentLocation: TCoordinates & TDeltaLocation;
  selectedCustomerLocation: TCoordinates & TDeltaLocation;
};

const initialState = {} as TLocation;

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation(state: TLocation, action: PayloadAction<TCoordinates>) {
      return {
        ...state,
        currentLocation: {
          ...action.payload,
          ...deltaCoordinates,
        },
      };
    },
    setSelectedCustomerLocation(
      state: TLocation,
      action: PayloadAction<TCoordinates>,
    ) {
      return {
        ...state,
        selectedCustomerLocation: {
          ...action.payload,
          ...deltaCoordinates,
        },
      };
    },
  },
});

export const {setCurrentLocation, setSelectedCustomerLocation} =
  locationSlice.actions;
export default locationSlice.reducer;

export const getLocation = (state: RootState) => state.location;
