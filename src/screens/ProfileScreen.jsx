import { View, Text, TextInput, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from "@expo/vector-icons";

import { MaterialCommunityIcons } from '@expo/vector-icons';
const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [gender, setGender] = useState(null);
    const [selected, setSelected] = useState(null);
    const [bloodGroup, setBloodGroup] = useState(null);
    const bloodGroupData = [
        { key: 'A', value: 'A' },
        { key: 'B', value: 'B' },
        { key: 'AB', value: 'AB' },
        { key: 'O', value: 'O' },
        // Thêm các nhóm máu khác nếu cần
    ];

    const data = [
        { key: 'Nam', value: 'Nam' },
        { key: 'Nữ', value: 'Nữ' },

    ]
    return (
        <View className="flex-1">
            <View className="flex-row h-32 bg-blue">
                <TouchableOpacity>
                    <View className="my-10 ml-5">
                        <MaterialIcons name="keyboard-backspace" size={32} color="white" /></View>

                </TouchableOpacity>
            </View>
            <View className="flex-row w-32 h-32 bg-white  rounded-full mx-auto py-2 -mt-16 shadow-md">
                <Image
                    className="w-28 h-28 rounded-full mx-auto items-center justify-centerr"
                    source={require("../../assets/2.png")} ></Image>
            </View>

            <View className=" justify-center items-center mx-2 ">
                <Text className="text-black font-bold text-[22px]"> Nguyen Van A</Text>
            </View>

            <View className="bg-white mx-4 rounded-xl my-3 py-2 shadow-sm">
                <View className="flex-row mx-2 items-center">
                    <MaterialCommunityIcons name="information" size={24} color="#0891b2" />
                    <Text className="text-blue font-bold text-[20px]"> Thông tin cá nhân </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">CCCD/CMND :  </Text>
                    <Text className="text-black font-normal text-[18px] ml-auto"> 079000002024  </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">Họ tên: </Text>
                    <Text className="text-black font-normal text-[18px] ml-auto"> Nguyễn Minh Trọng  </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">Ngày sinh :  </Text>
                    <Text className="text-black font-normal text-[18px] ml-auto"> 01/01/2000 </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">Giới tính :  </Text>
                    <Text className="text-black font-normal text-[18px] ml-auto"> Nam </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">Nhóm máu </Text>
                    <Text className="text-black font-normal text-[18px] ml-auto"> B </Text>
                </View>
            </View>
            <View className="bg-white mx-4 rounded-xl my-2 py-2 shadow-sm">
                <View className="flex-row mx-2 items-center">
                    <MaterialCommunityIcons name="information" size={24} color="#0891b2" />
                    <Text className="text-blue font-bold text-[20px]"> Thông tin liên hệ </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">Số điện thoại :  </Text>
                    <Text className="text-black font-normal text-[18px] ml-auto"> 079000002024  </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">Email : </Text>
                    <Text className="text-black font-normal text-[18px] ml-auto"> examble@gmail.com </Text>
                </View>
                <View className="flex-row mx-2">
                    <Text className="text-black font-bold text-[18px]">Địa chỉ :
                        <Text className="text-black font-normal text-[18px] whitespace-pre-wrap "> Số 1, Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh </Text></Text>
                </View>

            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View className="flex-row bg-blue rounded-md mx-24 p-2 mt-3 items-center justify-center">
                    <FontAwesome5 name="edit" size={24} color="white" />
                    <Text className="text-white font-bold text-sx ml-4">Chỉnh sửa</Text>

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
                        {/* Phần nội dung của modal */}
                        <ScrollView>
                            <View className=" mx-2 bg-white p-4 rounded-md ">
                                {/* Đặt các trường để người dùng có thể chỉnh sửa thông tin */}
                                <Text className="text-xl font-bold text-blue mb-2">Chỉnh sửa thông tin cá nhân</Text>
                                <Text className="text-black text-[16px] font-bold my-2"> CCCD/CMND </Text>
                                <TextInput
                                    placeholder="Nhập số CCCD/CMND"
                                    className="border border-gray-300 rounded-md p-2" />

                                <Text className="text-black text-[16px] font-bold my-2"> Họ tên </Text>
                                <TextInput
                                    placeholder="Họ và tên"
                                    className="border border-gray-300 rounded-md p-2" />


                                <Text className="text-black text-[16px] font-bold my-2"> Ngày sinh </Text>
                                <TextInput
                                    placeholder="15/05/1999"
                                    className="border border-gray-300 rounded-md p-2" />
                                

                                <View className="flex-row">
                                    <View className="flex-col w-[45%]">
                                        <Text className="text-black text-[16px] font-bold my-2"> Giới tính </Text>
                                        <SelectList
                                            setSelected={(val) => setSelected(val)}
                                            data={data}
                                            save="value"
                                        />

                                    </View>
                                    <View className="flex-col w-[45%] ml-auto">
                                        <Text className="text-black text-[16px] font-bold my-2"> Nhóm máu </Text>
                                        <SelectList
                                            setSelected={(val) => setSelected(val)}
                                            data={bloodGroupData}
                                            save="value"
                                        />
                                    </View>
                                </View>

                                <Text className="text-black text-[16px] font-bold my-2"> Email </Text>
                                <TextInput
                                    placeholder="Email"
                                    className="border border-gray-300 rounded-md  p-2" />
                                <Text className="text-black text-[16px] font-bold my-2"> Số điện thoại </Text>
                                <TextInput
                                    placeholder="0955662301"
                                    className="border border-gray-300 rounded-md  p-2" />
                                <Text className="text-black text-[16px] font-bold my-2"> Địa chỉ </Text>
                                <TextInput
                                    placeholder="1 Võ Văn Ngân, TP.Thủ Đức, TPHCM"
                                    className="border border-gray-300 rounded-md  p-2" />


                                {/* Khi hoàn thành, bạn cần một cách nào đó để lưu thông tin đã chỉnh sửa và đóng modal */}
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <View className="justify-center bg-blue mx-auto my-4 p-3 rounded-md">

                                        <Text className="text-white font-bold text-[16px]">Lưu thay đổi</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>

                </View>

            </Modal>




            {/* <TopBar activeItem={activeItem} handleItemClick={handleItemClick} /> */}

        </View>

    );
}
export default ProfileScreen;