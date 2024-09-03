import React from 'react';
import {View} from 'react-native';
import {TMockData} from '../../types/MockData';
import { StartHolder } from './StartHolder';
import { useNavigate } from '../../hooks/useNavigation';

export type Props = {
  getMarkerPosition: (props: TMockData['pickupLocation']) => void;
  setSnapPoint: (payload: any) => void;
  handleCustomer: (payload: any) => void;
  snapPoint: number;
  selectedCustomer: TMockData | undefined;
  setSelectedCustomer: (payload: any) => void;
};

export const CustomerBottomSheet = (props: Props) => {
  const navigation = useNavigate();
  const handleLocationSelect = (type: 'pickup' | 'destination') => () => {
    navigation.navigate('PickupLocation', { type });
  }

  return (
    <View>
      <View className='px-5 pt-5 pb-10 bg-white'>
        <StartHolder
          onPickupLocation={handleLocationSelect('pickup')}
          onDestinationLocation={handleLocationSelect('destination')}
          onBookNow={() => {}}
        />
      </View>
    </View>
  );
};
