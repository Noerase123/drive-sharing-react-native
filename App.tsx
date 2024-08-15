/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, RideRequestDetails, MainIncomeScreen} from './src/screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyProfile } from './src/screens/MyProfile';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function DrawerNavigation(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Main'>
            <Drawer.Screen name='Main' component={Main} options={{ title: "Dashboard", headerTitle: "DriveWithMe App" }} />
            <Drawer.Screen name='Income' component={MainIncomeScreen} />
            <Drawer.Screen name='MyProfile' component={MyProfile} options={{ title: "My Profile" }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

function Main(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="RideRequestDetails"
        component={RideRequestDetails}
      />
    </Stack.Navigator>
  );
}

export default DrawerNavigation;
