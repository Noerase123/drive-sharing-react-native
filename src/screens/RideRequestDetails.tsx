import {View, Text, ScrollView} from 'react-native';
import React, {useLayoutEffect, useRef} from 'react';
import {useNavigate} from '../hooks/useNavigation';
import {useSelector} from 'react-redux';
import {getDetails} from '../store/reducers/RideRequestDetailsSlice';
import MapView, {Marker} from 'react-native-maps';
import {deltaCoordinates} from '../constants';
import {TMockData} from '../types/MockData';

type TMapValues = {
  label: string;
  value: keyof TMockData;
};

export function RideRequestDetails() {
  const navigation = useNavigate();
  const data: any = useSelector(getDetails);
  const mapRef = useRef<MapView>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Request Details',
    });
  }, []);

  const getPosition = () => {
    mapRef.current?.animateToRegion({
      latitude: data.pickupLocation.latitude,
      longitude: data.pickupLocation.longitude,
      ...deltaCoordinates,
    });
    mapRef.current?.fitToCoordinates([data.pickupLocation, data.destination], {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
  };

  const mapValues: TMapValues[] = [
    {
      label: 'Customer name',
      value: 'userId',
    },
    {
      label: 'Pick-up address',
      value: 'pickupAddress',
    },
    {
      label: 'Destination address',
      value: 'destinationAddress',
    },
    {
      label: 'Pick-up address',
      value: 'pickupAddress',
    },
    {
      label: 'From your distance to customer arrival time',
      value: 'pickupTime',
    },
    {
      label: 'Expected Arrival time to your destination',
      value: 'expectedArrivalTime',
    },
  ];

  return (
    <ScrollView className="bg-white">
      <MapView
        followsUserLocation
        showsUserLocation
        ref={mapRef}
        onMapReady={getPosition}
        style={{height: 200}}>
        <Marker coordinate={data.pickupLocation} pinColor="#89CFF0" />
        <Marker coordinate={data.destination} pinColor="#FF5733" />
      </MapView>
      <View className="p-6 flex-col gap-2">
        {mapValues.map((value, idx) => (
          <View key={idx} className="w-full">
            <Text className="text-md text-gray-600">{value.label}</Text>
            <Text className="text-xl text-black">{data[value.value]}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
