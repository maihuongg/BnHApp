import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import TopBar from './components/Topbar';
const Sukien = () => {
    const [data, setData] = useState([]);
    console.log("fsfsf");
    useEffect(() => {
        const handleEvent = async () => {
            console.log("fuuuf");
            try {
                console.log("faaasf");
                const response = await fetch("http://192.168.246.136:8000/v1/user/event", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log("fdddf");
                if (response.ok) {
                    const data = await response.json();
                    console.log("data",data)
                    setData(data.allEvent);
                }
                else {
                    console.log("err");
                };
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        handleEvent();
    }, [setData]);
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
                    className="text-blue pl-1"
                    placeholder=" Nhập tên sự kiện / bệnh viện" />
                <View className="ml-auto">
                    <TouchableOpacity >
                        <MaterialIcons name="arrow-forward" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-auto bg-silver">
                <Text className="text-xl font-bold text-blue px-4 my-2">Sự kiện</Text>
                <ScrollView>
                    {data.map((result) => (
                        <View className="bg-white">
                            <TouchableOpacity className="bg-white rounded-lg px-4 mx-4 my-2 shadow-md">
                                <Image source={require('../../assets/1.png')} className="w-full h-32 rounded-md mb-2" />
                                <View className="mb-2">
                                    <Text className="text-lg font-bold" >{result.eventName}</Text>
                                    <View className="flex-row">
                                        <Text>Địa chỉ : </Text>
                                        <Text className="font-bold">{result.address}</Text>
                                    </View>
                                    <View className="flex-row">
                                        <Text>Số lượng đăng ký : {result.listusers.count}/</Text>
                                        <Text className="font-bold">{result.amount}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleToDetailEvent(result._id, result.hospital_id)}
                                        className="items-center bg-blue p-2 mx-8 my-2 rounded-md" >
                                        <View className="flex-row">
                                            <Text className="text-white font-bold">Xem chi tiết</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Sukien;