import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {mockData} from '../mockData';
import {ItemListDetails} from './ItemListDetails';
import {TMockData} from '../types/MockData';

type Props = {
  onPress: (data: TMockData) => () => void;
};

export default function NearbyList({onPress}: Props) {
  return (
    <View>
      <Text className="font-medium text-black text-2xl px-5 mb-4">Nearby</Text>
      <ScrollView className="h-[300px]">
        {mockData.map((item, idx) => (
          <TouchableOpacity key={idx} onPress={onPress(item)}>
            <ItemListDetails data={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
