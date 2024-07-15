import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                navigation.replace('MainTab');
            } else {
                navigation.replace('LoginPage');
            }
        };

        setTimeout(() => {
            checkLoginStatus();
        }, 2000);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Splash</Text>
        </View>
    );
};

export default Splash;