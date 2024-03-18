import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import TopBar from './components/Topbar';
import {
  eventProfileStart,
  eventProfileSuccess,
  eventProfileFailed,
  hospitalStart,
  hospitalSuccess,
  hospitalFailed
} from "../redux/eventSlice";
const HomeScreen = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const userId = user?._id;
  const accessToken = user?.accessToken;
  const fiveEvent = useSelector((state) => state.user.allevent.getEvent);
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dataBestEvent, setDataBestEvent] = useState([]);
  const [count, setCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventSearch, setEventSearch] = useState(null);

  console.log("hgjh", dataBestEvent);

  useEffect(() => {
    const handleBestEvent = async () => {
      try {
        const response2 = await fetch("http://192.168.1.3:8000/v1/user/bestevent", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response2.ok) {
          console.log("Get Best Event Fail.")
        }
        else {
          const bestEvent = await response2.json();
          console.log("c", bestEvent.listusers.count);
          setCount(bestEvent.listusers.count);
          setDataBestEvent(bestEvent);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    handleBestEvent();
  }, [setCount, setDataBestEvent]);

  const handleToDetailEvent = async (eventId, hospitalId) => {
    if (user) {
      dispatch(eventProfileStart());
      try {
        const response1 = await fetch("http://192.168.1.3:8000/v1/user/getevent/" + eventId, {
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
        const response2 = await fetch("http://192.168.1.3:8000/v1/user/gethospital/" + hospitalId, {
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

  const fetchDataSearcg = async (keyword) => {
    try {
      const response2 = await fetch(`http://192.168.1.3:8000/v1/user/search/event?keyword=${keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response2.ok) {
        const data2 = await response2.json();
        setEventSearch(data2);
      }
      else return 0;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEvent = () => {
    navigation.navigate('Sukien');
  }
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

      {/* slider */}
      {/* <View className="flex-row "> */}
      {eventSearch === null ? (
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
                  <Text className="text-lg font-bold" >{dataBestEvent.eventName}</Text>
                  <View className="flex-row">
                    <Text>Địa chỉ : </Text>
                    <Text className="font-bold">{dataBestEvent.address}</Text>
                  </View>
                  <View className="flex-row">
                    <Text>Số lượng đăng ký : {count}/</Text>
                    <Text className="font-bold">{dataBestEvent.amount}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToDetailEvent(dataBestEvent._id, dataBestEvent.hospital_id)}
                    className="items-center bg-blue p-2 mx-8 my-2 rounded-md" >
                    <View className="flex-row">
                      <Text className="text-white font-bold">Xem chi tiết</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>
            </View>
          </View>
          {/* 5 Sự kiện nổi bật */}
          <View className="flex-auto bg-silver">
            <Text className="text-xl font-bold text-blue px-4 my-2">Top 5 Sự kiện</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false} >
              {fiveEvent.map((result) => (
                <View className="bg-white w-300 h-200">
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
                  <Text className="mt-8 py-1 text-black font-bold text-lg">Bệnh viện Thủ Đức</Text>
                  <View className="flex-row mx-10">
                    <Text className="font-bold">Địa chỉ :</Text>
                    <Text className="text-black font-normal"> 64 Lê Văn Chí, Phường Linh Trung, Thủ Đức, TP. Hồ Chí Minh</Text>
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
      ) : (
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
          <View className="flex-auto bg-silver">
            <Text className="text-xl font-bold text-blue px-4 my-2">Kết quả tìm kiếm</Text>
            {/* SỰ kiện */}
            {eventSearch.map((result) => (
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
          </View>
          {/* info */}
          <View className="flex-auto bg-silver">
            <Text className="text-xl font-bold text-blue px-4 my-2">Sự kiện nổi bật</Text>
            {/* SỰ kiện */}

            <View className="bg-white">
              <TouchableOpacity className="bg-white rounded-lg px-4 mx-4 my-2 shadow-md">
                <Image source={require('../../assets/1.png')} className="w-full h-32 rounded-md mb-2" />
                <View className="mb-2">
                  <Text className="text-lg font-bold" >{dataBestEvent.eventName}</Text>
                  <View className="flex-row">
                    <Text>Địa chỉ : </Text>
                    <Text className="font-bold">{dataBestEvent.address}</Text>
                  </View>
                  <View className="flex-row">
                    <Text>Số lượng đăng ký : {count}/</Text>
                    <Text className="font-bold">{dataBestEvent.amount}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToDetailEvent(dataBestEvent._id, dataBestEvent.hospital_id)}
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
                  <Text className="mt-8 py-1 text-black font-bold text-lg">Bệnh viện Thủ Đức</Text>
                  <View className="flex-row mx-10">
                    <Text className="font-bold">Địa chỉ :</Text>
                    <Text className="text-black font-normal"> 64 Lê Văn Chí, Phường Linh Trung, Thủ Đức, TP. Hồ Chí Minh</Text>
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
      )}

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
