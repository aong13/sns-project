import React from 'react'
import {Dimensions, SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const { width } = Dimensions.get('window');

const more_icon = require('../assets/icons/more.png')

const scrab_icon = require('../assets/icons/scrab.png');
const scrab_fill_icon = require('../assets/icons/scrab_fill.png');
const share_icon = require('../assets/icons/share.png');
const back_icon = require('../assets/icons/back.png');

const emotion_icon = require('../assets/icons/expression-outline.png');
const image_icon = require('../assets/icons/image_upload.png');
const comment_icon = require('../assets/icons/comment_mini.png');

const heart_icon = require('../assets/icons/comment-heart-fill.png');
const heart_fill_icon = require('../assets/icons/comment-heart-outline.png');

const angry_icon = require('../assets/icons/emotion_angry.png');
const funny_icon = require('../assets/icons/emotion_funny.png');
const good_icon = require('../assets/icons/emotion_good.png');
const sad_icon = require('../assets/icons/emotion_angry.png');
const surprise_icon = require('../assets/icons/emotion_angry.png');


const dummy_feed = {
        id: 1,
        name: 'Jeongtaeyoung_5812',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
            'https://picsum.photos/400/400',
        ],
        contents: '내 마음...받아줘',
        like: 37,
        likeUsers: [
            1, 2, 3,
        ],
        hashTags:[
            '스포츠',
            '맥북',
            '코딩중',
            '리액트네이티브'
        ]
    }
const dummyComment = [{
    id:1,
    nickname: 'Jeongtaeyoung_5812',
    profileImg: 'https://avatar.iran.liara.run/public',
    comment: '내 마음.. 받아줘',
    likeNum: 30,
    replyNum: 1,
    date: '2024-07-21'
},
{
    id:2,
    nickname: 'Jeongtaeyoung_5812',
    profileImg: 'https://avatar.iran.liara.run/public',
    comment: '내 마음.. 받아줘',
    likeNum: 30,
    replyNum: 1,
    date: '2024-07-21'
},
{
    id:3,
    nickname: 'Jeongtaeyoung_5812',
    profileImg: 'https://avatar.iran.liara.run/public',
    comment: '내 마음.. 받아줘',
    likeNum: 30,
    replyNum: 1,
    date: '2024-07-21'
}]

const FeedDetail = ({ route, navigation }) => {
    const { id } = route.params;

    const renderItem = ({ item }) => (
        <CommentComponent
            profileImg={item.profileImg}
            nickname={item.nickname}
            comment={item.comment}
            likeNum={item.likeNum}
            replyNum={item.replyNum}
            date={item.date}
        />
    );

    const HashTagComponent = ({ hashTag }) => (
        <TouchableOpacity style={styles.hashTagWrapper}>
            <Text style={styles.hashTagText}>#{hashTag}</Text>
        </TouchableOpacity>
    );

    const handleLikePress = () => {

    }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FFF'}}>
        <View style={{ flex: 1 }}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back_icon} style={styles.headerIcon} />
                </TouchableOpacity>
                <View style={styles.headerButtonsWrapper}>
                    <TouchableOpacity>
                        <Image source={share_icon} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={scrab_icon} style={styles.headerIcon} /> 
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.postHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity>
                        <Image source={{uri: dummy_feed.profileImg}} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.nicknameText}>{dummy_feed.name}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Image source={more_icon} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
            </View>

            {/** 캐러셀로 구현해보기 */}
            <Image 
                source={{ uri: dummy_feed.feedImg[0] }}
                style={styles.thumbnailImg}
                resizeMode='contain' />

            <View style={{ marginHorizontal: 20, marginVertical: 16, gap: 10}}>
                <Text styles={styles.timeText}> 30분 전 </Text>
                <Text style={styles.contentsText}>{dummy_feed.contents}</Text>
                
            <View style={styles.hashTagContainer}>
                {dummy_feed.hashTags.map((hashTag, index) => (
                    <HashTagComponent key={index} hashTag={hashTag} />
                ))}
            </View>

        </View>

            <View style={styles.reactionsContainer}>
                <TouchableOpacity
                    style={{flexDirection: 'row', gap: 8, alignItems:'center'}}
                    onPress={() => handleLikePress()}>
                    <Image source={emotion_icon} style={{ width: 16, height: 16 }} />
                    <Text>표현하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{flexDirection: 'row', gap: 8, alignItems:'center'}}>
                    <Image source={comment_icon} style={{ width: 16, height: 16 }} />
                    <Text>{`댓글 ${commentNum=16}`}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
            data={dummyComment}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
        </View>
    </SafeAreaView>
  );
}

const CommentComponent = ({profileImg, nickname, comment, likeNum, replyNum, date}) =>{
    <View style={styles.commentContainer}>
        <View style={styles.authorInfoWrapper}>
            <TouchableOpacity>
                <Image source={{ uri: profileImg}} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 13, fontWeight: 'bold', lineHeight: 19.97 }}>{nickname}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, fontWeight: 'bold', lineHeight: 19.97 }}>{date}</Text>
        </View>
            <Text style={styles.commentText}>{comment}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <TouchableOpacity>
                    <Image source={heart_icon} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <Text>{likeNum}</Text>
                <TouchableOpacity>
                    <Image source={comment_icon} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
                <Text>{replyNum}</Text>
            </View>
            <Text>신고</Text>
        </View>
    </View>
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
    //글 상단
    postHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 10,
    },
    nicknameText:{
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 20.27,
        color: '#3A3A3A'
    },

    //이미지
    thumbnailImg:{
        width, 
        height: width, 
    },
    //컨텐츠영역
    contentContainer:{
        marginHorizontal: 20,
        marginVertical: 16, 
        gap: 10
    },
        timeText: {
            fontSize: 13,
            lineHeight:18.82,
            letterSpacing: 0.03,
            textAlign: 'right',
            color: '#A5A5A5',
        },
        contentsText:{
            fontSize: 15,
            lineHeight: 21.72,
            letterSpacing: 0.03,
            textAlign: 'left',
            color: '#3A3A3A'   
        },
    //해시태그
    hashTagContainer:{
        flexDirection: 'row', 
        gap:6
    },
        hashTagWrapper:{
            backgroundColor:'#F3F3F3',
            padding:5,
            borderRadius:5,
        },
        hashTagText:{
            fontSize: 14,
            lineHeight: 20.27,
            letterSpacing: -0.03,
            textAlign: 'left'
        },

    //반응
    reactionsContainer:{
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 8,
        borderBottomWidth:0.2,
        borderBottomColor:'#d0d0d0',
    },

    //댓글
    commentContainer : {
        marginHorizontal: 16
    },
    authorInfoWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    }
})


export default FeedDetail