// HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const openFacebook = () => {
    const facebookUrl = 'https://www.facebook.com/your-facebook-page';
    Linking.openURL(facebookUrl);
  };

  const openZalo = () => {
    const zaloUrl = 'https://zalo.me/your-zalo-id';
    Linking.openURL(zaloUrl);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Introduce team members</Text>

      <Image source={require('./assets/avatar.png')} style={styles.avatar} />
      <Text style={styles.name}>Đặng Mai Hương</Text>
     
      <Text style={styles.infoText}>Student ID: 20110099</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={openFacebook} style={styles.button}>
          <Image source={require('./assets/facebook.png')} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openZalo} style={styles.button}>
          <Image source={require('./assets/zalo.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>

      <Image source={require('./assets/avatar1.jpg')} style={styles.avatar} />
      <Text style={styles.name}>Nguyễn Thị Thu Hằng</Text>
     
      <Text style={styles.infoText}>Student ID: 20110473</Text>
      
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={openFacebook} style={styles.button}>
          <Image source={require('./assets/facebook.png')} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openZalo} style={styles.button}>
          <Image source={require('./assets/zalo.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#201617',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    color: '#201617',
    marginBottom: 25,
  },
  infoText: {
    fontSize: 16,
    color: '#201617',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    flexDirection: 'row', // Hiển thị các thành phần theo chiều ngang
    marginTop: 10,
    marginRight: 15,
    marginBottom: 20,
  },
});

export default HomeScreen;
