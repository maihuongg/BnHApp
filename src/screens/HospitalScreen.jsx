import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity, SafeAreaView, Modal, DrawerLayoutAndroid } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
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
    //Drawer xử lý

    const [modalVisible, setModalVisible] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        console.log("Opening modal...");
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        console.log("Opening modal...");
        setModalVisible(false);
    };
    const [msgErr, setMsgErr] = useState(null);
    const [msgSucess, setMsgSucess] = useState(null);
    const [leaderName, setLeaderName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cccd, setCccd] = useState("");
    const [address, setAddress] = useState("");
    const [hospitalName, setHospitalName] = useState("")


    // Double-check if modalVisible is being set to true in handleOpenModal
    console.log("Before opening modal, modalVisible:", modalVisible);
    console.log("After opening modal, modalVisible:", modalVisible);
    const handleGuiHopTac = async () => {
        const tobeHospital = {
            sdd: cccd,
            leaderName: leaderName,
            hospitalName: hospitalName,
            phone: phone,
            address: address,
            email: email,
        };
        console.log(tobeHospital)
        console.log('Request Payload:', JSON.stringify(tobeHospital));

        try {
            const response = await fetch(`${baseUrl}/v1/hospital/be-hospital/`, {
                method: 'POST',
                body: JSON.stringify(tobeHospital),
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            console.log('Response Status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Thất bại', errorData.message);
            } else {
                const data = await response.json();
                console.log(data);
                setModalVisible(false);
                Alert.alert('Thành công', 'Bạn đã gửi yêu cầu thành công. Chúng tôi sẽ sớm liên lạc với bạn trong vòng 2-3 ngày làm việc!');
                // setMsgSucess(
                //     'Bạn đã gửi yêu cầu thành công. Chúng tôi sẽ sớm liên lạc với bạn trong vòng 2-3 ngày làm việc!'
                // );
            }
        } catch (error) {
            // setMsgErr('Đã xảy ra lỗi. Vui lòng thử lại sau!');
            Alert.alert('Thất bại', 'Đã xảy ra lỗi. Vui lòng thử lại sau!');
            console.log('error: ', error);
        }
    }
    // Ensure the visible prop of Modal is correctly bound
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
                <View className="h-96 w-full relative mt-2">
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80'
                        }}
                        style={{ height: '100%', width: '100%', borderRadius: 10 }}
                    />
                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.75)', width: '100%', padding: 5 }}>
                        <View>
                            <Text className="font-bold text-black text-[18px] mx-2">Trở thành bệnh viện hợp tác ?</Text>
                            <Text className="font-semibold text-black text-[16px] text-justify mx-2">Chúng tôi tin rằng, với sự hợp tác của Quý Bệnh Viện, chúng ta có thể mang lại những giải pháp hiệu quả và cải thiện đáng kể quy trình đăng ký hiến máu, từ việc tuyên truyền đến việc thực hiện, qua đó giúp cộng đồng nhận thức và tham gia tích cực hơn vào hoạt động quan trọng này.</Text>
                        </View>

                    </View>
                </View>
                <View className="flex-auto">
                    <TouchableOpacity
                        onPress={handleOpenModal}
                        className="bg-blue p-2 mt-2 justify-center items-center rounded-md">
                        <Text className="text-[16px] font-bold text-white">Đăng ký ngay !</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-auto bg-silver">
                    <Text className="text-xl font-bold text-blue px-4 my-2">Các bệnh viện đã hợp tác</Text>
                    {/* BV HỢP TÁC */}
                    {dataAllHospital.map((hospital) => (
                        <View key={hospital.id} className="bg-white">
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
                        {/* Phần nội dung của modal */}
                        <ScrollView>
                            <View className=" mx-2 bg-white p-2 rounded-md ">
                                {/* Đặt các trường để người dùng có thể chỉnh sửa thông tin */}
                                <View className="bg-blue justify-center items-center">
                                    <Text className="text-xl font-bold text-white mb-2"> Thông tin đăng ký hợp tác</Text>
                                </View>
                                <Text className="text-black text-[16px] font-bold my-2"> Tên người đứng đầu </Text>
                                <TextInput
                                    onChangeText={(text) => setLeaderName(text)}

                                    placeholder="Nhập tên người đứng đầu"
                                    className="border border-gray-300 rounded-md p-2"
                                />
                                <Text className="text-black text-[16px] font-bold my-2"> Email liên hệ </Text>
                                <TextInput
                                    onChangeText={(text) => setEmail(text)}

                                    placeholder="Email"
                                    className="border border-gray-300 rounded-md  p-2" />

                                <Text className="text-black text-[16px] font-bold my-2"> Số điện thoại </Text>
                                <TextInput
                                    onChangeText={(text) => setPhone(text)}

                                    placeholder="Nhập số điện thoại"
                                    className="border border-gray-300 rounded-md  p-2" />
                                <Text className="text-black text-[16px] font-bold my-2"> Tên bệnh viện/cơ sở </Text>
                                <TextInput
                                    onChangeText={(text) => setHospitalName(text)}

                                    placeholder="Nhập tên bệnh viện/cơ sở"
                                    className="border border-gray-300 rounded-md  p-2" />
                                <Text className="text-black text-[16px] font-bold my-2"> Mã bệnh viện/cơ sở </Text>
                                <TextInput
                                    onChangeText={(text) => setCccd(text)}

                                    placeholder="Nhập Mã bệnh viện/cơ sở"
                                    className="border border-gray-300 rounded-md  p-2" />
                                <Text className="text-black text-[16px] font-bold my-2"> Địa chỉ </Text>
                                <TextInput
                                    onChangeText={(text) => setAddress(text)}

                                    placeholder="Địa chỉ"
                                    className="border border-gray-300 rounded-md  p-2" />
                                {/* Khi hoàn thành, bạn cần một cách nào đó để lưu thông tin đã chỉnh sửa và đóng modal */}
                                <View className="flex-row mx-8 justify-center items-center">
                                    <TouchableOpacity onPress={handleCloseModal}>
                                        <View className="justify-center bg-red mt-2 px-6 py-2 rounded-md ">
                                            <Text className="text-white font-bold text-[16px]">Hủy</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleGuiHopTac}>
                                        <View className="justify-center bg-blue ml-12 mt-2 px-6 py-2 rounded-md">
                                            <Text className="text-white font-bold text-[16px]">Gửi</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </ScrollView>
                    </View>

                </View>

            </Modal>
        </SafeAreaView>

    );
}
export default HospitalScreen;