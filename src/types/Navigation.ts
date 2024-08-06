import {StackScreenProps} from '@react-navigation/stack';

type NavigationScreenProps = {
  Home: undefined;
  RideRequestDetails: undefined;
};

export type Navigation = StackScreenProps<NavigationScreenProps>['navigation'];
