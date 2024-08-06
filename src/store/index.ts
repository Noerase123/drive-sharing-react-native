import {configureStore} from '@reduxjs/toolkit';
import rideRequestDetailsReducer from './reducers/RideRequestDetailsSlice';
import processBookingReducer from './reducers/ProcessBookingSlice';
import locationSlice from './reducers/LocationSlice';

export const store = configureStore({
  reducer: {
    rideRequestDetails: rideRequestDetailsReducer,
    processBooking: processBookingReducer,
    location: locationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
