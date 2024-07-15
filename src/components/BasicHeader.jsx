import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const back_icon = require('../assets/icons/back.png');
const BasicHeader = ({ title, showBackButton = true, rightButtons = [] }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerWrapper}>
            {showBackButton && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back_icon} style={styles.headerIcon} />
                </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.headerButtonsWrapper}>
                {rightButtons.map((button, index) => (
                    <TouchableOpacity key={index} onPress={button.onPress||""}> 
                        <Image source={button.icon} style={styles.headerIcon} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    headerTitle: {
        left:"50%",
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 19.97,
        textAlign: 'center',
        color: '#000',
    },
    headerButtonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headerIcon:{
        width: 28,
        height: 28
    },
});

export default BasicHeader;
