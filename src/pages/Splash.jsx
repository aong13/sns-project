import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('LoginPage');
        }, 2000)
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Splash</Text>
        </View>
    )
}

export default Splash;