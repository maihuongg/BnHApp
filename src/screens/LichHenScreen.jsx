import { View, Text, TextInput, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import baseUrl from '../utils/constant';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import {
    userprofileStart,
    userprofileSuccess,
    userprofileFailed,
} from "../redux/userSlice";
const LichHenScreen = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const userPro = useSelector((state) => state.user.profile.getUser);
    const userEventFilter = userPro.history.filter(event => event.status_user === "-1");
    const [activeItem, setActiveItem] = useState('user');
    const [modalVisible, setModalVisible] = useState(false);
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleBack = () => {
        navigation.navigate('InformationScreen');
    }

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [datemin, setDatemin] = useState("");
    const [datemax, setDatemax] = useState("");
    const [eventId, setEventId] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const reloadPage = () => {
        setRefreshKey(prevKey => prevKey + 1);
      };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
    };

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
    }, [dispatch, refreshKey]);

    
    const handleShow = async (eventid) => {
        try {
            const response1 = await fetch(`${baseUrl}/v1/user/getevent/` + eventid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response1.ok) {
                console.log("fail1");
            } else {
                const data = await response1.json();
                setEventId(data._id);
                const currentDate = new Date();
                const minDate = new Date(data.date_start);
                console.log("date", new Date(data.date_start).toISOString().split('T')[0])
                if (currentDate < minDate) {
                    setDatemin(new Date(data.date_start).toISOString().split('T')[0]);
                } else {
                    setDatemin(new Date().toISOString().split('T')[0]);
                }
                console.log("date2", datemin);
                setDatemax((new Date(data.date_end)).toISOString().split('T')[0]);
                setModalVisible(true);
            }
        } catch (error) {
            console.log("fail");
        }

    } 
    const minDate = new Date(datemin); // Ngày hiện tại
    const maxDate = new Date(datemax); // 

    const handleUpdate = async () => {
        const update = {
            eventId: eventId,
            userId: userPro._id,
            date: date,
        }
        try {
            const response1 = await fetch(`${baseUrl}/v1/user/event/updateRegisterDate`, {
                method: 'PUT',
                body: JSON.stringify(update),
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response1.ok) {
                const err = await response1.json();
                Alert.alert('Thất bại', err.message);
            } else {
                const data1 = await response1.json();
                setModalVisible(false);
                // navigation.navigate('LichHen');
                Alert.alert('Thành công', 'Cập nhật lịch hẹn thành công.');
                reloadPage();
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi không mong muốn.');
        }
    }

    const handleDelete = async (id) => {
        const deleteRegister = {
            eventId: id,
            userId: userPro._id,
        }
        try {
            const response1 = await fetch(`${baseUrl}/v1/user/event/deleteRegister`, {
                method: 'DELETE',
                body: JSON.stringify(deleteRegister),
                headers: {
                    'Content-Type': 'application/json',
                    token: `Bearer ${accessToken}`
                }
            });
            if (!response1.ok) {
                const err = await response1.json();
                Alert.alert('Thất bại', err.message);
            } else {
                const data1 = await response1.json();
                Alert.alert('Thành công', data1.message);
                reloadPage();
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi không mong muốn.');
        }
    }

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

                    {userEventFilter.map((donation, index) => (
                        <View key={index} className={`flex-row p-2 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                            <Text className="w-1/4 text-center">{donation.eventName}</Text>
                            <Text className="w-1/4 text-center">{donation.address_event}</Text>
                            <Text className="w-1/4 text-center">{moment(donation.date).format('DD-MM-YYYY')}</Text>
                            <View className="w-1/4 text-center">
                                <View className="flex-row justify-center">
                                    <TouchableOpacity className="mr-2" onPress={() => handleShow(donation.id_event)}>
                                        <FontAwesome name="edit" size={24} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity className="mr-2" onPress={() => handleDelete(donation.id_event)}>
                                        <MaterialIcons name="clear" size={24} color="black" />
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

                                                    <TouchableOpacity onPress={handleUpdate}>
                                                        <View className="justify-center bg-blue mx-auto my-4 p-3 rounded-md">

                                                            <Text className="text-white font-bold text-[16px]">Cập nhật</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
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