import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export function MyProfile() {

  const mapData = [
    {
      label: "Personal Information",
      values: [
        {
          label: 'Name',
          value: "John Isaac Caasi"
        },
        {
          label: 'Sex',
          value: "Not specified"
        },
        {
          label: 'Weight',
          value: "Not specified"
        },
      ]
    },
    {
      label: "Contact Details",
      values: [
        {
          label: 'Mobile Number',
          value: "+63922122313"
        },
        {
          label: 'Email',
          value: "admin@gmail.com"
        },
      ]
    }
  ];

  return (
    <ScrollView>
      <View className='bg-white p-5 m-3 rounded-md'>
        <View className='flex-row items-start gap-x-5'>
          <View className='h-20 w-20 bg-blue-400 rounded-full' />
          <View className='flex-col gap-y-1'>
            <Text className='text-gray-500 text-md font-medium'>Account name</Text>
            <Text className='text-black text-lg font-medium'>John Isaac Caasi</Text>
          </View>
        </View>
        <View className='flex-col gap-y-2 mt-5'>
          {mapData.map((data, index) => (
            <View key={index}>
              <Text className='text-lg font-bold my-2'>{data.label}</Text>
              {data.values.map((value, idx) => (
                <View key={idx} className='flex-col gap-y-1'>
                  <Text className='text-gray-500 text-md font-medium'>{value.label}</Text>
                  <Text className='text-black text-lg font-medium'>{value.value}</Text>
                </View>
              ))}
            </View>
          ))}
          <TouchableOpacity>
            <View className='bg-red-400 flex-row justify-center items-center p-4 rounded-full'>
              <Text className='text-white font-bold text-md'>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}