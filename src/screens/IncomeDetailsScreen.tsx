import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { useNavigate } from '../hooks/useNavigation';
import { BackIcon } from '../assets/icons';

const mockDetails = {
  dateCreated: '09/22/2024 12:42 pm',
  overall: {
    earnings: [
      {
        label: "Fares",
        value: "1,623.25"
      },
      {
        label: "Incetives",
        value: "1035.00"
      },
      {
        label: "Misc. Payments",
        value: "56.90"
      },
    ],
    deductions: [
      {
        label: "Commissions",
        value: "-327.37",
      },
      {
        label: "Rental Fees",
        value: "0.00",
      },
      {
        label: "Vehicle Expenses",
        value: "0.00",
      },
      {
        label: "Adjustment",
        value: "-30.50",
      },
    ]
  }
};

export function IncomeDetailsScreen() {
  const navigation = useNavigate();
  const handleGoBack = () => navigation.goBack();

  const { earnings, deductions } = mockDetails.overall;

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='ml-5 mt-5'>
          <TouchableOpacity onPress={handleGoBack}>
            <View className='flex-row items-center'>
              <BackIcon />
              <Text className='text-md'>back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className='bg-white mx-4 mt-4 p-5 shadow rounded-lg'>
          <Text className='text-lg'>09/22/2024 12:42 pm</Text>
          <View className='p-2'>
            <Text className='text-lg'>
              Earnings
            </Text>
            <View className='mt-2'>
              {earnings.map(({ label, value }) => (
                <View className='flex-row justify-between items-center my-1'>
                  <Text className='text-gray-500'>{label}</Text>
                  <Text className='text-gray-500'>{value}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className='p-2'>
            <Text className='text-lg'>
              Deductions
            </Text>
            <View className='mt-2'>
              {deductions.map(({ label, value }) => (
                <View className='flex-row justify-between items-center my-1'>
                  <Text className='text-gray-500'>{label}</Text>
                  <Text className='text-gray-500'>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className='bg-white mx-4 mt-4 p-5 shadow rounded-lg'>
          <Text className='text-lg'>09/22/2024</Text>
          {[...new Array(5)].map(_ => ( 
            <View>
              <View className='flex-row justify-between items-center mt-2'>
                <Text className='text-lg'>12:42 pm</Text>
                <Text className='text-lg'>+300.00</Text>
              </View>
              <View className='border-t border-gray-300' />
            </View>
          ))}
          <View className='flex-row justify-between items-center mt-2'>
            <Text className='text-lg'>Total Earnings</Text>
            <Text className='text-lg'>1,500.00</Text>
          </View>
        </View>
        <View className='bg-white mx-4 mt-4 p-5 shadow rounded-lg'>
          <Text className='text-lg'>09/22/2024</Text>
          {[...new Array(5)].map(_ => ( 
            <View>
              <View className='flex-row justify-between items-center mt-2'>
                <Text className='text-lg'>12:42 pm</Text>
                <Text className='text-lg'>+300.00</Text>
              </View>
              <View className='border-t border-gray-300' />
            </View>
          ))}
          <View className='flex-row justify-between items-center mt-2'>
            <Text className='text-lg'>Total Earnings</Text>
            <Text className='text-lg'>1,500.00</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}