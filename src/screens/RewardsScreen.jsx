import { View, Text, TextInput, Button, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import baseUrl from '../utils/constant';
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed,
} from "../redux/userSlice";
const RewardsScreen = () => {
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
    const [modal, setModal] = useState(false);

    const handleBack = () => {
        navigation.navigate('InformationScreen');
    }

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        if (currentMonth === 0 && currentDay === 1) { 
            setModal(true);
        } else {
            setModal(false);
        }
        const handleProfile = async () => {
            dispatch(userprofileStart());

            try {
                const response1 = await fetch(`${baseUrl}/v1/user/profile/` + userId, {
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

    const showModal = modal;

    const handleCloseModal = async () => {
        dispatch(userprofileStart());

        try {
            const response1 = await fetch("http://192.168.251.136:8000/v1/user/profilereward/" + userId, {
                method: 'PUT',
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
                console.log("bbb");
                setModal(false);
            }
        } catch (error) {
            dispatch(userprofileFailed());
        }
    }
    return (
        <View className="flex-1">
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setModalVisible(!showModal);
                }}
            >
                <View className="flex-1 bg-rnb justify-center items-center">
                    <View className="h-[20%] w-[90%]">

                        <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                            <Text className="text-blue font-bold text-[20px]">Thông báo</Text>
                            <Text className="text-black font-bold text-[16px]">Điểm thưởng đã được làm mới theo chu kỳ năm!</Text>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <View className="flex-row bg-blue rounded-md mx-24 p-2 mt-3 items-center justify-center">
                                    <Text className="text-white font-bold text-sx">OK</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
            <View className="flex-row h-32 bg-blue">
                <TouchableOpacity onPress={handleBack}>
                    <View className="my-10 ml-5">
                        <MaterialIcons name="keyboard-backspace" size={32} color="white" /></View>

                </TouchableOpacity>
            </View>
            <View className=" bg-white justify-center  rounded-xl mx-4 py-2 -mt-10 shadow-md">
                <View className="flex-row justify-center">
                    <Text className=" p-5 items-center  text-black font-bold text-[22px]">ĐIỂM THƯỞNG</Text>
                </View>
                <View className="flex-row justify-center">
                    <Text className=" text-black font-bold text-[20px]">Điểm thưởng hiện có: </Text>
                    <Text className="text-black font-bold text-[20px]">{userPro?.reward}</Text>
                    <MaterialCommunityIcons name="medal" size={24} color="rgb(8, 145, 178)" />
                </View>
            </View>
            <View className=" mx-4 my-2">
                <Text className="font-bold text-blue text-[16px] mr-4 mt-3"> * Các lưu ý về điểm thưởng:</Text>
                <Text className="font-normal text-[14px] my-1">
                    + Mỗi lần hoàn thành hiến máu sẽ được 1 điểm thưởng.
                </Text>
                <Text className="font-normal text-[14px] my-1">
                    + Điểm thưởng sẽ được làm mới theo chu kỳ 1 năm, bắt đầu mỗi chu kỳ là ngày 1/1 hàng năm.
                </Text>
                <Text className="font-normal text-[14px] my-1">
                    + Đạt được các mốc điểm cố định sẽ được phần quà tương ứng.
                </Text>
                <Text className="font-normal text-[14px] my-1">
                    + Quà tặng sẽ được tặng khi đến cơ sở hiến máu.
                </Text>
                <Text className="font-normal text-[14px] my-1">
                    + Lưu ý đây là quà tặng khi tích lũy điểm thưởng trên hệ thống nên sẽ được tách biệt
                    với các quà tặng khác khi đi hiến máu tại các cơ sở bệnh viện khác nhau,
                    người dùng tránh nhầm lẫn và chú ý để nhận đầy đủ các phần quà khi đi hiến máu.
                </Text>
            </View>
            <View className=" mx-4 my-2">
                <Text className="font-bold text-blue text-[16px] mr-4"> * Bảng quy đổi điểm thưởng:</Text>
            </View>
            <View className="p-4">
                <View className="overflow-hidden border border-gray-300 rounded-lg">
                    <View className="flex-row bg-gray-200 p-2 border-b border-gray-300">
                        <Text className="w-1/4 font-bold text-center">Mốc điểm thưởng</Text>
                        <Text className="w-3/4 font-bold text-center">Quà tặng</Text>
                    </View>
                    <View className="flex-row bg-gray-200 p-2 border-b border-gray-300">
                        <Text className="w-1/4 text-center">2
                        <MaterialCommunityIcons name="medal" size={14} color="rgb(8, 145, 178)" /></Text>
                        <Text className="w-3/4 text-center">100.000VNĐ</Text>
                    </View>
                    <View className="flex-row bg-gray-200 p-2 border-b border-gray-300">
                        <Text className="w-1/4 text-center">3
                            <MaterialCommunityIcons name="medal" size={14} color="rgb(8, 145, 178)" /></Text>
                        <Text className="w-3/4 text-center">200000VNĐ</Text>
                    </View>
                    <View className="flex-row bg-gray-200 p-2 border-b border-gray-300">
                        <Text className="w-1/4 text-center">4
                            <MaterialCommunityIcons name="medal" size={14} color="rgb(8, 145, 178)" /></Text>
                        <Text className="w-3/4 text-center">300000VNĐ</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RewardsScreen
