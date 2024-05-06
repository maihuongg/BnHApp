import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

import MapViewDirections from 'react-native-maps-directions';
import {
    eventProfileStart,
    eventProfileSuccess,
    eventProfileFailed,
} from "../redux/eventSlice";
const MapViewScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [addressCoords, setAddressCoords] = useState(null);

    const eventDetail = useSelector((state) => state.event.eventProfile.getEvent);
    console.log("Địa chỉ: ", eventDetail)
    useEffect(() => {
        (async () => {
            // Lấy quyền truy cập vị trí từ người dùng
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Lấy vị trí hiện tại của thiết bị
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Lấy tọa độ của địa chỉ từ dịch vụ định vị
            const address = '1 Võ Văn Ngân, Thủ Đức';
            const addressCoords = await Location.geocodeAsync(address);
            setAddressCoords(addressCoords[0]);
        })();
    }, []);


    return (
        <View style={{ flex: 1 }}>
        {location && addressCoords ? (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* User's current location */}
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="Vị trí hiện tại"
                />

                {/* Destination address */}
                <Marker
                    coordinate={{
                        latitude: addressCoords.latitude,
                        longitude: addressCoords.longitude,
                    }}
                    title="1 Võ Văn Ngân, Thủ Đức"
                />

                {/* Render directions */}
                <MapViewDirections
                    origin={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    destination={{
                        latitude: addressCoords.latitude,
                        longitude: addressCoords.longitude,
                    }}
                    apikey={'AIzaSyCM94rwo0CzyZq0RA56xwswnNwJfV8_tR4'}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            </MapView>
        ) : (
            <Text>Loading...</Text>
        )}
    </View>
    );
};

export default MapViewScreen;
