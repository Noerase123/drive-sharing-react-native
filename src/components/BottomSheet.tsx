import React, {useCallback, useRef, useEffect, useState, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {TMockData} from '../types/MockData';
import {CustomerDetails} from './CustomerDetails';
import {useNavigate} from '../hooks/useNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {getDetails, setData} from '../store/reducers/RideRequestDetailsSlice';
import NearbyList from './NearbyList';
import {
  getStatus,
  setAccepted,
  setCompleted,
  setDroppedOff,
  setPending,
  setPickedUp,
  setStarted,
} from '../store/reducers/ProcessBookingSlice';
import {capitalize} from '../utils/string';
import {
  PhoneIcon,
  MessageIcon,
  RouteIcon,
  InfoIcon,
  ChevUpIcon,
} from '../assets/icons';
import {
  refreshList,
  removeData,
  selectedDrive,
} from '../store/reducers/NearbySlice';
import {setDialog} from '../store/reducers/DialogSlice';

export type Props = {
  getMarkerPosition: (props: TMockData['pickupLocation']) => void;
  setSnapPoint: (payload: any) => void;
  snapPoint: number;
  selectedCustomer: TMockData | undefined;
  setSelectedCustomer: (payload: any) => void;
};

export const CustomBottomSheet = ({
  getMarkerPosition,
  snapPoint,
  setSnapPoint,
  selectedCustomer,
  setSelectedCustomer,
}: Props) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const rideDetails = useSelector(getDetails);
  const {status} = useSelector(getStatus);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = (index: number) => {
    if (index === 1) {
      setSnapPoint(1);
    } else if (index === 0) {
      setSnapPoint(0);
    }
  };

  const handleCustomer = (data: TMockData) => () => {
    getMarkerPosition(data.pickupLocation);
    setSnapPoint(1);
    dispatch(setData(data));
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
    dispatch(
      setDialog({
        isVisible: true,
        title: 'Ride accepted',
        color: 'bg-green-500',
        description: 'Customer will be notify about the confirmation.',
      }),
    );
    setSnapPoint(2);
    dispatch(setAccepted());
    setBooked(true);
  };

  const handleCancelBooking = async () => {
    dispatch(removeData(rideDetails));
    dispatch(
      setDialog({
        isVisible: true,
        title: 'Ride cancelled',
        color: 'bg-red-500',
        description: 'Customer will be notify about the cancellation.',
      }),
    );
    setSnapPoint(1);
    dispatch(setPending());
    setBooked(false);
    setSelectedCustomer(undefined);
    getMarkerPosition(rideDetails.pickupLocation);
    dispatch(refreshList());
  };

  const handleArrivedBooking = () => {
    dispatch(setPickedUp());
    getMarkerPosition(rideDetails.pickupLocation);
  };

  const handleStartDrive = () => {
    dispatch(selectedDrive(rideDetails));
    dispatch(setStarted());
    dispatch(
      setDialog({
        isVisible: true,
        title: 'Ride started',
        color: 'bg-blue-400',
        description: "Let's go to your destination!",
      }),
    );
  };

  const handleDroppedOff = () => {
    dispatch(setDroppedOff());
    getMarkerPosition(rideDetails.destination);
    dispatch(refreshList());
  };

  const handleCompleted = () => {
    dispatch(
      setDialog({
        isVisible: true,
        title: 'Ride completed',
        color: 'bg-green-500',
        description:
          'Ride has completed. Customer will give a feedback accordingly.',
      }),
    );
    dispatch(setCompleted());
    dispatch(removeData(rideDetails));
    setSelectedCustomer(undefined);
    setBooked(false);
  };

  const mapIcons = [
    {
      icon: <PhoneIcon />,
      onPress: () => {},
    },
    {
      icon: <MessageIcon />,
      onPress: () => {},
    },
    {
      icon: <RouteIcon />,
      onPress: () => {},
    },
    {
      icon: <InfoIcon />,
      onPress: () => navigation.navigate('RideRequestDetails'),
    },
  ];

  const renderStatusButton = useMemo(() => {
    switch (status) {
      case 'accepted':
        return (
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="mt-4 w-2/3"
              onPress={handleArrivedBooking}>
              <View className="border-2 border-[#147538] bg-green-500 p-4 rounded-full items-center">
                <Text className="text-white font-medium">Arrived</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4 w-[110px]"
              onPress={handleCancelBooking}>
              <View className="border-2 border-[#962a2a] bg-red-500 p-4 rounded-full items-center">
                <Text className="text-white font-medium">Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'picked-up':
        return (
          <View className="flex-row justify-between">
            <TouchableOpacity className="mt-4 w-2/3" onPress={handleStartDrive}>
              <View className="border-2 border-[#5e80a6] bg-blue-400 p-4 rounded-full items-center">
                <Text className="text-white font-medium">Drive</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4 w-[110px]"
              onPress={handleCancelBooking}>
              <View className="border-2 border-[#962a2a] bg-red-500 p-4 rounded-full items-center">
                <Text className="text-white font-medium">Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'started':
        return (
          <TouchableOpacity className="mt-4 w-full" onPress={handleDroppedOff}>
            <View className="border-2 border-[#147538] bg-green-500 p-4 rounded-full items-center">
              <Text className="text-white font-medium">Dropped-off</Text>
            </View>
          </TouchableOpacity>
        );
      case 'dropped-off':
        return (
          <TouchableOpacity className="mt-4 w-full" onPress={handleCompleted}>
            <View className="border-2 border-[#147538] bg-green-500 p-4 rounded-full items-center">
              <Text className="text-white font-medium">Complete </Text>
            </View>
          </TouchableOpacity>
        );
      default:
        break;
    }
  }, [status]);

  const renderSheet = useMemo(() => {
    if (booked) {
      return (
        <View className="px-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-black text-lg">
              Booked for {rideDetails.userId}
            </Text>
            <View className="border p-2 rounded-md bg-green-500 border-green-700">
              <Text className="text-white text-md font-bold">
                {capitalize(status)}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            {mapIcons.map((data, idx) => (
              <TouchableOpacity key={idx} onPress={data.onPress}>
                <View className="border-2 p-4 rounded-full">{data.icon}</View>
              </TouchableOpacity>
            ))}
          </View>
          {renderStatusButton}
        </View>
      );
    }
    if (selectedCustomer) {
      return (
        <CustomerDetails
          onConfirmBooking={handleConfirmBooking}
          onDetails={handleNavigateDetails(selectedCustomer)}
          onBack={handleBack}
          data={selectedCustomer}
        />
      );
    } else {
      return <NearbyList onPress={handleCustomer} />;
    }
  }, [selectedCustomer, status]);

  const renderButtonSheet = useMemo(() => {
    if (booked) {
      return (
        <View className="pt-2 pb-5 flex-col items-center justify-center">
          <ChevUpIcon />
          <Text className="text-black font-medium text-2xl px-5">
            View Details
          </Text>
        </View>
      );
    } else if (selectedCustomer) {
      return (
        <View className="p-5">
          <CustomerDetails
            onConfirmBooking={handleConfirmBooking}
            onDetails={handleNavigateDetails(selectedCustomer)}
            onBack={handleBack}
            data={selectedCustomer}
          />
        </View>
      );
    }
    return (
      <View className="p-5 flex-row justify-center">
        <Text className="text-black font-medium text-2xl px-5">
          Select Nearby
        </Text>
      </View>
    );
  }, [selectedCustomer, status]);

  return (
    <View>
      <TouchableOpacity className="bg-white" onPress={handlePresentModalPress}>
        {renderButtonSheet}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={snapPoint}
        snapPoints={['30%', '53%', '35%']}
        onChange={handleSheetChanges}>
        <BottomSheetView className="flex-1">{renderSheet}</BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
