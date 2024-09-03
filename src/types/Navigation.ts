import {StackScreenProps} from '@react-navigation/stack';

type NavigationScreenProps = {
  Home: undefined;
  RideRequestDetails: undefined;
  IncomeScreen: undefined;
  IncomeDetails: undefined;
  PickupLocation: { type: 'pickup' | 'destination'; } | undefined;
};

export type Navigation = StackScreenProps<NavigationScreenProps>['navigation'];
