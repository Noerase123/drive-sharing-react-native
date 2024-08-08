import React from 'react';
import {Text, View} from 'react-native';
import {TMockData} from '../types/MockData';
import {subStrValue} from '../utils/string';

type TItemProps = {
  data: TMockData;
  distance: string;
};

export const ItemListDetails = ({data, distance}: TItemProps) => (
  <View className="border-2 border-[#5e80a6] bg-blue-200 mb-3 mx-5 p-3 rounded-md">
    <View className="flex-row items-start justify-between">
      <View>
        <Text className="text-black text-lg">
          To {subStrValue(data.destinationAddress, 20)}
        </Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={2}
          className="text-lg w-[225px] text-gray-600">
          {distance} km
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-sm text-gray-600">Pickup Time</Text>
        <Text className="text-lg text-black">{data.pickupTime}</Text>
      </View>
    </View>
  </View>
);
