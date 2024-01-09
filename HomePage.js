// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Trang Chủ</Text>
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
    name: {
      fontSize: 24,
      color: '#201617',
      marginBottom: 10,
    },
  });

export default HomePage;
