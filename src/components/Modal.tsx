import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { cn } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../store/reducers/RideRequestDetailsSlice';
import { getStatus } from '../store/reducers/ProcessBookingSlice';
import { AppDispatch } from '../store';
import { getDialog, removeDialog } from '../store/reducers/DialogSlice';

export function CustomModal() {
  const dispatch = useDispatch<AppDispatch>();
  const rideDetails = useSelector(getDetails);
  const { status } = useSelector(getStatus);
  const {isVisible, color, title, description} = useSelector(getDialog);

  const handleRemoveDialog = () => dispatch(removeDialog());

  return (
    <Modal isVisible={isVisible}>
      <View className="bg-white rounded-lg overflow-hidden">
        <View className={cn('bg-blue-500 px-5 py-3', color)}>
          <Text className="text-xl text-white font-bold">
            {title || 'Cancel the booking'}
          </Text>
        </View>
        <View className="p-5">
          <Text className="text-lg text-gray-500">
            {description || 'Are you sure you want to cancel booking?'}
          </Text>
          {status === 'completed' && (
            <View className='mt-5'>
              <Text className="text-lg text-black font-semibold">
                Ride duration
              </Text>
              <View className='flex-row items-center justify-between'>
                <Text className="text-lg text-gray-500">
                  Accepted ride
                </Text>
                <Text className="text-lg text-black">
                  {rideDetails.timer?.accepted}
                </Text>
              </View>
              <View className='flex-row items-center justify-between'>
                <Text className="text-lg text-gray-500">
                  Picked-up customer
                </Text>
                <Text className="text-lg text-black">
                  {rideDetails.timer?.pickedUp}
                </Text>
              </View>
              <View className='flex-row items-center justify-between'>
                <Text className="text-lg text-gray-500">
                  Drive duration
                </Text>
                <Text className="text-lg text-black">
                  {rideDetails.timer?.started}
                </Text>
              </View>
            </View>
          )}
          <View className="w-full mt-5">
            <TouchableOpacity onPress={handleRemoveDialog}>
              <View
                className={cn(
                  'bg-blue-500 px-10 py-2 rounded-full',
                  color,
                )}>
                <Text className="text-xl text-white font-bold text-center">
                  Ok
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
