import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image,FlatList,Dimensions,StyleSheet } from 'react-native';
import BasicHeader from '../components/BasicHeader'
import { baseURL } from '../apis';
import { getMyInfo } from '../apis/Account';
const back_icon = require('../assets/icons/back.png');
const settingsIcon = require('../assets/icons/setting.png');
const alarmIcon = require('../assets/icons/alarm.png');
const multiPhoto = require('../assets/icons/multi.png');

const { width } = Dimensions.get('window');


const MyInfo = ({ navigation }) => {
    const [myInfo, setMyInfo] = useState([]);

    const getMyInfoApi = async () => {
        const info = await getMyInfo();
        console.log('MyInfo:', info);
        setMyInfo(info);
    };

    useEffect(() => {
        getMyInfoApi();
    }, []);
    
    return (
        <SafeAreaView style={{ flex: 1}}>
            <View style={{ flex: 1 }}>
            <BasicHeader
                title="내정보"
            />
                <View style={styles.myProfileWrapper}>
                    <Image style={styles.profileImg}/>
                    <View>
                        <Text>오아영</Text>
                        <Text>직장내괴롭힘금지</Text>
                    </View>
                </View>
                <View style={styles.menuWrapper}>
                    <View style={{justifyContent: 'center'}}>
                        <Text>게시글</Text>
                        <Text>5</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text>팔로우</Text>
                        <Text>5</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text>팔로잉</Text>
                        <Text>5</Text>
                    </View>
                </View>
                <View style={styles.menuWrapper}>
                    <Text style={styles.menuTitle}>서비스 소식</Text>
                    <Text style={styles.menuText}>공지사항</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.menuTitle}>고객 센터</Text>
                    <Text style={styles.menuText}> 앱 건의 </Text>
                    <Text style={styles.menuText}> 1:1 문의 </Text>
                    <Text style={styles.menuText}> F&Q </Text>
                    <Text style={styles.menuText}> 이용약관 </Text>
                </View>
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
    myProfileWrapper:{
        backgroundColor: '#FFF',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    profileImg:{
        borderRadius:100
    },
    menuWrapper:{
        backgroundColor: '#FFF',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingLeft:20,
        marginBottom:10,
        borderBottomWidth: 1,
        borderBottomColor: '#C3C3C3',
    },
    menuTitle:{
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 20.27,
        letterSpacing: -0.03,
        color: "#C3C3C3"

    },
    menuText:{
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 20.27,
        letterSpacing: -0.03,
        color: "#3A3A3A"
    },
    line:{
        height:0,
        paddingHorizontal:20,
        borderBottomWidth: 1,
        borderBottomColor: '#C3C3C3',
    }
})
export default MyInfo;