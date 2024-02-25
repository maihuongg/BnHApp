import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from '@material-tailwind/react';

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (item) => {
    setActiveItem(item);
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

      <View className="flex-row p-2 mx-4 mt-2 border-2 border-blue rounded-lg">
        <FontAwesome name="search" size={24} color='#0891b2' />
        <TextInput
          className="text-black pl-1"
          placeholder=" Nhập tên sự kiện / bệnh viện" />
      </View>

      {/* slider */}
      {/* <View className="flex-row "> */}
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row m-2 shadow-sm">
            <View className="w-80 h-32 mx-2">
              <Image
                source={require('../../assets/1.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View>
            <View className="w-80 h-32 mx-2">
              <Image
                source={require('../../assets/2.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View>
            <View className="w-80 h-32 mx-2">
              <Image
                source={require('../../assets/3.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View></View>

        </ScrollView>
        {/* </View> */}
        {/* info */}
        <View className="flex-auto">
          <Text className="text-xl font-bold text-blue px-4 my-2">Sự kiện nổi bật</Text>

          <View className="bg-white">
            <TouchableOpacity className="bg-white rounded-lg px-4 mx-4 my-2 shadow-md">
              <Image source={require('../../assets/1.png')} className="w-full h-32 rounded-md mb-2" />
              <View className="mb-2">
                <Text className="text-lg font-bold" >Sự kiện A </Text>
                <View className="flex-row">
                  <Text>Bệnh viện phụ trách : </Text>
                  <Text className="font-bold">Bệnh viện Thủ Đức</Text>
                </View>
                <View className="flex-row">
                  <Text>Số lượng đăng ký : 37/</Text>
                  <Text className="font-bold">50</Text>
                </View>
                <TouchableOpacity
                  className="items-center bg-blue p-2 mx-8 my-2 rounded-md" >
                  <View className="flex-row">
                    <Text className="text-white font-bold">Xem chi tiết</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          </View>
<View className="bg-white">
            <TouchableOpacity className="bg-white rounded-lg px-4 mx-4 my-2 shadow-md">
              <Image source={require('../../assets/1.png')} className="w-full h-32 rounded-md mb-2" />
              <View className="mb-2">
                <Text className="text-lg font-bold" >Sự kiện A </Text>
                <View className="flex-row">
                  <Text>Bệnh viện phụ trách : </Text>
                  <Text className="font-bold">Bệnh viện Thủ Đức</Text>
                </View>
                <View className="flex-row">
                  <Text>Số lượng đăng ký : 37/</Text>
                  <Text className="font-bold">50</Text>
                </View>
                <TouchableOpacity
                  className="items-center bg-blue p-2 mx-8 my-2 rounded-md" >
                  <View className="flex-row">
                    <Text className="text-white font-bold">Xem chi tiết</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* BOTTOM BAR */}
      <View className=" sticky inset-x-0 w-full bg-white shadow-md flex justify-around items-center p-4 flex-row ">
        <TouchableOpacity onPress={() => handleItemClick('home')}>
          <FontAwesome name="home" size={28} color={activeItem === 'home' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemClick('event')}>
          <MaterialIcons name="event" size={28} color={activeItem === 'event' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemClick('hospital-alt')}>
          <FontAwesome5 name="hospital-alt" size={24} color={activeItem === 'hospital-alt' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemClick('user')}>
          <FontAwesome name="user" size={24} color={activeItem === 'user' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
      </View>
      {/* search */}

    </SafeAreaView >
  );
};
export default HomeScreen;
