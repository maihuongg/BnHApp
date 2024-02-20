import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleDangNhap = () => {
        navigation.navigate('LoginScreen');
    }
    const handleForgotPassword = () => {
    }
    const handleDangKy = () => {
    }
    return (
        <ScrollView>
            <View className="flex-1  bg-white" >
                <Image source={require('../../assets/logo.png')} style={{ width: 220, height: 200, alignSelf: 'center' }}
                    resizeMode="contain"
                    className="mt-20"></Image>
                <Text className="mx-auto justify-center font-bold text-xl">ĐĂNG KÝ </Text>
                <Text className="mt-2 ml-4 font-bold">CCCD/Số định danh</Text>
                <TextInput
                    className="p-2 ml-4 mr-4 mt-2 border-2 border-black rounded-lg text-black"
                    placeholder="Số định danh cá nhân"
                />
                <Text className="mt-2 ml-4 font-bold">Email</Text>
                <TextInput
                    className="p-2 ml-4 mr-4 mt-2 border-2 border-black rounded-lg text-black"
                    placeholder="Nhập email"
                />
                <Text className="mt-2 ml-4 font-bold">Mật khẩu</Text>
                <TextInput
                    className="p-2 ml-4 mr-4 mt-2 border-2 border-black rounded-lg text-black"
                    placeholder="Nhập mật khẩu"
                    secureTextEntry
                />
                <Text className="mt-2 ml-4 font-bold">Xác nhận mật khẩu</Text>
                <TextInput
                    className="p-2 ml-4 mr-4 mt-2 border-2 border-black rounded-lg text-black"
                    placeholder="Xác nhận mật khẩu"
                    secureTextEntry
                />
                <TouchableOpacity onPress={handleDangKy}
                    style={{ alignItems: 'center', backgroundColor: 'blue', padding: 10, margin: 10, borderRadius: 6 }}
                    className="items-center bg-blue-500 p-4 m-4 rounded-md" >
                    <Text className="text-white font-bold">ĐĂNG KÝ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text className="text-blue font-bold mx-auto justify-center">Quên mật khẩu ?</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center m-2">
                    <Text className="text-black ">Đã có tài khoản ?</Text>
                    <TouchableOpacity onPress={handleDangNhap}>
                        <Text className="text-blue font-bold ml-1">Đăng nhập ngay</Text>
                    </TouchableOpacity></View>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;
