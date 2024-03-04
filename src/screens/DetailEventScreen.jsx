import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TopBar from './components/Topbar';
const DetailEventScreen = () => {
    const [activeItem, setActiveItem] = useState('user');
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };
    const navigation = useNavigation();
    const handleGoBackHome = () => {
        navigation.navigate('Home', { screen: 'HomeScreen' });
    }
    return (
        <View className="flex-1">
            <View className="w-full h-64 relative">
                {/* Hình ảnh */}
                <Image
                    source={require('../.././assets/2.png')}
                    className="w-full h-64 absolute"
                />

                {/* Biểu tượng */}
                <TouchableOpacity onPress={handleGoBackHome} className="absolute my-10 ml-5">
                    <MaterialIcons name="keyboard-backspace" size={32} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-1 bg-white rounded-2xl shadow-md -my-5">
                <Text className="text-green font-bold m-2 mx-4">Đang diễn ra</Text>
                {/* <Text className="text-yellow font-bold m-2 mx-4">Sắp diễn ra</Text>
                <Text className="text-red font-bold m-2 mx-4">Đã kết thúc</Text> */}
                <Text className="text-black font-bold text-[18px] mx-4">Một giọt máu, một cuộc đời</Text>
                <View className="flex-row border-t-[1px] border-semigray-10 mt-2">
                    <Text className="text-black font-bold text-[16px] my-2 mx-4">Địa chỉ:
                        <Text className="text-black font-normal text-[16px] my-2 leading-6"> Số 1 Võ Văn Ngân, phường Linh Chiểu, TP Thủ Đức, TPHCM </Text></Text>

                </View>

                <View className="flex-row  bg-[#d7faf5] mx-4 my-2 justify-center ">
                    <Text className="text-black font-bold text-[16px] my-4 mx-2">Ngày bắt đầu: </Text>
                    <Text className="text-black font-normal text-[16px] my-4">10/03/2024</Text>
                </View>
                <View className="flex-row  bg-[#f7e1d7] mx-4 my-2 justify-center">
                    <Text className="text-black font-bold text-[16px] my-4 mx-2">Ngày kết thúc: </Text>
                    <Text className="text-black font-normal text-[16px] my-4">17/03/2024</Text>
                </View>
                <View className="flex-row  bg-[#e7eaed] mx-4 my-2 justify-center">
                    <Text className="text-black font-bold text-[16px] my-4 mx-2">Số lượng đã đăng ký: </Text>
                    <Text className="text-black font-normal text-[16px] my-4">51/<Text className="text-black font-bold text-[16px]">100</Text></Text>
                </View>
                <TouchableOpacity>
                    <View className="bg-blue mx-auto items-center justify-center rounded-md my-2">
                        <Text className="text-white font-bold p-3 mx-3 text-[16px]">ĐĂNG KÝ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>


    );
}
export default DetailEventScreen;