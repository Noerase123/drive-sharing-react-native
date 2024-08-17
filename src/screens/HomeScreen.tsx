import {
  View,
  Platform,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
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
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {deltaCoordinates} from '../constants';
import {
  setCurrentLocation,
  setSelectedCustomerLocation,
} from '../store/reducers/LocationSlice';
import {useLocationServiceAPI} from '../services/locationService';
import {useBooking} from '../hooks/useBooking';
import {getStatus} from '../store/reducers/ProcessBookingSlice';
import { setData } from '../store/reducers/RideRequestDetailsSlice';
import { CustomModal } from '../components/Modal';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '...';

export function HomeScreen() {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCustomer, setSelectedCustomer] = useState<
    TMockData | undefined
  >(undefined);
  const [snapPoint, setSnapPoint] = useState(0);
  const mapRef = useRef<MapView>(null);

  const location = useBooking({mapRef});
  const rideList = useLocationServiceAPI();
  const {status} = useSelector(getStatus);

  const getPosition = () => {
    // Geolocation.getCurrentPosition(loc => {
    //   mapRef.current?.animateToRegion({
    //     latitude: loc.coords.latitude,
    //     longitude: loc.coords.longitude,
    //     ...deltaCoordinates,
    //   });
    //   dispatch(setCurrentLocation(loc.coords));
    // });
    const coords = {
      latitude: 14.557591,
      longitude: 121.046458
    }
    mapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      ...deltaCoordinates,
    });
    dispatch(setCurrentLocation(coords));
  };

  const getMarkerPosition = (coors: TCoordinates) => {
    dispatch(setSelectedCustomerLocation(coors));
    mapRef.current?.animateToRegion({
      latitude: coors.latitude,
      longitude: coors.longitude,
      ...deltaCoordinates,
    });
  };

  const handleCallout = () => {
    navigation.navigate('RideRequestDetails');
  };

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
          // followsUserLocation
          // showsUserLocation
          region={location.currentLocation}
          style={{
            height: screenHeight - (Platform.OS === 'android' ? 150 : 190),
            width: screenWidth
          }}>
          {/* <Circle
            center={location.currentLocation}
            radius={500}
            strokeWidth={2}
            strokeColor="#82eedd"
            fillColor="#82eedd4d"
          /> */}
          {rideList.map((data, idx) => (
            <View key={idx}>
            
              <Marker
                coordinate={data.pickupLocation}
                pinColor="#89CFF0"
                identifier={'pickupLocation'}
                onPress={() => setCustomer(data)}>
                <Callout onPress={handleCallout}>
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
            </View>
          ))}
          {status === 'started' && (
            <MapViewDirections
              origin={rideList[0].pickupLocation}
              destination={rideList[0].destination}
              apikey={GOOGLE_PLACES_API_KEY}
              strokeColor="hotpink"
              strokeWidth={4}
            />
          )}
          {['dropped-off', 'started'].includes(status) ? (
            <Marker
              coordinate={rideList[0].destination}
              pinColor="#FF5733"
              identifier={'destination'}>
              <Callout>
                <View>
                  <Text className="text-black">
                    {rideList[0].destinationAddress}
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
        <CustomBottomSheet
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
