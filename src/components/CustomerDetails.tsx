import {Text, TouchableOpacity, View} from 'react-native';
import {BackIcon} from '../assets/icons/BackIcon';
import {TMockData} from '../types/MockData';
import React from 'react';

type TCustomerDetails = {
  onBack: () => void;
  onDetails: () => void;
  onConfirmBooking: () => void;
  data: TMockData;
};

export const CustomerDetails = ({
  onBack,
  onDetails,
  onConfirmBooking,
  data,
}: TCustomerDetails): JSX.Element => {
  const mapValues = [
    {
      label: 'Pick-up address',
      value: data.pickupAddress,
    },
    {
      label: 'Destination address',
      value: data.destinationAddress,
    },
    {
      label: 'Estimated travel time',
      value: '1hr 3mins',
    },
    {
      label: 'Payment',
      value: '$300 USD',
    },
  ];

  return (
    <View>
      <View className="px-3 flex-row items-center gap-2">
        <TouchableOpacity onPress={onBack}>
          <View className="flex-row items-center px-4 py-2">
            <BackIcon />
            <Text className="text-[15px] text-gray-600">back</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDetails}>
          <View className="flex-row justify-between items-center gap-1">
            <Text className="text-black text-2xl font-medium">
              {data.userId}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="relative px-4 mt-5">
        <View className="flex-col gap-3 mb-10">
          {mapValues.map((value, idx) => (
            <View key={idx} className="w-full">
              <Text className="text-md text-gray-400">{value.label}</Text>
              <Text className="text-lg text-black">{value.value}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={onConfirmBooking}>
            <View className="bg-blue-300 p-4 rounded-full items-center">
              <Text className="text-black font-medium">Confirm Booking</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
