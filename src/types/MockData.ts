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
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'completed'
    | 'dropped-off';
  pickupTime: string;
  timestamp: string;
};
