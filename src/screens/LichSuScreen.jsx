import { View, Text, TextInput, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';
import baseUrl from '../utils/constant';
import moment from "moment";
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed,
} from "../redux/userSlice";
const LichSuScreen = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const userPro = useSelector((state) => state.user.profile.getUser);
    const userEventFilter = userPro.history.filter(event => event.status_user === "1");
    const [activeItem, setActiveItem] = useState('user');
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleBack = () => {
        navigation.navigate('InformationScreen');
    }

    useEffect(() => {
        const handleProfile = async () => {
            dispatch(userprofileStart());

            try {
                const response1 = await fetch(`${baseUrl}/v1/user/profile/`+ userId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response1.ok) {
                    dispatch(userprofileFailed());
                } else {
                    const data1 = await response1.json();
                    dispatch(userprofileSuccess(data1));
                    console.log("aaa");
                }
            } catch (error) {
                dispatch(userprofileFailed());
            }
        }
        handleProfile();
    }, [dispatch]);

    return (
        <View className="flex-1">
            <View className="flex-row h-32 bg-metal">
                <TouchableOpacity onPress={handleBack}>
                    <View className="my-10 ml-5">
                        <MaterialIcons name="keyboard-backspace" size={32} color="white" /></View>

                </TouchableOpacity>
            </View>
            <View className="flex-row bg-white justify-center  rounded-xl mx-4 py-2 -mt-10 shadow-md">
                <Text className=" p-5 items-center  text-black font-bold text-[22px]">LỊCH SỬ HIẾN MÁU CỦA BẠN</Text>
            </View>
            <View className="p-4">
                <View className="overflow-hidden border border-gray-300 rounded-lg">
                    <View className="flex-row bg-gray-200 p-2 border-b border-gray-300">
                        <Text className="w-1/4 font-bold text-center">Tên sự kiện</Text>
                        <Text className="w-1/4 font-bold text-center">Địa chỉ</Text>
                        <Text className="w-1/4 font-bold text-center">Ngày hiến máu</Text>
                    </View>

                    {userEventFilter.length > 0 ? (
                        userEventFilter.map((donation, index) => (
                            <View key={index} className={`flex-row p-2 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                <Text className="w-1/3 text-center">{donation.eventName}</Text>
                                <Text className="w-1/3 text-center">{donation.address_event}</Text>
                                <Text className="w-1/3 text-center">{moment(donation.date).format('DD-MM-YYYY')}</Text>
                            </View>
                        ))
                    ) : (
                        <View className="flex items-center justify-center">
                            <Text className="text-center">Bạn không có lịch sử hiến máu.</Text>
                        </View>
                    )}

                </View>
            </View>
        </View>

    );
}
export default LichSuScreen;