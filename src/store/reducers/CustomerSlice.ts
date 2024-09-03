import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import {TCoordinates} from '../../types/MockData';
import {deltaCoordinates} from '../../constants';

export type TDeltaLocation = {
  latitudeDelta: number;
  longitudeDelta: number;
};

export type TCustomer = TCoordinates & TDeltaLocation & {
  name: string;
  address: string;
}

export type TCustomerLocation = {
  pickupLocation: TCustomer;
  destinationLocation: TCustomer;
};

const initialState = {} as TCustomerLocation;

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setPickupLocation(state: TCustomerLocation, action: PayloadAction<TCustomer>) {
      return {
        ...state,
        pickupLocation: {
          ...action.payload,
          ...deltaCoordinates,
        },
      };
    },
    setDestinationLocation(state: TCustomerLocation, action: PayloadAction<TCustomer>) {
      return {
        ...state,
        destinationLocation: {
          ...action.payload,
          ...deltaCoordinates,
        },
      };
    },
  },
});

export const { setPickupLocation, setDestinationLocation } = customerSlice.actions;
export default customerSlice.reducer;

export const getCustomer = (state: RootState) => state.customer;
