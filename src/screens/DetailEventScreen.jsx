import { View, Text, TextInput, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TopBar from './components/Topbar';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import {
    eventProfileStart,
    eventProfileSuccess,
    eventProfileFailed,
} from "../redux/eventSlice";
const DetailEventScreen = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken
    const eventDetail = useSelector((state) => state.event.eventProfile.getEvent);
    const hospitalDetail = useSelector((state) => state.event.hospital.getHospital);
    const userProfile = useSelector((state) => state.user.profile.getUser);
    const [dateRegister, setDateRegister] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const [datemin, setDatemin] = useState("");
    const [datemax, setDatemax] = useState("");
    const currentDate = new Date();
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [reconfirmModal, setReconfirmModal] = useState(false);
    const [activeItem, setActiveItem] = useState('user');
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
    };



    useEffect(() => {

        const handleDetailEvent = async () => {
            dispatch(eventProfileStart());
            try {
                const response1 = await fetch("http://192.168.251.136:8000/v1/user/getevent/" + eventDetail._id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response1.ok) {
                    dispatch(eventProfileFailed());
                } else {
                    const data1 = await response1.json();
                    dispatch(eventProfileSuccess(data1));
                }
            } catch (error) {
                dispatch(eventProfileFailed());
            }

        }
        handleDetailEvent();
    }, [dispatch ]);

  
    

    const displayText = currentDate < new Date(eventDetail?.date_start) ? "Sắp diễn ra" : "Đang diễn ra";

    const handleRegisterEvent = async (e) => {
        e.preventDefault();
        const register = {
            eventId: eventDetail._id,
            userId: userProfile._id,
            bloodGroup: userProfile.bloodgroup,
            dateRegister: date,
        };
        if (userProfile.fullName === null
            || userProfile.gender === null
            || userProfile.birthDay === null
            || userProfile.phone === null
            || userProfile.address === null
            || userProfile.bloodgroup === null) {
            showNotificationErr("Cần cập nhập hồ sơ đầy đủ!");
        } else {
            try {
                const response = await fetch("http://192.168.251.136:8000/v1/user/event/register", {
                    method: 'POST',
                    body: JSON.stringify(register),
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    const err = await response.json();
                    setConfirmModal(false);
                    setReconfirmModal(false);
                    Alert.alert('Thất bại', err.message);

                } else {
                    setConfirmModal(false);
                    setReconfirmModal(false);
                    Alert.alert('Thành công', 'Đăng ký sự kiện thành công.');
                    navigation.navigate('DetailScreen');
                }
            } catch (error) {
                Alert.alert('Lỗi', 'Đã xảy ra lỗi không mong muốn.');
            }
        }

    }

    const handleShow = () => {
        const currentDate = new Date();
        const minDate = new Date(eventDetail.date_start);
        console.log("date", new Date(eventDetail.date_start).toISOString().split('T')[0])
        if (currentDate < minDate) {
            setDatemin(new Date(eventDetail.date_start).toISOString().split('T')[0]);
        } else {
            setDatemin(new Date().toISOString().split('T')[0]);
        }
        console.log("date2", datemin);
        setDatemax((new Date(eventDetail.date_end)).toISOString().split('T')[0]);
        setModalVisible(true);
    }

    const minDate = new Date(datemin); // Ngày hiện tại
    const maxDate = new Date(datemax); // 

    const handleContinute = () => {
        setModalVisible(false);
        setConfirmModal(true);
    }

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
                <Text className="text-green font-bold m-2 mx-4">{displayText}</Text>
                {/* <Text className="text-yellow font-bold m-2 mx-4">Sắp diễn ra</Text>
                <Text className="text-red font-bold m-2 mx-4">Đã kết thúc</Text> */}
                <Text className="text-black font-bold text-[18px] mx-4">{eventDetail?.eventName}</Text>
                <View className="flex-row border-t-[1px] border-semigray-10 mt-2">
                    <Text className="text-black font-bold text-[16px] my-2 mx-4">Địa chỉ:
                        <Text className="text-black font-normal text-[16px] my-2 leading-6">{eventDetail?.address}</Text></Text>

                </View>
                <View >
                    <Text className="text-black font-bold text-[16px] my-2 mx-4">Đơn vị thực hiện:
                        <Text className="text-black font-normal text-[16px] my-2 leading-6">{hospitalDetail.hospitalName}</Text></Text>
                </View>

                <View className="flex-row  bg-[#d7faf5] mx-4 my-2 justify-center ">
                    <Text className="text-black font-bold text-[16px] my-4 mx-2">Ngày bắt đầu: </Text>
                    <Text className="text-black font-normal text-[16px] my-4">{moment(eventDetail?.date_start).format('DD/MM/YYYY')}</Text>
                </View>
                <View className="flex-row  bg-[#f7e1d7] mx-4 my-2 justify-center">
                    <Text className="text-black font-bold text-[16px] my-4 mx-2">Ngày kết thúc: </Text>
                    <Text className="text-black font-normal text-[16px] my-4">{moment(eventDetail?.date_end).format('DD/MM/YYYY')}</Text>
                </View>
                <View className="flex-row  bg-[#e7eaed] mx-4 my-2 justify-center">
                    <Text className="text-black font-bold text-[16px] my-4 mx-2">Số lượng đã đăng ký: </Text>
                    <Text className="text-black font-normal text-[16px] my-4">{eventDetail?.listusers.count}/<Text className="text-black font-bold text-[16px]">{eventDetail?.amount}</Text></Text>
                </View>
                <TouchableOpacity onPress={handleShow}>
                    <View className="bg-blue mx-auto items-center justify-center rounded-md my-2">
                        <Text className="text-white font-bold p-3 mx-3 text-[16px]">ĐĂNG KÝ</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className="flex-1 bg-rnb justify-center items-center">
                        <View className="h-[85%] w-[95%]">
                            <View className=" mx-2 bg-white p-4 rounded-md ">
                                <Text className="text-xl font-bold text-blue mb-2">Chọn ngày hiến máu</Text>
                                <View className="flex-row  bg-[#d7faf5] mx-4 my-2">
                                    <Text className="text-black font-bold text-[16px] my-4 mx-2">Ngày hiến máu: </Text>
                                    <Text className="text-black font-normal text-[16px] my-4">{moment(date).format('DD/MM/YYYY')}</Text>
                                    <View className="ml-auto">
                                        <TouchableOpacity className="my-2" onPress={() => setShowPicker(true)} >
                                            <MaterialIcons name="today" size={32} color="red" />
                                        </TouchableOpacity>
                                        {showPicker && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode="date"
                                                display="default"
                                                minimumDate={minDate}
                                                maximumDate={maxDate}
                                                onChange={onChange}
                                            />
                                        )}
                                    </View>
                                </View>

                                <TouchableOpacity onPress={handleContinute}>
                                    <View className="justify-center bg-blue mx-auto my-4 p-3 rounded-md">

                                        <Text className="text-white font-bold text-[16px]">Tiếp tục</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={confirmModal}
                    onRequestClose={() => {
                        setConfirmModal(!confirmModal);
                    }}
                >
                    <View className="flex-1 bg-rnb justify-center items-center">
                        <View className="h-[85%] w-[95%]">
                            <ScrollView>
                                <View className=" mx-2 bg-white p-4 rounded-md ">
                                    <Text className="text-xl font-bold text-blue mb-2">Xác nhận thông tin đăng ký</Text>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">CCCD/CMND: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{userProfile?.cccd}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Họ và tên: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{userProfile?.fullName}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Giới tính: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{userProfile?.gender}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Ngày sinh: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{moment(userProfile?.birthDay).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Nhóm máu: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{userProfile?.bloodgroup}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Địa chỉ liên lạc: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{userProfile?.address}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Email: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{userProfile?.email}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Số điện thoại: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{userProfile?.phone}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Sự kiện đăng ký: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{eventDetail?.eventName}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-black font-bold text-[16px] my-4 mx-2">Ngày đăng ký hiến máu: </Text>
                                        <Text className="text-black font-normal text-[16px] my-4">{moment(date).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <View className="flex-row mx-2">
                                        <Text className="text-red font-normal italic text-[15px] my-4 mx-2">Lưu ý: Thông tin cá nhân và liên lạc được lấy từ hồ sơ, nên kiểm tra kỹ và cập nhật tại hồ sơ trước khi đăng ký. </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setReconfirmModal(true)}>
                                        <View className="justify-center bg-blue mx-auto my-4 p-3 rounded-md">

                                            <Text className="text-white font-bold text-[16px]">Xác nhận</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={reconfirmModal}
                                        onRequestClose={() => {
                                            setReconfirmModal(!reconfirmModal);
                                        }}
                                    >
                                        <View className="flex-1 bg-rnb justify-center items-center">
                                            <View className="h-[85%] w-[95%]">
                                                <View className="mx-2 bg-white p-4 rounded-md flex flex-col items-center">
                                                    <Text className="text-xl font-bold text-blue mb-2 text-center">Bạn có muốn xác nhận hoàn tất đăng ký?</Text>
                                                    <TouchableOpacity onPress={handleRegisterEvent}>
                                                        <View className="bg-blue my-2 p-3 rounded-md w-32 justify-center items-center">
                                                            <Text className="text-white font-bold text-[16px]">Có</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => setReconfirmModal(false)}>
                                                        <View className="bg-blue my-2 p-3 rounded-md w-32 justify-center items-center">
                                                            <Text className="text-white font-bold text-[16px]">Không</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>


    );
}
export default DetailEventScreen;