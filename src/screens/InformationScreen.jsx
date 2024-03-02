import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TopBar from './components/Topbar';
const InformationScreen = () => {
    const [activeItem, setActiveItem] = useState('user');
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };
    const navigation = useNavigation();

    return (
        <View className="flex-1">
            <View className="flex-row h-32 bg-bubble-gum">
                <Text>

                </Text>
            </View>
            <View className="flex-row bg-white items-center rounded-xl mx-4 py-2 -mt-10 shadow-md">
                <Image
                    className="w-24 h-24 rounded-full ml-4"
                    source={require("../../assets/2.png")} ></Image>
                <View className="flex-column justify-center items-center mx-2 ">
                    <Text className="text-black font-bold text-[18px]"> Nguyen Van A</Text>
                    <Text className="text-black text-[16px]"> Thành phố Hồ Chí Minh</Text>
                </View>
            </View>


            <TouchableOpacity>
                <View className="bg-white mx-4 mt-10 rounded-xl p-4 border-b-[1px] border-gray-200">
                    <View className="flex-row items-center">
                        <FontAwesome name="user-circle" size={24} color="black" />
                        <Text className="text-black font-semibold text-[18px] ml-4">Thông tin cá nhân</Text>
                        <View className="ml-auto">
                            <TouchableOpacity>
                                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className="bg-white mx-4 rounded-xl p-4 border-b-[1px] border-gray-200">
                    <View className="flex-row items-center">
                        <MaterialIcons name="date-range" size={24} color="black" />
                        <Text className="text-black font-semibold text-[18px] ml-4">Lịch hẹn của bạn</Text>
                        <View className="ml-auto">
                            <TouchableOpacity>
                                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View className="bg-white mx-4 rounded-xl p-4 border-b-[1px] border-semigray-100">
                    <View className="flex-row items-center">
                        <FontAwesome5 name="history" size={24} color="black" />
                        <Text className="text-black font-semibold text-[18px] ml-4">Lịch sử hiến máu</Text>
                        <View className="ml-auto">
                            <TouchableOpacity>
                                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View className="bg-white mx-4 rounded-xl p-4 border-b-[1px] border-semigray-100">
                <View className="flex-row items-center">
                    <MaterialIcons name="password" size={24} color="black" />
                    <Text className="text-black font-semibold text-[18px] ml-4">Đổi mật khẩu</Text>
                    <View className="ml-auto">
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </TouchableOpacity>

        </View>

    );
}
export default InformationScreen;