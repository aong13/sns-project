import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('authToken');
            console.log(token);
            if (token) {
                navigation.replace('MainTab');
            } else {
                navigation.replace('LoginPage');
            }
        };

        setTimeout(() => {
            //checkLoginStatus();
             navigation.replace('LoginPage');
        }, 2000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>오운완</Text>
        </View>
    );
};

export default Splash;