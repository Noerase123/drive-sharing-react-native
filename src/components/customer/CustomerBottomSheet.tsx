import React, {useCallback, useRef, useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {TMockData} from '../../types/MockData';
import {useSelector} from 'react-redux';
import {
  getStatus,
} from '../../store/reducers/ProcessBookingSlice';
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

export const CustomerBottomSheet = ({
  snapPoint,
  setSnapPoint,
}: Props) => {
  const navigation = useNavigate();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {status} = useSelector(getStatus);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = (index: number) => {
    setSnapPoint(index);
  };

  const handleLocationSelect = () => {
    // setSnapPoint(1);
    navigation.navigate('PickupLocation');
  }

  const renderSheet = useMemo(() => {
    return (
      <StartHolder
        onPickupLocation={handleLocationSelect}
        onDestinationLocation={handleLocationSelect}
        onBookNow={() => {}}
      />
    );
  }, [status]);

  return (
    <View>
      <TouchableOpacity className="bg-white" onPress={handlePresentModalPress}>
        <View className="p-5 flex-row justify-center">
          <Text className="text-black font-medium text-2xl px-5">
            Select Nearby
          </Text>
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={snapPoint}
        snapPoints={['35%', '95%']}
        onChange={handleSheetChanges}>
        <BottomSheetView>
          <View className='px-5'>
            {renderSheet}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
