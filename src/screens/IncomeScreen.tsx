import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import {useNavigate} from '../hooks/useNavigation';
import { BackIcon } from '../assets/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IncomeDetailsScreen } from './IncomeDetailsScreen';
import { useIncomeServiceAPI } from '../services/incomeService';
import dayjs from 'dayjs';

const Stack = createNativeStackNavigator();

export function MainIncomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IncomeScreen" component={IncomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="IncomeDetails"
        component={IncomeDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function IncomeScreen() {
  const navigation = useNavigate();
  const listIncome = useIncomeServiceAPI();
  
  const handleIncomeDetails = () => navigation.navigate('IncomeDetails');

  return (
    <ScrollView>
      <View className='bg-white mx-4 mt-4 p-5 shadow rounded-lg'>
        <View className='flex-col gap-2 justify-center items-center'>
          <Text className='text-black'>Total balance</Text>
          <View className='flex-row items-end gap-x-2'>
            <Text className='text-lg text-black'>PHP</Text>
            <Text className='text-3xl text-black'>{listIncome.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>
      </View>
      <View className='bg-white mx-4 mt-4 p-5 shadow rounded-lg'>
        <View className='flex-col gap-2'>
          <Text className='text-lg text-black'>Earning history</Text>
          {listIncome.data.map((item, idx) => (
            <View className='my-5' key={idx}>
              <View className='flex-row justify-between items-center mb-3'>
                <Text className='text-lg text-black'>{dayjs(item.dateCreated).format('MM/DD/YYYY')}</Text>
                <TouchableOpacity onPress={handleIncomeDetails}>
                  <View className="rotate-180">
                    <BackIcon />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View className='flex-row justify-between items-center mt-2'>
                  <Text className='text-lg text-black'>{dayjs(item.dateCreated).format('HH:mm:ss A')}</Text>
                  <Text className='text-lg text-black'>+{item.earnings.fares.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                </View>
                <View className='border-t border-gray-300' />
              </View>
              {/* <View className='flex-row justify-between items-center mt-2'>
                <Text className='text-lg'>Total Earnings</Text>
                <Text className='text-lg'>1,500.00</Text>
              </View> */}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}