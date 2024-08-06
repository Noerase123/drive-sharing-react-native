import React, {useCallback, useRef, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {mockData} from '../mockData';
import {TMockData} from '../types/MockData';
import {CustomerDetails} from './CustomerDetails';
import {ItemListDetails} from './ItemListDetails';
import {useNavigate} from '../hooks/useNavigation';
import {useDispatch} from 'react-redux';
import {setData} from '../store/reducers/RideRequestDetailsSlice';
import NearbyList from './NearbyList';

export type Props = {
  getMarkerPosition: (props: TMockData['pickupLocation']) => void;
  snapPoint: number;
  setSnapPoint: (payload: any) => void;
};

export const CustomBottomSheet = ({
  getMarkerPosition,
  snapPoint,
  setSnapPoint,
}: Props) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<
    TMockData | undefined
  >(undefined);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index);
    if (index === 1) {
      setSnapPoint(1);
    } else if (index === 0) {
      setSnapPoint(0);
    }
  };

  const handleCustomer = (data: TMockData) => () => {
    getMarkerPosition(data.pickupLocation);
    setSelectedCustomer(data);
  };

  const handleNavigateDetails = (data: TMockData) => () => {
    dispatch(setData(data));
    navigation.navigate('RideRequestDetails');
  };

  const handleBack = () => {
    setSelectedCustomer(undefined);
  };

  const handleConfirmBooking = () => {
    console.log('testing');
  }

  return (
    <View>
      <TouchableOpacity className="bg-white" onPress={handlePresentModalPress}>
        {selectedCustomer ? (
          <View className="mt-5">
            <CustomerDetails
              onConfirmBooking={handleConfirmBooking}
              onBack={() => setSelectedCustomer(undefined)}
              onDetails={handleNavigateDetails(selectedCustomer)}
              data={selectedCustomer}
            />
          </View>
        ) : (
          <View className="p-5 flex-row justify-center">
            <Text className="text-black font-medium text-2xl px-5">
              Select Nearby
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={snapPoint}
        snapPoints={['25%', '53%']}
        onChange={handleSheetChanges}>
        <BottomSheetView className="flex-1">
          {selectedCustomer ? (
            <CustomerDetails
              onConfirmBooking={handleConfirmBooking}
              onDetails={handleNavigateDetails(selectedCustomer)}
              onBack={handleBack}
              data={selectedCustomer}
            />
          ) : (
            <NearbyList onPress={handleCustomer} />
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
