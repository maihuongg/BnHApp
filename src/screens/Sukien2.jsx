import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import TopBar from './components/Topbar';
const Sukien2 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Đếm trang
    const [hasMore, setHasMore] = useState(true); // Xác định xem còn dữ liệu để tải nữa hay không
    const [allDataLoaded, setAllDataLoaded] = useState(false); // Xác định khi tất cả dữ liệu đã được tải

    useEffect(() => {
        handleEvent(); // Khi component được tạo lần đầu, gọi handleEvent để tải dữ liệu
    }, []); 

    const handleEvent = async () => {
        try {
            setLoading(true); // Bắt đầu tải dữ liệu, đặt trạng thái loading là true
            const response = await fetch(`http://192.168.1.3:8000/v1/user/event?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const newData = await response.json();
                if (newData.allEvent.length === 0) {
                    if (page === 1) {
                        setAllDataLoaded(true); // Nếu trang hiện tại là trang đầu tiên và không có dữ liệu mới, đặt allDataLoaded là true
                    } else {
                        setHasMore(false); // Nếu trang hiện tại không phải là trang đầu tiên và không có dữ liệu mới, không còn dữ liệu để tải nữa
                    }
                } else {
                    setData(prevData => [...prevData, ...newData.allEvent]); // Kết hợp dữ liệu mới với dữ liệu đã có
                    setPage(prevPage => prevPage + 1); // Tăng số trang lên khi có dữ liệu mới
                }
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Kết thúc quá trình tải dữ liệu, đặt trạng thái loading là false
        }
    };
    
    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom && !loading && hasMore) {
            handleEvent(); // Gọi handleEvent khi cuộn đến cuối trang và còn dữ liệu để tải
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
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 6 }}>
                    {/* Phần giao diện hiển thị sự kiện */}
                    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                        {data.map((result, index) => (
                            <TouchableOpacity key={index} style={{ backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, marginHorizontal: 8, marginVertical: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 }}>
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
                            </TouchableOpacity>
                        ))}
                    {allDataLoaded && <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 10 }}>Không còn dữ liệu để tải</Text>}
                    </ScrollView>
              
                </SafeAreaView>
                
            </View>
        </SafeAreaView>
    )
}

export default Sukien2;