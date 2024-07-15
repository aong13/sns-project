import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AlertModal from '../components/AlertModal';
import { postFollow } from '../apis/Follow';
const back_icon = require('../assets/icons/back.png');
const searchIcon = require('../assets/icons/search.png');
const Tab = createMaterialTopTabNavigator();

const FollowerTab = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View>
                <View style={styles.recentKeywordRow}>
                    <TouchableOpacity style={styles.recentKeywordUser}>
                        <Image source={{ uri: 'https://picsum.photos/130/130' }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                        <Text>Lucymartin_3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 4, padding: 8 }}>
                        <Text>팔로우 취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const FollowingTab = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Text>Following</Text>
        </View>
    );
};

const FollowPage = ({ navigation }) => {
    const [searchEmail, setSearchEmail] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");


const followUser = async (email) => {
    try {
        const res = await postFollow(email);
        console.log('팔로우 성공:', res);
        setIsModalVisible(false);
    } catch (error) {
        console.error('팔로우 실패함:', error);
        if (error.message === "Property 'postFollow' doesn't exist") {
            setErrorMessage("해당 사용자는 존재하지 않습니다.");
        } else {
            setErrorMessage("에러가 발생했습니다.");
        }
    }
};
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back_icon} style={styles.headerIcon} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <TouchableOpacity style={styles.searchIconStyle}>
                            <Image source={searchIcon} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TextInput
                            value={searchEmail}
                            onChangeText={setSearchEmail}
                            placeholder="이메일을 입력하세요."
                            style={styles.inputStyle}
                        />
                        <TouchableOpacity onPress={()=>setIsModalVisible(true)}>
                            <Text style={styles.followButton}>팔로우</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarInactiveTintColor: '#828282',
                    tabBarActiveTintColor: '#333333',
                    tabBarIndicatorStyle: {
                        backgroundColor: '#4F4F4F',
                        width: 100,
                        marginLeft: 60,
                        height: 1
                    }
                }}
            >
                <Tab.Screen name="230403 팔로워" component={FollowerTab} />
                <Tab.Screen name="261123 팔로잉" component={FollowingTab} />
            </Tab.Navigator>

            {isModalVisible && (
                <AlertModal
                    isVisible={isModalVisible}
                    okText="확인"
                    noText="닫기"
                    headerTitle={errorMessage || `${searchEmail}님을 정말 팔로우하시겠습니까?`}
                    onPressOk={errorMessage ? () => setIsModalVisible(false) : () => followUser(searchEmail)}
                    onPressNo={() => setIsModalVisible(false)}
                />
            )}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    //헤더
    headerWrapper: {
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
    headerIcon: {
        padding: 0,
        width: 28,
        height: 28
    },
    searchContainer: {
        flex: 1,
        height: 68,
        backgroundColor: '#FFF',
    },
    searchWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        marginHorizontal: 10,
        marginVertical: 12,
        borderRadius: 4
    },
    searchIconStyle: {
        marginLeft: 16,
        marginRight: 2
    },
    inputStyle: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: '400',
        color: '#828282',
        paddingRight: 12
    },
    followButton: {
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#2F80ED',
        fontWeight: 'bold'
    },
    recentKeywordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 20
    },
    recentKeywordUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11
    },
});

export default FollowPage;
