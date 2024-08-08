import {configureStore} from '@reduxjs/toolkit';
import rideRequestDetailsReducer from './reducers/RideRequestDetailsSlice';
import processBookingReducer from './reducers/ProcessBookingSlice';
import locationSlice from './reducers/LocationSlice';
import nearBySlice from './reducers/NearbySlice';
import dialogSlice from './reducers/DialogSlice';

export const store = configureStore({
  reducer: {
    rideRequestDetails: rideRequestDetailsReducer,
    processBooking: processBookingReducer,
    location: locationSlice,
    nearBy: nearBySlice,
    dialog: dialogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
