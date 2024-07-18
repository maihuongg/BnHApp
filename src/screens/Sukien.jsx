import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import TopBar from './components/Topbar';
import baseUrl from '../utils/constant';
import {
    eventProfileStart,
    eventProfileSuccess,
    eventProfileFailed,
    hospitalStart,
    hospitalSuccess,
    hospitalFailed
} from "../redux/eventSlice";
const Sukien = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const userId = user?._id;
    const accessToken = user?.accessToken;
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Đếm trang
    const [hasMore, setHasMore] = useState(true); // Xác định xem còn dữ liệu để tải nữa hay không
    const [allDataLoaded, setAllDataLoaded] = useState(false); // Xác định khi tất cả dữ liệu đã được tải
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [visible, setVisible] = useState("Tất cả");
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    console.log("fsfsf");
    useEffect(() => {
        const handleEvent = async () => {
            console.log("fuuuf");
            try {
                console.log("faaasf");
                const response = await fetch(`${baseUrl}/v1/user/event`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log("fdddf");
                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data)
                    setData(data.allEvent);
                    setData1(data.allEvent);
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

    const fetchDataSearcg = async (keyword) => {
        try {
            const response2 = await fetch(`${baseUrl}/v1/user/search/event?keyword=${keyword}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response2.ok) {
                const data2 = await response2.json();
                setData(data2);
            }
            else return 0;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFilterEventFuture = () => {
        // Lọc các sự kiện có date_start lớn hơn ngày hiện tại
        const filteredData = data1.filter(event => new Date(event.date_start) > new Date());
        setData(filteredData);
        setVisible("Sắp diễn ra");
        setShowDropdown(false);
    };

    const handleFilterEventCurrent = () => {
        // Lọc các sự kiện có date_start bé hơn hoặc bằng ngày hiện tại
        const filteredData = data1.filter(event => new Date(event.date_start) <= new Date());
        setData(filteredData);
        setVisible("Đang diễn ra");
        setShowDropdown(false);
    };
    const handleFilterAllEvent = () => {
        setData(data1);
        setVisible("Tất cả");
        setShowDropdown(false);
    };

    const handleToDetailEvent = async (eventId, hospitalId) => {
        if (user) {
            console.log("fffff");
            dispatch(eventProfileStart());
            try {
                const response1 = await fetch(`${baseUrl}/v1/user/getevent/` + eventId, {
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

            dispatch(hospitalStart());
            try {
                const response2 = await fetch(`${baseUrl}/v1/user/gethospital/` + hospitalId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: `Bearer ${accessToken}`
                    }
                });
                if (!response2.ok) {
                    dispatch(hospitalFailed());
                } else {
                    const data2 = await response2.json();
                    dispatch(hospitalSuccess(data2));
                }
            } catch (error) {
                dispatch(hospitalFailed());
            }

            navigation.navigate('DetailScreen');
        } else {
            Alert.alert('Thông báo', 'Cần đăng nhập để xem chi tiết.');
            navigation.navigate('LoginScreen');
        }
    };
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
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    className="text-blue pl-1"
                    placeholder=" Nhập tên sự kiện / bệnh viện" />
                <View className="ml-auto">
                    <TouchableOpacity onPress={() => fetchDataSearcg(searchQuery)}>
                        <MaterialIcons name="arrow-forward" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-auto bg-silver">
                <View className="flex-row">
                    <Text className="text-xl font-bold text-blue px-4 my-2">Sự kiện</Text>
                    <TouchableOpacity className="flex-row ml-auto " onPress={handleToggleDropdown}>
                        <Text className="text-xl font-bold text-blue px-4 my-2">{visible}</Text>
                        <MaterialIcons name="filter-list" size={24} color="black" />
                    </TouchableOpacity>
                    {showDropdown && (
                        <View style={{ position: 'absolute', top: 40, right: 0, backgroundColor: 'white', zIndex: 999, elevation: 10 }}>
                            <TouchableOpacity onPress={handleFilterEventFuture}>
                                <Text className="text-xl font-bold text-blue px-4 my-2">Sắp diễn ra</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleFilterEventCurrent}>
                                <Text className="text-xl font-bold text-blue px-4 my-2">Đang diễn ra</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleFilterAllEvent}>
                                <Text className="text-xl font-bold text-blue px-4 my-2">Tất cả</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <ScrollView>
                    {data.map((result) => (
                        <View className="bg-[#F2F2F2]">
                            <TouchableOpacity className="bg-white rounded-lg px-4 mx-4 my-2 shadow-md">
                                <Image source={{ uri: result.images }} className="w-full h-32 mt-4 rounded-md mb-2" />
                                <View className="mb-2">
                                    <Text className="text-lg font-bold" >{result.eventName}</Text>
                                    <View className="flex-row">
                                        <Text>Địa chỉ : </Text>
                                        <Text className="font-bold w-[85%] justify-center">{result.address}</Text>
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