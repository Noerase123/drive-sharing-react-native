import {View, Platform, Dimensions, Text, Image} from 'react-native';
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
import {mockData} from '../mockData';
import {TCoordinates, TMockData} from '../types/MockData';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigate} from '../hooks/useNavigation';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {setData} from '../store/reducers/RideRequestDetailsSlice';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {deltaCoordinates} from '../constants';

const screenHeight = Dimensions.get('window').height;

const GOOGLE_PLACES_API_KEY = '...';

export function HomeScreen() {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [openDirections, setOpenDirections] = useState(false);
  const [snapPoint, setSnapPoint] = useState(0);
  const mapRef = useRef<MapView>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'DriveWithMe App',
      headerTitleAlign: 'center',
    });
  }, []);

  const [coor, setCoor] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const getPosition = () => {
    Geolocation.getCurrentPosition(loc => {
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        ...deltaCoordinates,
      });
      setCoor({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        ...deltaCoordinates,
      });
    });
  };

  const getMarkerPosition = (coors: TCoordinates) => {
    setOpenDirections(true);
    setSnapPoint(1);
    mapRef.current?.animateToRegion({
      latitude: coors.latitude,
      longitude: coors.longitude,
      ...deltaCoordinates,
    });
  };

  const getMarkerDestination = (coors: TCoordinates) => {
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
            center={coor}
            radius={500}
            strokeWidth={2}
            strokeColor="#82eedd"
            fillColor="#82eedd4d"
          />
          {mockData.map((data, idx) => (
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
                onPress={() => getMarkerDestination(data.pickupLocation)}
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
                    <Text className="text-black">{data.destinationAddress}</Text>
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
