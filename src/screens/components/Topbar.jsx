import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
const TopBar = ({ activeItem, handleItemClick }) => {
    useEffect(() => {
        console.log('item actived Useeffect :', activeItem);
    }, [activeItem]);

    const navigation = useNavigation();
    const handleHome = () => {
        console.log("Navigating to HomeScreen...");
        navigation.navigate('HomeScreen');
        handleItemClick('home'); // Cập nhật trạng thái activeItem
        console.log("Navigation to HomeScreen completed.");
    };


    const handleInformation = () => {
        console.log("Navigating to InformationScreen...");
        navigation.navigate('InformationScreen');
        handleItemClick('user');
        console.log('item actived :', activeItem)
        console.log("Navigation to InformationScreen completed.");
    }

    return (
        <View className="flex-1">
            < View className=" absolute bottom-0 w-full bg-white shadow-md flex justify-around items-center p-4 flex-row " >
                <TouchableOpacity onPress={() => handleItemClick('home')}>
                    {activeItem === 'home' ?
                        <FontAwesome name="home" size={24} color="#0891b2" /> :
                        <FontAwesome name="home" size={24} color="black" />
                    }
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
            </View >
        </View>

    );
}
export default TopBar;