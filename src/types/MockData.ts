export type TCoordinates = {
  latitude: number;
  longitude: number;
};

export type TStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'started'
  | 'picked-up'
  | 'completed'
  | 'dropped-off';

export type TMockData = {
  id: string;
  userId: string;
  driverId: string;
  pickupLocation: TCoordinates;
  pickupAddress: string;
  destination: TCoordinates;
  destinationAddress: string;
  expectedArrivalTime: string;
  status: TStatus;
  pickupTime: string;
  timestamp: string;
};
