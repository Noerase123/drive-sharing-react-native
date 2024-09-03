import {
  View,
  Platform,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {TCoordinates, TMockData} from '../types/MockData';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigate} from '../hooks/useNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {deltaCoordinates} from '../constants';
import {
  getLocation,
  setCurrentLocation,
  setSelectedCustomerLocation,
} from '../store/reducers/LocationSlice';
import {useBooking} from '../hooks/useBooking';
import { setData } from '../store/reducers/RideRequestDetailsSlice';
import { CustomModal } from '../components/Modal';
import { CustomerBottomSheet } from '../components/customer/CustomerBottomSheet';
import { getCustomer } from '../store/reducers/CustomerSlice';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '...';

export function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCustomer, setSelectedCustomer] = useState<
    TMockData | undefined
  >(undefined);
  const [snapPoint, setSnapPoint] = useState(0);
  const mapRef = useRef<MapView>(null);

  const location = useSelector(getLocation);
  const customer = useSelector(getCustomer);

  const getPosition = () => {
    Geolocation.getCurrentPosition(loc => {
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        ...deltaCoordinates,
      });
      dispatch(setCurrentLocation(loc.coords));
    });
    // const coords = {
    //   latitude: 14.557591,
    //   longitude: 121.046458
    // }
    // mapRef.current?.animateToRegion({
    //   latitude: coords.latitude,
    //   longitude: coords.longitude,
    //   ...deltaCoordinates,
    // });
    // dispatch(setCurrentLocation(coords));
  };

  const getMarkerPosition = (coors: TCoordinates) => {
    dispatch(setSelectedCustomerLocation(coors));
    mapRef.current?.animateToRegion({
      latitude: coors.latitude,
      longitude: coors.longitude,
      ...deltaCoordinates,
    });
  };

  const readyForBooking = () => {
    const { pickupLocation, destinationLocation } = customer;
    mapRef.current?.animateToRegion({
      ...pickupLocation,
      ...deltaCoordinates,
    });
    mapRef.current?.fitToCoordinates([pickupLocation, destinationLocation], {
      edgePadding: {
        top: 75,
        bottom: 75,
        left: 75,
        right: 75,
      },
    });
  };

  useEffect(() => {
    if (customer?.pickupLocation) {
      mapRef.current?.animateToRegion({
        ...customer.pickupLocation,
        ...deltaCoordinates,
      });
    }
    if (customer?.destinationLocation) {
      readyForBooking();
    }
  }, [customer]);

  const setCustomer = (data: TMockData) => {
    getMarkerPosition(data.pickupLocation);
    setSnapPoint(1);
    dispatch(setData(data));
    setSelectedCustomer(data);
  };

  return (
    <BottomSheetModalProvider>
      <View className="relative h-screen w-full flex-1">
        <MapView
          ref={mapRef}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          onMapReady={getPosition}
          followsUserLocation
          showsUserLocation
          region={location.currentLocation}
          style={{
            height: screenHeight - (Platform.OS === 'android' ? 150 : 350),
            width: screenWidth
          }}>
          {customer?.pickupLocation ? (
            <Marker
              coordinate={customer.pickupLocation}
              pinColor="#89CFF0"
              identifier={'pickupLocation'}>
              <Callout>
                <View>
                  <Text className="text-black">{customer?.pickupLocation?.address}</Text>
                  <View className="flex-row justify-center">
                    <Image
                      source={require('../assets/images/building.png')}
                      style={{width: 100, height: 100, objectFit: 'cover'}}
                    />
                  </View>
                </View>
              </Callout>
            </Marker>
          ) : null}
          {customer?.destinationLocation ? (
            <Marker
              coordinate={customer.destinationLocation}
              pinColor="#FF5733"
              identifier={'destination'}>
              <Callout>
                <View>
                  <Text className="text-black">
                    {customer?.destinationLocation.address}
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
          ) : null}
        </MapView>
        <CustomerBottomSheet
          getMarkerPosition={getMarkerPosition}
          snapPoint={snapPoint}
          setSnapPoint={setSnapPoint}
          handleCustomer={setCustomer}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
        <CustomModal />
      </View>
    </BottomSheetModalProvider>
  );
}
