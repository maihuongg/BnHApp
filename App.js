import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo package
import { Provider } from 'react-redux'; // Import Provider from redux
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate from redux-persist

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import InformationScreen from './src/screens/InformationScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import IntroductionScreen from './src/screens/IntroductionScreen';
import ResetPassword from './src/screens/ResetPassword';
import ForgotPassword from './src/screens/ForgotPassword';
import CodeScreen from './src/screens/CodeScreen';
import { store, persistor } from './src/redux/store'; // Import store and persistor
import ProfileScreen from './src/screens/ProfileScreen';
import DetailEventScreen from './src/screens/DetailEventScreen';
import LichHenScreen from'./src/screens/LichHenScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test" screenOptions={{ headerShown: false }} headerMode="none">

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="LichHen" component={LichHenScreen} />
        
        {/* <Stack.Screen name="Auth" component={AuthStack} /> */}
        {/* <Stack.Screen name="Home" component={HomeTab} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Information" component={InformationTab} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'InformationScreen') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }, tabBarLabel: () => null
      })}
      tabBarOptions={{
        activeTintColor: '#0891b2',
        inactiveTintColor: '#0891b2',
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="InformationScreen" component={InformationScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const InformationTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="InformationScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'InformationScreen') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }, tabBarLabel: () => null
      })}
      tabBarOptions={{
        activeTintColor: '#0891b2',
        inactiveTintColor: '#0891b2',
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="InformationScreen" component={InformationScreen} options={{ headerShown: false }}/>
  
    </Tab.Navigator>
  );
};
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Introduction" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Introduction" component={IntroductionScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="DetailScreen" component={DetailEventScreen} />
    </Stack.Navigator>
  );
};
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);

export default App;
