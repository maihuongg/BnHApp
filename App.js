// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroductionScreen from './src/screens/IntroductionScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
const Stack = createStackNavigator();
// import Realm from 'realm';
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introduction" screenOptions={{
        headerShown: false
      }} headerMode="none">
        {/* <Stack.Screen name="Introduction" component={IntroductionScreen} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}></Stack.Screen>
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

export default AppNavigator;
