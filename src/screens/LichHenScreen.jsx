import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const LichHenScreen = () => {
    // const user = useSelector((state) => state.auth.login.currentUser);
    // const userId = user?._id;
    // const accessToken = user?.accessToken;
    const userPro = useSelector((state) => state.user.profile.getUser);
    const [activeItem, setActiveItem] = useState('user');
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('Information');
    }
    const donationHistory = [
        { eventName: 'Sự kiện 1', address: 'Địa chỉ 1', date: '13/03/2024' },
        { eventName: 'Sự kiện 2', address: 'Địa chỉ 2', date: '13/03/2024' },
        // Thêm các dòng dữ liệu khác nếu cần
    ];

    return (
        <View className="flex-1">
            <View className="flex-row h-32 bg-metal">
                <TouchableOpacity onPress={handleBack}>
                    <View className="my-10 ml-5">
                        <MaterialIcons name="keyboard-backspace" size={32} color="white" /></View>

                </TouchableOpacity>
            </View>
            <View className="flex-row bg-white justify-center  rounded-xl mx-4 py-2 -mt-10 shadow-md">
                <Text className=" p-5 items-center  text-black font-bold text-[22px]">LỊCH HẸN CỦA BẠN</Text>
            </View>
            <View className="flex-row mx-4 my-2 items-center">
                <MaterialIcons name="priority-high" size={24} color="red" />
                <Text className="font-bold text-red text-[16px] mr-4">Lưu ý:
                    <Text className="font-normal text-[14px]">
                        Nếu bạn hiến máu trễ hơn ngày trên lịch hẹn thì hệ thống sẽ tự động hủy đăng ký và xóa khỏi lịch hẹn
                    </Text>
                </Text>
            </View>
            <View className="p-4">
                <View className="overflow-hidden border border-gray-300 rounded-lg">
                    <View className="flex-row bg-gray-200 p-2 border-b border-gray-300">
                        <Text className="w-1/4 font-bold text-center">Tên sự kiện</Text>
                        <Text className="w-1/4 font-bold text-center">Địa chỉ</Text>
                        <Text className="w-1/4 font-bold text-center">Ngày hiến máu</Text>
                        <Text className="w-1/4 font-bold text-center">Thao tác</Text>
                    </View>

                    {donationHistory.map((donation, index) => (
                        <View key={index} className={`flex-row p-2 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                            <Text className="w-1/4 text-center">{donation.eventName}</Text>
                            <Text className="w-1/4 text-center">{donation.address}</Text>
                            <Text className="w-1/4 text-center">{donation.date}</Text>
                            <View className="w-1/4 text-center">
                                <View className="flex-row justify-center">
                                    <TouchableOpacity className="mr-2">
                                    <FontAwesome name="edit" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <MaterialIcons name="clear" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>

    );
}
export default LichHenScreen;