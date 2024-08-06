export type TCoordinates = {
  latitude: number;
  longitude: number;
};

export type TMockData = {
  id: string;
  userId: string;
  driverId: string;
  pickupLocation: TCoordinates;
  pickupAddress: string;
  destination: TCoordinates;
  destinationAddress: string;
  expectedArrivalTime: string;
  status:
    | 'pending'
    | 'acepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off';
  pickupTime: string;
  timestamp: string;
};
