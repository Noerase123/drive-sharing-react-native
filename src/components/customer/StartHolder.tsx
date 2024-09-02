import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type TStartHolder = {
  onPickupLocation: () => void;
  onDestinationLocation: () => void;
  onBookNow?: () => void;
};

export function StartHolder({
  onDestinationLocation,
  onPickupLocation,
  onBookNow
}: TStartHolder) {
  return (
    <View>
      <PickupDestinationPanel
        onPickupLocation={onPickupLocation}
        onDestinationLocation={onDestinationLocation} 
      />
      {Boolean(onBookNow) && (
        <TouchableOpacity onPress={onBookNow}>
          <View className='p-3 mt-3 bg-green-400 rounded-full shadow-lg border border-green-800'>
            <Text className='text-lg text-center font-medium text-black'>
              Book now
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View> 
  )
}

export function PickupDestinationPanel({
  onPickupLocation,
  onDestinationLocation
}: Omit<TStartHolder, 'onBookNow'>) {
  return (
    <View className='flex-col gap-y-3'>
      <TouchableOpacity onPress={onPickupLocation}>
        <View className='border-2 p-3 rounded-lg border-gray-400'>
          <Text className='text-lg font-medium text-gray-500'>
            Enter Pick-up location
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDestinationLocation}>
        <View className='border-2 p-3 rounded-lg border-gray-400'>
          <Text className='text-lg font-medium text-gray-500'>
            Enter Destination location
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}