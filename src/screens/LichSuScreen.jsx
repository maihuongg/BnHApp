import { View, Text, TextInput, Button, ScrollView, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
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
import Certificate from './Certificate';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const certificateRef = useRef(null);

    const handleViewCertificate = (record) => {
        setSelectedRecord(record);
        console.log('selectedRecord', record);
        setIsModalVisible(true);
        //setTimeout(() => drawCertificate(record), 100);  // Ensure canvas is rendered before drawing
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };

    // const drawCertificate = async (canvas) => {
    //     if (canvas) {
    //         const ctx = canvas.getContext('2d');
    //         const img = new CanvasImage(canvas);
    //         img.src = require('../../assets/certificate.png'); // Corrected path to the image file

    //         img.addEventListener('load', () => {
    //             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    //             ctx.font = 'bold 24px Arial';
    //             ctx.fillStyle = 'black';
    //             ctx.fillText(`${userPro.fullName}`, 350, 250);

    //             // Draw other text lines from record
    //             ctx.font = '20px Arial';
    //             ctx.fillStyle = 'black';
    //             ctx.fillText(`Ông/bà: `, 250, 250);
    //             ctx.fillText(`Đã tham gia "${selectedRecord.eventName}"`, 180, 300);
    //             ctx.fillText(`Ngày hiến máu: ${moment(selectedRecord.date).format('DD-MM-YYYY')} `, 180, 350);
    //             ctx.fillText(`Lượng máu đã hiến: ${selectedRecord.amount_blood} ml.`, 500, 350);
    //         });
    //     }
    // };


    // const handleDownloadImage = async () => {
    //     const canvas = certificateRef.current;
    //     if (canvas) {
    //         const dataUrl = await canvas.toDataURL();
    //         const link = document.createElement('a');
    //         link.download = 'e-certificate.png';
    //         link.href = dataUrl;
    //         link.click();
    //     }
    // };

    const requestMediaLibraryPermission = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access media library denied');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error requesting media library permission:', error);
            return false;
        }
    };

    const handleDownloadImage = async () => {
        try {
            // Request permission to access media library
            const permissionGranted = await requestMediaLibraryPermission();
            if (!permissionGranted) return;

            if (certificateRef.current) {
                const uri = await captureRef(certificateRef, {
                    format: 'png',
                    quality: 1,
                });

                await Sharing.shareAsync(uri);
            } else {
                console.warn('certificateRef is null or undefined');
            }
        } catch (error) {
            console.error('Failed to capture view snapshot:', error);
        }
    };
    

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
                        <Text className="w-1/4 font-bold text-center">Xem e-Certificate</Text>
                    </View>

                    {userEventFilter.length > 0 ? (
                        userEventFilter.map((donation, index) => (
                            <View key={index} className={`flex-row p-2 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                <Text className="w-1/4 text-center">{donation.eventName}</Text>
                                <Text className="w-1/4 text-center">{donation.address_event}</Text>
                                <Text className="w-1/4 text-center">{moment(donation.date).format('DD-MM-YYYY')}</Text>
                                <View className="w-1/4 text-center">
                                    <View className="flex-row justify-center">
                                        <TouchableOpacity className="mr-2" onPress={() => handleViewCertificate(donation)}>
                                            <View className="bg-blue mx-auto items-center justify-center rounded-md my-2">
                                                <Text className="text-white font-bold p-3 mx-3 text-[16px]">Xem</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View className="flex items-center justify-center">
                            <Text className="text-center">Bạn không có lịch sử hiến máu.</Text>
                        </View>
                    )}

                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={handleCancel}
                    >
                        <View className="flex-1 bg-rnb justify-center items-center">
                            <View className="h-[50%] w-[95%]">
                                {selectedRecord && <View ref={certificateRef}><Certificate record={selectedRecord} userPro={userPro} /></View>}
                                <Button title="Download" onPress={handleDownloadImage} />
                                <Button title="Cancel" onPress={handleCancel} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>

    );
}
export default LichSuScreen;