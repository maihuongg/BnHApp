import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TopBar from './components/Topbar';
import moment from "moment";
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
    const [min, setMin] = useState("");
    const currentDate = new Date();
    const [activeItem, setActiveItem] = useState('user');
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };

    // useEffect(() => {
    //     const minDate = new Date(eventDetail.date_start);
    //     if (currentDate < minDate) {
    //         setMin(new Date(eventDetail.date_start).toISOString().split('T')[0]);
    //     } else {
    //         setMin(new Date().toISOString().split('T')[0]);
    //     }
    //     console.log("date", min);
    // }, [currentDate, setMin]);

    const displayText = currentDate < new Date(eventDetail?.date_start) ? "Sắp diễn ra" : "Đang diễn ra";

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