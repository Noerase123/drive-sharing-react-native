import {View, Platform, Dimensions, Text, Image} from 'react-native';
import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {CustomBottomSheet} from '../components/BottomSheet';
import {TCoordinates, TMockData} from '../types/MockData';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigate} from '../hooks/useNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {getDetails, setData} from '../store/reducers/RideRequestDetailsSlice';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {deltaCoordinates} from '../constants';
import {
  getLocation,
  setCurrentLocation,
  setSelectedCustomerLocation,
} from '../store/reducers/LocationSlice';
import {getStatus} from '../store/reducers/ProcessBookingSlice';
import {useLocationServiceAPI} from '../services/locationService';

const screenHeight = Dimensions.get('window').height;

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export function HomeScreen() {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [openDirections, setOpenDirections] = useState(false);
  const [snapPoint, setSnapPoint] = useState(0);
  const mapRef = useRef<MapView>(null);
  const location = useSelector(getLocation);
  const rideDetails = useSelector(getDetails);
  const {status} = useSelector(getStatus);

  const locationData = useLocationServiceAPI();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'DriveWithMe App',
      headerTitleAlign: 'center',
    });
  }, []);

  const getPosition = () => {
    Geolocation.getCurrentPosition(loc => {
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        ...deltaCoordinates,
      });
      dispatch(setCurrentLocation(loc.coords));
    });
  };

  const getMarkerPosition = (coors: TCoordinates) => {
    dispatch(setSelectedCustomerLocation(coors));
    setOpenDirections(true);
    mapRef.current?.animateToRegion({
      latitude: coors.latitude,
      longitude: coors.longitude,
      ...deltaCoordinates,
    });
  };

  const handleCallout = (data: TMockData) => () => {
    dispatch(setData(data));
    navigation.navigate('RideRequestDetails');
  };

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

  return (
    <BottomSheetModalProvider>
      <View className="relative h-screen w-full">
        <MapView
          ref={mapRef}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          onMapReady={getPosition}
          followsUserLocation
          showsUserLocation
          style={{
            height: screenHeight - (Platform.OS === 'android' ? 150 : 190),
          }}>
          <Circle
            center={location.currentLocation}
            radius={500}
            strokeWidth={2}
            strokeColor="#82eedd"
            fillColor="#82eedd4d"
          />
          {locationData.map((data, idx) => (
            <View key={idx}>
              {openDirections && (
                <MapViewDirections
                  origin={data.pickupLocation}
                  destination={data.destination}
                  apikey={GOOGLE_PLACES_API_KEY}
                  strokeColor="hotpink"
                  strokeWidth={4}
                />
              )}
              <Marker
                coordinate={data.pickupLocation}
                pinColor="#89CFF0"
                identifier={'pickupLocation'}>
                <Callout onPress={handleCallout(data)}>
                  <View>
                    <Text className="text-black">{data.pickupAddress}</Text>
                    <View className="flex-row justify-center">
                      <Image
                        source={require('../assets/images/building.png')}
                        style={{width: 100, height: 100, objectFit: 'cover'}}
                      />
                    </View>
                  </View>
                </Callout>
              </Marker>
              <Marker
                coordinate={data.destination}
                pinColor="#FF5733"
                identifier={'destination'}>
                <Callout>
                  <View>
                    <Text className="text-black">
                      {data.destinationAddress}
                    </Text>
                    <View className="flex-row justify-center">
                      <Image
                        source={require('../assets/images/building.png')}
                        style={{width: 100, height: 100, objectFit: 'cover'}}
                      />
                    </View>
                  </View>
                </Callout>
              </Marker>
            </View>
          ))}
        </MapView>
        <CustomBottomSheet
          getMarkerPosition={getMarkerPosition}
          snapPoint={snapPoint}
          setSnapPoint={setSnapPoint}
        />
      </View>
    </BottomSheetModalProvider>
  );
}
