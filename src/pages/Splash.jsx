import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                console.log(token);
                if (token) {
                    navigation.replace('MainTab');
                } else {
                    navigation.replace('LoginPage');
                }
            } catch (error) {
                console.error('토큰 검사 실패:', error);
                navigation.replace('LoginPage');
            }
        };

        setTimeout(() => {
            checkLoginStatus();
            navigation.replace('MainTab');
        }, 2000);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>오운완</Text>
        </View>
    );
};

export default Splash;
