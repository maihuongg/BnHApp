import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TopBar from './components/Topbar';
const HomeScreen = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const navigation = useNavigation();
  const handleToDetailEvent = () => {
    navigation.navigate('DetailScreen')
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
          className="text-white pl-1"
          placeholder=" Nhập tên sự kiện / bệnh viện" />
      </View>

      {/* slider */}
      {/* <View className="flex-row "> */}
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} >
          <View className="flex-row m-2 shadow-sm ">
            <View className="w-80 h-32 mx-2 ">
              <Image
                source={require('../../assets/2.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View>
            <View className="w-80 h-32 mx-2">
              <Image
                source={require('../../assets/1.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View>
            <View className="w-80 h-32 mx-2">
              <Image
                source={require('../../assets/3.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View>
          </View>

        </ScrollView>
        {/* </View> */}
        {/* info */}
        <View className="flex-auto bg-silver">
          <Text className="text-xl font-bold text-blue px-4 my-2">Sự kiện nổi bật</Text>
          {/* SỰ kiện */}

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
                 onPress={handleToDetailEvent}
                  className="items-center bg-blue p-2 mx-8 my-2 rounded-md" >
                  <View className="flex-row">
                    <Text className="text-white font-bold">Xem chi tiết</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          </View><View className="bg-white">
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
        <View className="flex-auto bg-silver">
          <Text className="text-xl font-bold text-blue px-4 my-2">Một số bệnh viện hợp tác</Text>
          {/* BV HỢP TÁC */}
          <View className="bg-white">
            <View className="bg-white mx-4 rounded-lg shadow-md my-3">
              <TouchableOpacity className="bg-gray mx-auto rounded-full w-52 h-52 mt-2 justify-center items-center ">
                <Image
                  source={require('../../assets/2.png')}
                  className="rounded-full w-48 h-48">
                </Image>
              </TouchableOpacity>
              <View className="bg-gray justify-center mx-4 items-center -mt-10 -z-10 rounded-lg mb-3">
                <Text className="mt-8 py-1 text-black font-bold text-lg">Bệnh viện Quân Y</Text>
                <View className="flex-row mx-10">
                  <Text className="font-bold">Địa chỉ :</Text>
                  <Text className="text-black font-normal"> 786 Nguyễn Kiệm, P.3, Q.Gò Vấp, TP. Hồ Chí Minh</Text>
                </View>
                <View className="flex-row mx-auto mb-2 ">
                  <Text className="font-bold">Hotline:</Text>
                  <Text className="text-black font-normal">19001175</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="bg-white">
            <View className="bg-white mx-4 rounded-lg shadow-md my-3">
              <TouchableOpacity className="bg-gray mx-auto rounded-full w-52 h-52 mt-2 justify-center items-center ">
                <Image
                  source={require('../../assets/2.png')}
                  className="rounded-full w-48 h-48">
                </Image>
              </TouchableOpacity>
              <View className="bg-gray justify-center mx-4 items-center -mt-10 -z-10 rounded-lg mb-3">
                <Text className="mt-8 py-1 text-black font-bold text-lg">Bệnh viện Quân Y</Text>
                <View className="flex-row mx-10">
                  <Text className="font-bold">Địa chỉ :</Text>
                  <Text className="text-black font-normal"> 786 Nguyễn Kiệm, P.3, Q.Gò Vấp, TP. Hồ Chí Minh</Text>
                </View>
                <View className="flex-row mx-auto mb-2 ">
                  <Text className="font-bold">Hotline:</Text>
                  <Text className="text-black font-normal">19001175</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView >
      {/* BOTTOM BAR */}
      {/* < View className=" absolute bottom-0 w-full bg-white shadow-md flex justify-around items-center p-4 flex-row " >
        <TouchableOpacity onPress={() => handleItemClick('home')}>
          <FontAwesome name="home" size={28} color={activeItem === 'home' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemClick('event')}>
          <MaterialIcons name="event" size={28} color={activeItem === 'event' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleItemClick('hospital-alt')}>
          <FontAwesome5 name="hospital-alt" size={24} color={activeItem === 'hospital-alt' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInformation}>
          <FontAwesome name="user" size={24} color={activeItem === 'user' ? '#0891b2' : 'black'} />
        </TouchableOpacity>
      </View > */}
      {/* search */}
      {/* <TopBar activeItem={activeItem} handleItemClick={handleItemClick} /> */}


    </SafeAreaView >
  );
};
export default HomeScreen;
