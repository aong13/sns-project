import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3A3A3A" />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});

export default Loading;
