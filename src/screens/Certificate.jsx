import React from 'react';
import { Svg, Image, Text } from 'react-native-svg';
import { View, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Certificate = React.forwardRef(({ record, userPro }, ref) => {
    const { fullName } = userPro;
    const { eventName, date, amount_blood } = record;

    return (
        <Svg ref={ref} height="100%" width="100%" viewBox="0 0 1000 1000">
            <Image
                href={require('../../assets/certificate.png')}
                x="0"
                y="0"
                height="1000"
                width="1000"
            />
            <Text
                x="25%"
                y="45%"
                fontSize="40"
                fontWeight="bold"
                fill="black"
                
            >
                Ông/bà: {fullName}
            </Text>
            <Text
                x="15%"
                y="51%"
                fontSize="30"
                fill="black"
                
            >
                Đã tham gia "{eventName}"
            </Text>
            <Text
                x="13%"
                y="57%"
                fontSize="30"
                fill="black"
                
            >
                Ngày hiến máu: {moment(date).format('DD-MM-YYYY')}
            </Text>
            <Text
                x="55%"
                y="57%"
                fontSize="30"
                fill="black"
            >
                Lượng máu đã hiến: {amount_blood} ml.
            </Text>
        </Svg>
    );
});

export default Certificate;
