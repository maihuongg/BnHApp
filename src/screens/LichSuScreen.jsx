import { View, Text, TextInput, Button, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
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

    const [albums, setAlbums] = useState(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    async function getAlbums() {
        if (permissionResponse.status !== 'granted') {
            await requestPermission();
        }
        const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
            includeSmartAlbums: true,
        });
        setAlbums(fetchedAlbums);
    };

    const handleDownloadImage = async () => {
        try {
            if (certificateRef.current) {
                const uri = await captureRef(certificateRef.current, {
                    format: 'png',
                    quality: 1,
                });

                // Save the image to media library
                const asset = await MediaLibrary.createAssetAsync(uri);
                Alert.alert('Thông báo', 'Đã tải ảnh thành công, vui long kiểm tra lại album ảnh.');
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album === null) {
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }

                
                // Share the image
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
                                                <Text className="text-white font-bold p-3 mx-3 text-[12px]">Xem</Text>
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
                                {selectedRecord && <View><Certificate ref={certificateRef} record={selectedRecord} userPro={userPro} /></View>}

                            </View>
                            <View className="flex-row">
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