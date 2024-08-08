import {
  View,
  Platform,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useLayoutEffect} from 'react';
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
import Modal from 'react-native-modal';
import {getDialog, removeDialog} from '../store/reducers/DialogSlice';
import {cn} from '../utils';

const screenHeight = Dimensions.get('window').height;

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';

export function HomeScreen() {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [openDirections, setOpenDirections] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    TMockData | undefined
  >(undefined);
  const [snapPoint, setSnapPoint] = useState(0);
  const mapRef = useRef<MapView>(null);
  const {isVisible, color, title, description} = useSelector(getDialog);

  const location = useBooking({mapRef});
  const rideList = useLocationServiceAPI();

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

  const handleCallout = () => {
    navigation.navigate('RideRequestDetails');
  };

  const setCustomer = (data: TMockData) => {
    setSelectedCustomer(data);
    setSnapPoint(1);
  };

  const handleRemoveDialog = () => {
    dispatch(removeDialog());
  };

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
          {rideList.map((data, idx) => (
            <View key={idx}>
              {/* {openDirections && (
                <MapViewDirections
                  origin={data.pickupLocation}
                  destination={data.destination}
                  apikey={GOOGLE_PLACES_API_KEY}
                  strokeColor="hotpink"
                  strokeWidth={4}
                />
              )} */}
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
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
        <Modal isVisible={isVisible}>
          <View className="bg-white rounded-lg overflow-hidden">
            <View className={cn('bg-blue-500 px-5 py-3', color)}>
              <Text className="text-xl text-white font-bold">
                {title || 'Cancel the booking'}
              </Text>
            </View>
            <View className="p-5">
              <Text className="text-lg text-gray-500">
                {description || 'Are you sure you want to cancel booking?'}
              </Text>
              <View className="w-full mt-5">
                <TouchableOpacity onPress={handleRemoveDialog}>
                  <View
                    className={cn(
                      'bg-blue-500 px-10 py-2 rounded-full',
                      color,
                    )}>
                    <Text className="text-xl text-white font-bold text-center">
                      Ok
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </BottomSheetModalProvider>
  );
}
