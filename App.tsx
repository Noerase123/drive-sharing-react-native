import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, RideRequestDetails, MainIncomeScreen} from './src/screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyProfile } from './src/screens/MyProfile';
import { PickupLocationScreen } from './src/screens/customer/PickupLocationScreen';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function DrawerNavigation(): React.JSX.Element {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name='Income' component={MainIncomeScreen} />
      <Drawer.Screen name='MyProfile' component={MyProfile} options={{ title: "My Profile" }} />
    </Drawer.Navigator>
  );
}

function Main(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen
              name="RideRequestDetails"
              component={RideRequestDetails}
            />
            <Stack.Screen
              name="PickupLocation"
              component={PickupLocationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
    
  );
}

export default Main;
