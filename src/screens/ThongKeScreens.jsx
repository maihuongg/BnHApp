import { View, Text, TextInput, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import moment from 'moment';


import { LineChart } from 'react-native-chart-kit';
const ThongKeScreen = () => {

    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('InformationScreen');
    }
    const [userTotal, setUserTotal] = useState(null);

    useEffect(() => {

        const fetchTotalUser = async () => {
            try {
                const userTotal = await totalUser();
                // console.log("totalUser:", userTotal);
                setUserTotal(userTotal);
            } catch (error) {
                console.error("Error fetching totalUser:", error);
            }
        };

        fetchTotalUser();
    }, []);

    const [accountbyDate, setAccountbyDate] = useState(null);

    useEffect(() => {
        // Fetch data from your API endpoint
        const fetchAccountbyDate = async () => {
            try {
                const response = await fetch('http://192.168.251.136:8000/v1/admin/statistic/account-register');

                if (!response.ok) {
                    throw new Error('Failed to fetch account statistics by date');
                }

                const data = await response.json();
                setAccountbyDate(data);
            } catch (error) {
                console.error('Error fetching account statistics by date:', error);
            }
        };

        fetchAccountbyDate();
    }, []);

    return (
        <View className="flex-1">
            <View className="flex-row h-32 bg-bubble-gum">
                <Text>

                </Text>
            </View>

            <View className="flex-row bg-white items-center rounded-xl mx-4 py-2 -mt-10 shadow-md justify-center">
                <Ionicons name="analytics" size={108} color="black" />
                <View className="flex-column justify-center items-center mx-2 ">
                    <Text className="text-black font-bold text-[18px]"> DASHBOARD</Text>
                    <Text className="text-black text-[16px]"> Analytics</Text>
                </View>
            </View>
            <ScrollView>
                {/* Analytics data */}
                <View className="flex-row">
                    <View className="w-[47%] bg-white items-center rounded-xl mx-2 mt-4 p-3 shadow-md">
                        <AntDesign name="profile" size={24} color="black" />
                        <View className="flex-column justify-center items-center mx-2 ">
                            <Text className="text-black font-bold text-[18px]"> Số tài khoản</Text>
                            <Text className="text-black text-[16px]">{userTotal}</Text>
                        </View>
                    </View>
                    <View className="w-[47%] bg-white items-center rounded-xl ml-auto mr-2 mt-4 p-3 shadow-md">
                        <Feather name="user" size={24} color="black" />
                        <View className="flex-column justify-center items-center mx-2 ">
                            <Text className="text-black font-bold text-[18px]"> Người dùng</Text>
                            <Text className="text-black text-[16px]">14</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-row">
                    <View className="w-[47%] bg-white items-center rounded-xl mx-2 mt-4 p-3 shadow-md">
                        <SimpleLineIcons name="event" size={24} color="black" />
                        <View className="flex-column justify-center items-center mx-2 ">
                            <Text className="text-black font-bold text-[18px]"> Sự kiện</Text>
                            <Text className="text-black text-[16px]">11 </Text>
                        </View>
                    </View>
                    <View className="w-[47%] bg-white items-center rounded-xl ml-auto mr-2 mt-4 p-3 shadow-md">
                        <FontAwesome6 name="hospital" size={24} color="black" />
                        <View className="flex-column justify-center items-center mx-2 ">
                            <Text className="text-black font-bold text-[18px]">Bệnh viện</Text>
                            <Text className="text-black text-[16px]">6</Text>
                        </View>
                    </View>
                </View>
                {/* bieu do */}
                <View className="m-2 flex-col justify-center items-center">
                    <Text className="font-bold text-blue text-[15px]">Thống kê số lượng đăng ký tài khoản mới</Text>
                    {accountbyDate && (
                        <LineChart
                            data={{
                                labels: [
                                    moment().subtract(4, 'days').format('DD-MM'),
                                    moment().subtract(3, 'days').format('DD-MM'),
                                    moment().subtract(2, 'days').format('DD-MM'),
                                    moment().subtract(1, 'days').format('DD-MM'),
                                    moment().format('DD-MM'),
                                ],
                                datasets: [
                                    {
                                        data: [
                                            accountbyDate.fourDaysAgo.user,
                                            accountbyDate.threeDaysAgo.user,
                                            accountbyDate.dayBeforeYesterday.user,
                                            accountbyDate.yesterday.user,
                                            accountbyDate.today.user,
                                        ],
                                        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                    },
                                ],
                            }}
                            width={330}
                            height={300}
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor: '#ffffff',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#ffffff',
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: '#ffa726',
                                },
                                withVerticalLabels: true,
                                withHorizontalLabels: true,
                                legend: {
                                    enabled: true, // Tắt chú thích
                                },
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    )}
                </View>
            </ScrollView>
        </View>

    );
}
async function totalUser() {
    try {
        const response = await fetch("http://192.168.251.136:8000/v1/admin/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.count;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching totalUser:", error);
        return 0;
    }
}

export default ThongKeScreen;