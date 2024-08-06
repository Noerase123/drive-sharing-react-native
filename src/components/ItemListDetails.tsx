import React from 'react';
import {Text, View} from 'react-native';
import {TMockData} from '../types/MockData';

type TItemProps = {
  data: TMockData;
};

export const ItemListDetails = ({data}: TItemProps) => (
  <View className="bg-blue-300 mb-3 mx-5 p-3 rounded-md">
    <View className="flex-row items-start justify-between">
      <View>
        <Text className="text-black text-lg">{data.userId}</Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={2}
          className="text-lg w-[225px] text-gray-600">
          To {data.destinationAddress}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-sm text-gray-600">Pickup Time</Text>
        <Text className="text-lg text-black">{data.pickupTime}</Text>
      </View>
    </View>
  </View>
);
