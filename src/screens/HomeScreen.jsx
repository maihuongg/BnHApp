import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
const HomeScreen = ({ navigation }) => {

  const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <View className="bg-white">
          <Image
            source={{
              uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
            }}
            style={{width: 200, height: 200}}
          />
          <Text>Hello, {user.cccd}</Text>
        </View>
      );
};
export default HomeScreen;
