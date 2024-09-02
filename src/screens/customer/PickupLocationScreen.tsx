import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigate } from '../../hooks/useNavigation'
import { BackIcon } from '../../assets/icons';

export function PickupLocationScreen() {
  const navigate = useNavigate();

  const handleGoBack = () => navigate.goBack();
  
  useLayoutEffect(() => {
    navigate.setOptions({
      headerTitle: 'Search location',
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

  const data = [
    {
      id: 1,
      name: 'Manila'
    },
    {
      id: 2,
      name: 'Makati'
    },
    {
      id: 3,
      name: 'Pasay'
    },
  ];

  return (
    <View className='p-4'>
      <SearchBar />
      <FlatList
        className='mt-4 h-screen bg-white'
        data={data}
        renderItem={({item}) => (
          <View className='border-b border-gray-300 p-3'>
            <Text className='font-medium text-xl'>{item.name}</Text>
          </View>
        )}
      />
    </View>
  )
}

const SearchBar = () => {
  return (
    <View className='border border-gray-400 bg-white rounded-lg overflow-hidden'>
      <View className='flex-row justify-between p-3'>
        <Text className='text-gray-500'>Enter location</Text>
        <Text>Search</Text>
      </View>
    </View>
  );
}