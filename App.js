// // App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroductionScreen from './src/screens/IntroductionScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import CodeScreen from './src/screens/CodeScreen';
import ResetPassword from './src/screens/ResetPassword';
import { Provider } from 'react-redux';
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createStackNavigator();
// import Realm from 'realm';
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introduction" screenOptions={{ headerShown: false }} headerMode="none">
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} 
        options={({ route }) => ({ title: `Reset Password: ${route.params.cccd}` })}
        />
        <Stack.Screen name="CodeScreen" component={CodeScreen} 
        options={({ route }) => ({ title: `Code Screen: ${route.params.cccd} - ${route.params.code}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// const realm = new Realm({
//   schema: [
//     {
//       name: 'SuKien', // Tên bảng "Sự kiện"
//       properties: {
//         tenSuKien: 'string', // Tên sự kiện
//         benhVienPhuTrach: 'string', // Bệnh viện phụ trách
//         soLuongDaDangKy: 'int', // Số lượng đã đăng ký
//         soLuongToiDa: 'int', // Số lượng tối đa
//         banner: 'string',
//       },
//     },
//     {
//       name: 'BenhVien', // Tên bảng "Bệnh viện"
//       properties: {
//         tenBenhVien: 'string', // Tên bệnh viện
//         diaChi: 'string', // Địa chỉ
//         hotline: 'string', // Hotline
//       },
//     },
//   ],
// });

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);

export default App;
