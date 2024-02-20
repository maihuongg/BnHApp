import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
const HomeScreen = ({ navigation }) => {
    return (
        <View className="bg-white">
          <Image
            source={{
              uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
            }}
            style={{width: 200, height: 200}}
          />
          <Text>Hello, I am your cat!</Text>
        </View>
      );
};
export default HomeScreen;
