import {StackScreenProps} from '@react-navigation/stack';

type NavigationScreenProps = {
  Home: undefined;
  RideRequestDetails: undefined;
  IncomeScreen: undefined;
  IncomeDetails: undefined;
};

export type Navigation = StackScreenProps<NavigationScreenProps>['navigation'];
