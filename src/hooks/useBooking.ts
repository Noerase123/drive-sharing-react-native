import {useSelector} from 'react-redux';
import {getDetails} from '../store/reducers/RideRequestDetailsSlice';
import {getStatus} from '../store/reducers/ProcessBookingSlice';
import {deltaCoordinates} from '../constants';
import {getLocation} from '../store/reducers/LocationSlice';
import {useEffect} from 'react';

type Props = {
  mapRef: any;
};

export function useBooking({mapRef}: Props) {
  const rideDetails = useSelector(getDetails);
  const location = useSelector(getLocation);
  const {status} = useSelector(getStatus);

  const handleDriveBooking = () => {
    const {pickupLocation, destination} = rideDetails;
    mapRef.current?.animateToRegion({
      ...pickupLocation,
      ...deltaCoordinates,
    });
    mapRef.current?.fitToCoordinates([pickupLocation, destination], {
      edgePadding: {
        top: 75,
        bottom: 75,
        left: 75,
        right: 75,
      },
    });
  };

  const handlePickedUpBooking = () => {
    mapRef.current?.animateToRegion({
      latitude: rideDetails.pickupLocation.latitude,
      longitude: rideDetails.pickupLocation.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  const handleCompletedBooking = () => {
    mapRef.current?.animateToRegion({
      latitude: rideDetails.destination.latitude,
      longitude: rideDetails.destination.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  const handleDroppedOffBooking = () => {
    mapRef.current?.animateToRegion({
      latitude: rideDetails.destination.latitude,
      longitude: rideDetails.destination.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  const handleProcessBooking = () => {
    mapRef.current?.animateToRegion(location.selectedCustomerLocation);
    mapRef.current?.fitToCoordinates(
      [location.currentLocation, location.selectedCustomerLocation],
      {
        edgePadding: {
          top: 75,
          bottom: 75,
          left: 75,
          right: 75,
        },
      },
    );
  };

  useEffect(() => {
    if (status === 'accepted') {
      handleProcessBooking();
    }
    switch (status) {
      case 'accepted':
        handleProcessBooking();
        break;
      case 'started':
        handleDriveBooking();
        break;
      case 'picked-up':
        handlePickedUpBooking();
        break;
      case 'dropped-off':
        handleDroppedOffBooking();
        break;
      case 'completed':
        handleCompletedBooking();
        break;
      default:
        break;
    }
  }, [status]);

  return location;
}
