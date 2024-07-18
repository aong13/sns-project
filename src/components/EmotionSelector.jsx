import React from 'react';
import { View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { postEmotion } from '../apis/Feed';

const angry_icon = require('../assets/icons/emotion_angry.png');
const funny_icon = require('../assets/icons/emotion_funny.png');
const good_icon = require('../assets/icons/emotion_good.png');
const sad_icon = require('../assets/icons/emotion_sad.png');
const surprise_icon = require('../assets/icons/emotion_surprise.png');

const EmotionSelector = ({ isVisible, onSelectEmotion, onClose }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => onSelectEmotion('ANGRY')}>
                        <Image source={angry_icon} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectEmotion('FUNNY')}>
                        <Image source={funny_icon} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectEmotion('GOOD')}>
                        <Image source={good_icon} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectEmotion('SAD')}>
                        <Image source={sad_icon} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSelectEmotion('SURPRISE')}>
                        <Image source={surprise_icon} style={styles.img} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 10,
        gap:8,
        paddingHorizontal: 10,
        alignItems: 'center',
        elevation: 5, // 안드그림자
        shadowColor: '#000000', //ios그림자
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    img: {
        width: 28,
        height: 28,
    },
});

export default EmotionSelector;
