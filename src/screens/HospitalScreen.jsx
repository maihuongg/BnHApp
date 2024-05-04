import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import TopBar from './components/Topbar';
import baseUrl from '../utils/constant';
const HospitalScreen = () => {
    // const user = useSelector((state) => state.auth.login.currentUser);
    // const userId = user?._id;
    // const accessToken = user?.accessToken;
    const userPro = useSelector((state) => state.user.profile.getUser);
    const [activeItem, setActiveItem] = useState('user');
    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log('bạn đã nhấn:', item);
    };
    const [dataAllHospital, setDataAllHospital] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const handleAllHospital = async () => {
            try {
                const response2 = await fetch(`${baseUrl}/v1/user/allhospital`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response2.ok) {
                    console.log("Get Two Hospital Fail.")
                }
                else {
                    const allHospital = await response2.json();
                    setDataAllHospital(allHospital);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        handleAllHospital();
    }, [setDataAllHospital]);

    return (
        <SafeAreaView className=" flex-1 bg-white pt-6">
            <View className="bg-white flex-row p-1 items-center ml-4">
                <Image
                    source={require('../../assets/logo1.png')}
                    className="h-12 w-12 items-center"
                />
                <Text className="text-blue font-bold text-xl pl-2">BloodnHeart</Text>
                <View className="ml-auto">
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>


            <View className="flex-row p-2 mx-4 mt-2 border-2 border-blue rounded-lg bg-gray">
                <FontAwesome name="search" size={24} color='#0891b2' />
                <TextInput
                    className="text-white pl-1"
                    placeholder=" Nhập tên sự kiện / bệnh viện" />
            </View>
            <ScrollView>
                <View className="flex-auto relative m-2">
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80'
                        }}
                        style={{ height: '130%', width: '100%', borderRadius: 10 }}
                    />
                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.75)', width: '100%', padding: 10 }}>
                        <View>
                            <Text className="font-bold text-black text-[18px]">Trở thành bệnh viện hợp tác ?</Text>
                            <Text className="font-semibold text-black text-[16px] text-justify">Chúng tôi tin rằng, với sự hợp tác của Quý Bệnh Viện, chúng ta có thể mang lại những giải pháp hiệu quả và cải thiện đáng kể quy trình đăng ký hiến máu, từ việc tuyên truyền đến việc thực hiện, qua đó giúp cộng đồng nhận thức và tham gia tích cực hơn vào hoạt động quan trọng này.</Text>
                        </View>
                        <TouchableOpacity className="bg-blue p-2 mt-2 justify-center items-center rounded-md">
                            <Text className="text-[16px] font-bold text-white">Đăng ký ngay !.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-auto bg-silver">
                    <Text className="text-xl font-bold text-blue px-4 my-2">Các bệnh viện đã hợp tác</Text>
                    {/* BV HỢP TÁC */}
                    {dataAllHospital.map((hospital) => (
                        <View className="bg-white">
                            <View className="bg-white mx-4 rounded-lg shadow-md my-3">
                                <TouchableOpacity className="bg-gray mx-auto rounded-full w-52 h-52 mt-2 justify-center items-center ">
                                    <Image
                                        source={require('../../assets/2.png')}
                                        className="rounded-full w-48 h-48">
                                    </Image>
                                </TouchableOpacity>
                                <View className="bg-gray justify-center mx-4 items-center -mt-10 -z-10 rounded-lg mb-3">
                                    <Text className="mt-8 py-1 text-black font-bold text-lg">{hospital.hospitalName}</Text>
                                    <View className="flex-row mx-4">
                                        <Text className="font-bold">Địa chỉ :
                                            <Text className="text-black font-normal">{hospital.address}</Text> </Text>
                                    </View>
                                    <View className="flex-row mx-auto mb-2 ">
                                        <Text className="font-bold">Hotline:</Text>
                                        <Text className="text-black font-normal">{hospital.phone}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}
export default HospitalScreen;