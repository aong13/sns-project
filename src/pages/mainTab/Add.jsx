import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, useWindowDimensions, PermissionsAndroid, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const Add = ({ navigation }) => {
    const [images, setImages] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [selectedIndex, setSelectedIndex] = useState();

    const { width } = useWindowDimensions();

    useEffect(() => {
//        requestPermission().then(() => {
            FetchImages();
//        });
    }, []);

    // const requestPermission = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //                 {
    //                     title: "Access to Photos",
    //                     message: "We need to access your photos to display them.",
    //                     buttonNeutral: "Ask Me Later",
    //                     buttonNegative: "Cancel",
    //                     buttonPositive: "OK"
    //                 }
    //             );
    //             if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //                 console.log("READ_EXTERNAL_STORAGE permission denied");
    //             }
    //         } catch (err) {
    //             console.warn(err);
    //         }
    //     }
    // };

    const FetchImages = async () => {
        try {
            const res = await CameraRoll.getPhotos({
                first: 100,
                assetType: 'Photos',
                groupTypes: 'All'
            });
            if (res.edges.length > 0) {
                setSelectedPhoto(res.edges[0].node.image);
                setSelectedIndex(0);
                setImages(res.edges.map(e => e.node.image));
            }
        } catch (error) {
            console.error(error);
        }
    };

    //여러장 선택하기
    const handleSelectPhoto = (item) => {
        const isSelected = selectedPhotos.some(photo => photo.uri === item.uri);
        if (isSelected) {
            setSelectedPhotos(selectedPhotos.filter(photo => photo.uri !== item.uri));
        } else {
            setSelectedPhotos([...selectedPhotos, item]);
        }
    };

    const renderItem = ({ item, index }) => {
        const isSelected = selectedPhotos.some(photo => photo.uri === item.uri);
        return (
            <TouchableOpacity 
                style={{ borderWidth: 1, borderColor: '#FFF' }}
                onPress={() => {
                    handleSelectPhoto(item);
                    setSelectedPhoto(item);
                    setSelectedIndex(index);
                }}>
                {isSelected && (
                    <View style={{ position: 'absolute', right: 8, top: 2, width: 20, height: 20, borderWidth: 1, borderColor: '#000', borderRadius: 20, zIndex: 2 }}>
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                    </View>
                )}
                <Image source={{ uri: item.uri }} style={{ width: (width / 4) - 2, height: (width / 4) - 2 }} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginBottom: 8 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 24, color: '#3A3A3A', fontWeight: 'bold' }}>X</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 15, color: '#3A3A3A', fontWeight: 'bold' }}>새 게시물</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddFeed', { selectedPhotos })}>
                    <Text style={{ fontSize: 14, color: '#2F80ED', fontWeight: 'bold' }}>다음</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#000', flex: 0.5 }}>
                <Image source={{ uri: selectedPhoto?.uri }} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ flex: 0.5 }}>
                <FlatList 
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={item => item.uri}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                />
            </View>
        </SafeAreaView>
    );
};

export default Add;
