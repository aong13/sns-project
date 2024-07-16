import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image,FlatList,Dimensions,StyleSheet } from 'react-native';
import { getProfile } from '../../apis/Account';
import { baseURL } from '../../apis';
import BasicHeader from '../../components/BasicHeader';

const back_icon = require('../../assets/icons/back.png');
const settingsIcon = require('../../assets/icons/setting.png');
const alarmIcon = require('../../assets/icons/alarm.png');
const multiPhoto = require('../../assets/icons/multi.png');
const defaultProfileImage = require('../../assets/images/blank_profile.png');

const { width } = Dimensions.get('window');


const Mypage = ({ navigation }) => {
    const [accountInfo, setAccountInfo] = useState([]);
    const [feedList, setFeedList] = useState([]);

    const getProfileApi = async () => {
        const profile = await getProfile();
        console.log('MyProfile:', profile);
        setAccountInfo(profile.accountInfoResponse);
        setFeedList(profile.feedList);
    };

    useEffect(() => {
        getProfileApi();
    }, []);

    const renderItem = ({item}) => {
        // console.log("item in mypage:", item)
        return (
            <TouchableOpacity 
                onPress={()=>handleFeedPress(item.id)}
                style={{borderWidth: 1, borderColor: '#FFF'}}>
                { item.images.length > 1  && <Image source={multiPhoto} style={{position: 'absolute', right: 8, top: 8, width: 24, height: 24, zIndex: 4 }} />}
                <Image source={{ uri: baseURL + item.images[0]}} style={{width:(width/3) -2, height: (width/3) - 2}} />
            </TouchableOpacity>
        )
    }

    
    const handleFeedPress = (id) => {
        navigation.navigate('FeedDetail', { id }); // id전달
    };

    //프로필이미지 없는경우 처리
    const profileImageUrl = accountInfo.profileImagePath ? { uri: baseURL + accountInfo.profileImagePath } : defaultProfileImage;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>
            <BasicHeader
                title="마이페이지"
                rightButtons={[
                    { icon: settingsIcon, onPress: () => navigation.navigate('MyInfo') },
                    { icon: alarmIcon },
                ]}
            />
                <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Image source={{profileImageUrl}} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 4 }} />
                        <Text style={{ fontSize: 12, marginLeft: 4 }}>{accountInfo.nickName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                        <TouchableOpacity style={{alignItems:'center', gap: 2}}>
                            <Text style={{fontSize: 12}}>{accountInfo.feedCount}</Text>
                            <Text style={{fontSize: 13}}>게시물</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('FollowPage')}
                            style={{alignItems:'center', gap: 2}}>
                            <Text style={{fontSize: 12}}>{accountInfo.followerCount}</Text>
                            <Text style={{fontSize: 13}}>팔로워</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems:'center', gap: 2}}
                            onPress={() => navigation.navigate('FollowPage')}>
                            <Text style={{fontSize: 12}}>{accountInfo.followingCount}</Text>
                            <Text style={{fontSize: 13}}>팔로잉</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <FlatList 
                    data={feedList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                    numColumns={3}
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    //헤더
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
    headerButtonsWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4 
    },
    headerIcon:{
        width: 28,
            height: 28
    },
})
export default Mypage;