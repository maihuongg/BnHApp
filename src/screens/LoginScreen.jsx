import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignUpScreen from './SignUpScreen';
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
    }
    const handleForgotPassword = () => {
    }
    const handleDangKy = () => {
        navigation.navigate('SignUpScreen');
    }
    return (
        <View className="flex-1  bg-white" >
            <Image source={require('../../assets/logo.png')} style={{ width: 220, height: 200, alignSelf: 'center' }}
                resizeMode="contain"
                className="mt-20"></Image>
            <Text className="mx-auto justify-center font-bold text-xl">ĐĂNG NHẬP ĐỂ TRẢI NGHIỆM </Text>
            <TextInput
                className="p-3 m-4 border-2 border-black rounded-lg text-black"
                placeholder="Số định danh cá nhân"
            />
            <TextInput
                className="p-3 m-4 border-2 border-black rounded-lg text-black"
                placeholder="Nhập mật khẩu"
                secureTextEntry
            />
            <TouchableOpacity onPress={handleLogin}
                style={{ alignItems: 'center', backgroundColor: 'blue', padding: 10, margin: 10, borderRadius: 6 }}
                className="items-center bg-blue-500 p-4 m-4 rounded-md" >
                <Text className="text-white font-bold">ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text className="text-blue font-bold mx-auto justify-center">Quên mật khẩu ?</Text>
            </TouchableOpacity>
            <View className="flex-row justify-center m-2"> 
            <Text className="text-black ">Chưa có tài khoản ?</Text>
            <TouchableOpacity onPress={handleDangKy}>
                <Text className="text-blue font-bold ml-1">Đăng ký ngay</Text>
            </TouchableOpacity></View>
        </View>
    );
};

export default LoginScreen;
