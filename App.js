// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroductionScreen from './IntroductionScreen';
import HomeScreen from './HomeScreen';
import HomePage from './HomePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introduction" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="About" component={HomeScreen} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
