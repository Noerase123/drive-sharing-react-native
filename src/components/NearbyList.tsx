import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {ItemListDetails} from './ItemListDetails';
import {TMockData} from '../types/MockData';
import {useSelector} from 'react-redux';
import {getList} from '../store/reducers/NearbySlice';
import {randomDistance} from '../utils/distance';

type Props = {
  onPress: (data: TMockData) => () => void;
};

export default function NearbyList({onPress}: Props) {
  const nearByList = useSelector(getList);
  const distance = (num: number, idx: number) => randomDistance * num + idx;
  return (
    <View>
      <Text className="font-medium text-black text-2xl px-5 mb-4">Nearby</Text>
      <ScrollView className="h-[300px]">
        {nearByList.map((item, idx) => {
          for (const num of [0.3, 0.6, 0.9]) {
            return (
              <TouchableOpacity key={idx} onPress={onPress(item)}>
                <ItemListDetails
                  data={item}
                  distance={Number(distance(num, idx)).toFixed(2)}
                />
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
