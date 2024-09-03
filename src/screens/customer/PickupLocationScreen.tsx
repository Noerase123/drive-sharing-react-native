import { Dimensions, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigate, useRouter } from '../../hooks/useNavigation'
import { BackIcon } from '../../assets/icons';
import { subStrValue } from '../../utils/string';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { searchData } from '../../mockData/searchData';
import { getLocation } from '../../store/reducers/LocationSlice';
import { setPickupLocation, setDestinationLocation } from '../../store/reducers/CustomerSlice';
import { setStarted } from '../../store/reducers/ProcessBookingSlice';

const screenHeight = Dimensions.get('screen').height;

export function PickupLocationScreen() {
  const navigate = useNavigate();
  const { params } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentLocation } = useSelector(getLocation);

  const handleGoBack = () => navigate.goBack();
  
  useLayoutEffect(() => {
    navigate.setOptions({
      headerTitle: 'Search',
      headerLeft: () => (
        <TouchableOpacity onPress={handleGoBack}>
          <View className='flex-row items-center'>
            <BackIcon />
            <Text className='text-md'>back</Text>
          </View>
        </TouchableOpacity>
      )
    });
  }, []);

  const handleBookLocation = (payload: any) => () => {
    if (params.type === 'pickup') {
      dispatch(setPickupLocation(payload));
    } else if (params.type === 'destination') {
      dispatch(setDestinationLocation(payload));
      dispatch(setStarted());
    }
    navigate.goBack();
  }

  return (
    <SafeAreaView>
      <View className='p-4'>
        <SearchBar />
        <View className='mt-4 flex-row justify-between items-center'>
          <Text className='text-black font-medium'>Recently booked</Text>
          <TouchableOpacity onPress={handleBookLocation(currentLocation)}>
            <Text className='text-gray-400 font-medium'>Choose your location</Text>
          </TouchableOpacity>
        </View>
        <View className='mt-4 bg-white rounded-lg'>
          <FlatList
            style={{
              height: screenHeight - 220
            }}
            data={searchData}
            renderItem={({item}) => (
              <TouchableOpacity onPress={handleBookLocation(item)}>
                <View className='flex-row justify-between items-center border-b border-gray-300 p-3'>
                  <View>
                    <Text className='font-medium text-lg text-black'>{subStrValue(item.address, 34)}</Text>
                    <Text className='font-medium text-gray-400 text-md'>{item.distance}</Text>
                  </View>
                  <View className='rotate-180'>
                    <BackIcon />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const SearchBar = () => {
  return (
    <View className='border border-gray-400 bg-white rounded-lg overflow-hidden'>
      <View className='flex-row justify-between items-center'>
        <TextInput placeholder='Enter location' className='w-4/5 p-3' />
        <TouchableOpacity>
          <View className='p-3'>
            <Text>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}