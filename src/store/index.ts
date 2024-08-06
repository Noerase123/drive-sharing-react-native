import {configureStore} from '@reduxjs/toolkit';
import rideRequestDetailsReducer from './reducers/RideRequestDetailsSlice';

export const store = configureStore({
  reducer: {
    rideRequestDetails: rideRequestDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
