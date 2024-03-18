import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TopBar from './components/Topbar';
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
    const navigation = useNavigation();

    const handleProfie = () => {
        navigation.navigate('Profile');
    }
    const handleLichHen = () => {
        navigation.navigate('LichHen');
    }

    return (
        <View className="flex-1">
            <View className="flex-row h-32 bg-bubble-gum">
                <Text>

                </Text>
            </View>

        </View>

    );
}
export default HospitalScreen;